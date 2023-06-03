import { Suspense } from "react";
import { Loading } from "src/component/Loaidng/Loading";
import { addShortStr } from "src/utils/addShortStr";

import { NFTHistory } from "./NFTHistory";

// export const revalidate = 86400;
// export const dynamic = "force-static";
// export const fetchCache = "force-cache";

type Props = {
  params: { address: string };
};

export default async function Page({ params: { address } }: Props) {
  return (
    <div className="my-20">
      <p className="text-center mb-20 font-bold  md:text-3xl">
        {addShortStr(address)} の <span className="font-bold">NFT </span>史
      </p>
      <Suspense fallback={<LoadingFallback />}>
        {/* @ts-expect-error Async Server Component */}
        <NFTHistory address={address} />
      </Suspense>
    </div>
  );
}

const LoadingFallback = () => {
  return (
    <div>
      <Loading />
      <p className="text-center md:text-lg mt-4">
        データ検索中です。
        <br />
        しばらくお待ちください。
      </p>
    </div>
  );
};
