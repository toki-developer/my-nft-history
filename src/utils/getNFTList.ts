import type { QueryResultSet } from "@flipsidecrypto/sdk";
import type { NftMetadataBatchToken } from "alchemy-sdk";
import { cache } from "react";

import { alchemy } from "./alchemy";
import { convertExponentialToDecimal } from "./convertExponentialToDecimal";
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
  const result = await getFlispside(address);

  const records = result.records as FlipsideResultType[];
  records.sort((a, b) => {
    return a.block_timestamp > b.block_timestamp ? 1 : -1;
  });

  const data = formatFlipsideData(records);

  //flipsideのデータを100ずつに分割
  const size = 100;
  const array = [];
  for (let i = 0; i < data.length; i += size) {
    if (data.length - i > size) {
      array.push(data.slice(i, i + size));
    } else {
      array.push(data.slice(i, data.length));
    }
  }

  const resArrayPromise = array.map((arg) => {
    return alchemy.nft.getNftMetadataBatch(arg);
  });

  const resArray = await Promise.all(resArrayPromise);

  const res = resArray.flat();
  const nfts: NFT[] = res.map((nft, index) => {
    return {
      contractAddress: nft.contract.address,
      name: nft.rawMetadata?.name,
      imageUrl: imgStr(nft.rawMetadata?.image),
      description: nft.rawMetadata?.description,
      data: records[index].block_timestamp,
    };
  });

  return nfts;
});

const getFlispside = cache(async (address: string) => {
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
  if (result.error) {
    console.error(result.error.message);
  }
  return result;
});

const formatFlipsideData = (
  data: FlipsideResultType[]
): NftMetadataBatchToken[] => {
  return data.map((data) => {
    return {
      contractAddress: data.nft_address,
      tokenId: convertExponentialToDecimal(data.tokenid),
    };
  });
};
