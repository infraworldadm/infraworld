// GET /api/infra/balances — live fee-pool holdings, read from the INFRA chain.
// Pool addresses + target shares come from the DistributionPool contract; Validators uses
// ValidatorStaking.rewardReserve() (its balance also contains staked tokens). Falls back to config/pools.ts if the contract read fails.
import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { CHAIN_ID, DISTRIBUTION_POOL, FEE_MANAGER, POOLS, VALIDATOR_STAKING } from "@/config/pools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;

/** Server-side RPC (HTTPS endpoint of the INFRA node). */
const TARGET_RPC = "https://uat.infraworld.org/";
const DISTRIBUTION_ABI = ["function recipients(uint256) view returns (address vault, uint16 bps)"];
const VALIDATOR_STAKING_ABI = ["function rewardReserve() view returns (uint256)"];

type Item = { key: string; label: string; address: string; targetPercent: number; holding: string };

/** Returns { pools: { key: weiString }, list: Item[], source, feeManager, updatedAt } or 500 with an error. */
export async function GET() {
  try {
    const provider = new ethers.JsonRpcProvider(TARGET_RPC, CHAIN_ID, { staticNetwork: true });
    const distribution = new ethers.Contract(DISTRIBUTION_POOL, DISTRIBUTION_ABI, provider);
    const staking = new ethers.Contract(VALIDATOR_STAKING, VALIDATOR_STAKING_ABI, provider);
    const byAddr = new Map<string, (typeof POOLS)[number]>(POOLS.map((p) => [p.address.toLowerCase(), p]));

    /** Holding for one pool: reward reserve for ValidatorStaking, plain balance otherwise (wei). */
    const holdingOf = async (address: string): Promise<bigint> =>
      address.toLowerCase() === VALIDATOR_STAKING.toLowerCase() ? await staking.rewardReserve() : await provider.getBalance(address);

    // 1) Preferred: read the six recipients (vault + bps) from the DistributionPool contract.
    let recipients: { address: string; bps: number }[];
    let source = "contract";
    try {
      const raw = await Promise.all([0, 1, 2, 3, 4, 5].map((i) => distribution.recipients(i)));
      recipients = raw.map((r) => ({ address: ethers.getAddress(r.vault ?? r[0]), bps: Number(r.bps ?? r[1]) }));
    } catch {
      // 2) Fallback: addresses and shares from config.
      source = "config";
      recipients = POOLS.map((p) => ({ address: p.address, bps: p.share * 100 }));
    }

    const list: Item[] = await Promise.all(
      recipients.map(async ({ address, bps }) => {
        const cfg = byAddr.get(address.toLowerCase());
        return {
          key: cfg?.key ?? address,
          label: cfg?.label ?? "Unknown",
          address,
          targetPercent: bps / 100,
          holding: (await holdingOf(address)).toString(),
        };
      }),
    );

    return NextResponse.json({
      success: true,
      data: {
        pools: Object.fromEntries(list.map((p) => [p.key, p.holding])),
        list,
        source,
        feeManager: "0",
        feeManagerAddress: FEE_MANAGER,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch infra balances";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
