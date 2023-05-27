import { Flipside } from "@flipsidecrypto/sdk";

export const flipside = new Flipside(
  process.env.FLIPSIDE_API_KEY,
  "https://api-v2.flipsidecrypto.xyz"
);
