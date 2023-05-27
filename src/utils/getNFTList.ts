import { cache } from "react";

export const getNFTList = cache(async (address: string) => {
  return address + Math.random();
});
