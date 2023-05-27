import { format } from "date-fns";
import { getNFTList } from "src/utils/getNFTList";

export const NFTHistory = async ({ address }: { address: string }) => {
  const nftList = await getNFTList(address);

  return (
    <div className="overflow-hidden w-[700px] mx-auto flex justify-between items-stretch">
      <div className="bg-white w-1" />
      <div className="grid grid-cols-3 w-[510px] my-20">
        {nftList.map((nft, i) => {
          const p = i % 3;
          return (
            <div
              key={nft.contractAddress}
              className={`${
                p == 0 ? "mb-40" : p == 1 ? "my-20" : "mt-40"
              } text-center relative mb-4`}
            >
              <p
                className={`absolute ${
                  p == 0
                    ? "bottom-[200px] -left-[150px]"
                    : p == 1
                    ? "bottom-[120px] -left-[320px]"
                    : "bottom-[40px] -left-[490px]"
                } `}
              >
                {format(new Date(nft.data), "yyyy年M月d日")}
              </p>
              <div
                className={`absolute h-[1px] w-screen bg-white right-[100%] ${
                  p == 0
                    ? "bottom-[200px]"
                    : p == 1
                    ? "bottom-[120px]"
                    : "bottom-[40px]"
                }`}
              />
              {nft.imageUrl ? (
                <img
                  src={nft.imageUrl}
                  alt={nft.name}
                  className=" w-24 h-24 mx-auto"
                />
              ) : (
                <div />
              )}
              {nft.name ? <p className="mt-4">{nft.name}</p> : <div />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
