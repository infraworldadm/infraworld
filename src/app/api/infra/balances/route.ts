import { NextResponse } from "next/server";
import { FEE_MANAGER, POOLS } from "@/lib/pools";

export const dynamic = "force-dynamic";

const TARGET_RPC =
  process.env.RPC_INTERNAL_URL || process.env.NEXT_PUBLIC_RPC_URL || "https://uat.infraworld.org";

export async function GET() {
  try {
    const getBalance = async (address: string, id: number) => {
      const res = await fetch(TARGET_RPC, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ jsonrpc: "2.0", id, method: "eth_getBalance", params: [address, "latest"] }),
      });
      if (!res.ok) throw new Error(`RPC responded ${res.status}`);
      const r = (await res.json()) as { result?: string; error?: { message: string } };
      if (r.error || !r.result) throw new Error(r.error?.message || "Missing RPC result");
      return BigInt(r.result).toString();
    };
    const [feeManager, ...pools] = await Promise.all(
      [FEE_MANAGER, ...POOLS.map((p) => p.address)].map((a, i) => getBalance(a, i))
    );
    return NextResponse.json({
      success: true,
      data: {
        pools: Object.fromEntries(POOLS.map((p, i) => [p.key, pools[i]])),
        feeManager,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch infra balances";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
