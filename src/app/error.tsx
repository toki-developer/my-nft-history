"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  reset;

  return (
    <div className="text-lg text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div>
        <h2 className="text-xl font-bold">エラーが発生しました。🙇‍♀️</h2>
        <p>リロードして、再度お試しください。</p>
      </div>
    </div>
  );
}
