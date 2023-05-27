import type { QueryResultSet } from "@flipsidecrypto/sdk";
import type { NftMetadataBatchToken } from "alchemy-sdk";
import { cache } from "react";

import { alchemy } from "./alchemy";
import { flipside } from "./flipside";
import { imgStr } from "./imgStr";

type FlipsideResultType = {
  nft_address: string;
  tokenid: number;
  block_timestamp: string;
};

export type NFT = {
  contractAddress: string;
  name: string | undefined;
  imageUrl: string | undefined;
  description: string | undefined;
  data: string;
};

export const getNFTList = cache(async (address: string): Promise<NFT[]> => {
  const sql = `
    select DISTINCT
      NFT_ADDRESS,
      TOKENID,
      BLOCK_TIMESTAMP
    from
      ethereum.core.ez_nft_transfers
    where
      UPPER(nft_to_address) = UPPER('${address}');
  `;

  const result: QueryResultSet = await flipside.query.run({
    sql,
    maxAgeMinutes: 30,
  });
  const records = result.records as FlipsideResultType[];
  const arg = formatFlipsideData(records);
  const res = await alchemy.nft.getNftMetadataBatch(arg);

  const nfts: NFT[] = res.map((nft, index) => {
    return {
      contractAddress: nft.contract.address,
      name: nft.rawMetadata?.name,
      imageUrl: imgStr(nft.rawMetadata?.image),
      description: nft.rawMetadata?.description,
      data: records[index].block_timestamp,
    };
  });

  nfts.sort((a, b) => {
    return a.data > b.data ? 1 : -1;
  });

  return nfts;
});

const formatFlipsideData = (
  data: FlipsideResultType[]
): NftMetadataBatchToken[] => {
  return data.map((data) => {
    return {
      contractAddress: data.nft_address,
      tokenId: data.tokenid,
    };
  });
};
