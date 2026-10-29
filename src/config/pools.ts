// INFRA fee-distribution pool addresses, target shares and chart colours (used by /balances and its API).
// Colours: validated categorical palette (fixed per pool — never reorder). Notes are short descriptions shown on /balances.
export const FEE_MANAGER = "0x6397486960728D9A21EB4A7219847113894B4Fea";

/** On-chain sources (from the INFRA dev team). */
export const CHAIN_ID = 15324;
/** DistributionPool contract: recipients(i) → (vault, bps) gives each pool address and its fee share. */
export const DISTRIBUTION_POOL = "0x90e79A1d20CAc816f073887CD7e13F73117d600E";
/** ValidatorStaking contract: also holds validators' staked tokens, so we show rewardReserve() instead of its balance. */
export const VALIDATOR_STAKING = "0xb7CC64E826D3F04c6ab3BE3079d45FF77037b47D";

export const POOLS = [
  { key: "distribution", label: "Validators", share: 10, color: "#2a78d6", darkColor: "#3987e5", note: "Rewards for the PoSA validator set", address: "0xb7CC64E826D3F04c6ab3BE3079d45FF77037b47D" },
  { key: "cashback", label: "Cashback", share: 30, color: "#eb6834", darkColor: "#d95926", note: "Returned to users as cashback", address: "0x2867deCA433C05aE97782efbd82CAf3F1DD61120" },
  { key: "dividend", label: "Dividend", share: 30, color: "#1baf7a", darkColor: "#199e70", note: "Distributed to stakeholders", address: "0xCD938d217a31C85B9041a218A14015E289D61aC0" },
  { key: "tank", label: "Tank", share: 10, color: "#eda100", darkColor: "#c98500", note: "Liquidity and stability buffer", address: "0x2D7F9a6867ED5DA5e2Dfc0a19e7cE6F6830A0246" },
  { key: "team", label: "Team", share: 10, color: "#e87ba4", darkColor: "#d55181", note: "Core team and operations", address: "0x0F699F4a3Ba77852263F3B684e9f15B3EC9C1FE8" },
  { key: "reserve", label: "Reserve", share: 10, color: "#6250d6", darkColor: "#9085e9", note: "Long-term protocol reserve", address: "0xedf435f116DE4cC23b863b44d6611a4Adc6883c2" },
] as const;
