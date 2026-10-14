import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "INFRA — Pegged Stablecoin Network Infrastructure",
    short_name: "INFRA",
    start_url: "/",
    display: "standalone",
    background_color: "#F3F5F9",
    theme_color: "#1F5BFF",
    icons: [{ src: "/wallet/infra-wallet-logo.png", sizes: "320x320", type: "image/png" }],
  };
}
