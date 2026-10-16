// INFRA fee-distribution pool addresses and shares (used by /balances and its API).
export const FEE_MANAGER = "0x6397486960728D9A21EB4A7219847113894B4Fea";

export const POOLS = [
  { key: "distribution", label: "Validators", share: 10, address: "0xD1EF46058AeEE6598c912B45163a9160eB37d243" },
  { key: "cashback", label: "Cashback", share: 30, address: "0x2867deCA433C05aE97782efbd82CAf3F1DD61120" },
  { key: "dividend", label: "Dividend", share: 30, address: "0xCD938d217a31C85B9041a218A14015E289D61aC0" },
  { key: "tank", label: "Tank", share: 10, address: "0x2D7F9a6867ED5DA5e2Dfc0a19e7cE6F6830A0246" },
  { key: "team", label: "Team", share: 10, address: "0x0F699F4a3Ba77852263F3B684e9f15B3EC9C1FE8" },
  { key: "reserve", label: "Reserve", share: 10, address: "0xedf435f116DE4cC23b863b44d6611a4Adc6883c2" },
] as const;
