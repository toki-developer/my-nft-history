import { getNFTList } from "src/utils/getNFTList";

export const NFTHistory = async ({ address }: { address: string }) => {
  getNFTList(address);
  return <div>コンポーネント</div>;
};
