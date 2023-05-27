import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  Network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(config);
