export const FEE_MANAGER = "0x6397486960728D9A21EB4A7219847113894B4Fea";

export const POOLS = [
  { key: "distribution", label: "Validators", share: 10, address: "0x283670BBd514C2AB475D81f60149Dc1B92FCb076" },
  { key: "cashback", label: "Cashback", share: 30, address: "0x5458951f0068689976C6222003cd6CEC6DF2F4f4" },
  { key: "dividend", label: "Dividend", share: 30, address: "0x2CC5c4D0d6e7Ba515B264eaA387358813F638536" },
  { key: "tank", label: "Tank", share: 10, address: "0xa86372bf7F9995e4c6f326f16C67622A2d87D815" },
  { key: "team", label: "Team", share: 10, address: "0xD034D3867Bb8eE396a2CFD33993dd02Fd32F1e68" },
  { key: "reserve", label: "Reserve", share: 10, address: "0x10F55947a3d7427D658036E980B95922B37B3A8E" },
] as const;
