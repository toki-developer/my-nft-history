export const imgStr = (imgUrl: string | undefined) => {
  return imgUrl
    ?.replace("ar:/", "https://arweave.net")
    .replace("ipfs:/", "https://ipfs.io/ipfs")
    .replace("https://gateway.pinata.cloud/ipfs", "https://ipfs.io/ipfs");
};
