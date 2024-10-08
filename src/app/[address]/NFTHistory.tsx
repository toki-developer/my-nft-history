import { format } from "date-fns";
import { getNFTList } from "src/utils/getNFTList";

export const NFTHistory = async ({ address }: { address: string }) => {
  const nftList = await getNFTList(address);

  if (nftList.length == 0) {
    return (
      <p className="text-center font-bold">NFTのデータが見つかりませんでした</p>
    );
  }

  return (
    <div className="overflow-hidden w-72 md:w-[700px] mx-auto flex justify-between items-stretch">
      <div className="bg-white w-1" />
      <div className="grid grid-cols-3 w-52 md:w-[510px] my-20">
        {nftList.map((nft, i) => {
          const p = i % 3;
          return (
            <div
              key={nft.contractAddress}
              className={`${
                p == 0 ? "pb-40" : p == 1 ? "py-20" : "pt-40"
              } text-center relative mb-4`}
            >
              <p
                className={`absolute text-[6px] md:text-base ${
                  p == 0
                    ? "bottom-[200px] -left-[74px] md:-left-[150px]"
                    : p == 1
                    ? "bottom-[120px] -left-[144px] md:-left-[320px]"
                    : "bottom-[40px] -left-[214px] md:-left-[490px]"
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
                  alt={"Image Not Found"}
                  className=" w-14 h-14 md:w-24 md:h-24 mx-auto object-cover"
                />
              ) : (
                <div className=" w-24 h-24 mx-auto" />
              )}
              {nft.name ? (
                <p className="mt-4 h-5 text-[6px] md:text-sm">{nft.name}</p>
              ) : (
                <p className="mt-4 h-5 text-[6px] md:text-sm">
                  情報が見つかりません
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
