import { Suspense } from "react";

import { NFTHistory } from "./NFTHistory";

type Props = {
  params: { address: string };
};

export default async function Page({ params: { address } }: Props) {
  return (
    <div>
      <p>Hello</p>
      <Suspense fallback={<div></div>}>
        {/* @ts-expect-error Async Server Component */}
        <NFTHistory address={address} />
      </Suspense>
    </div>
  );
}
