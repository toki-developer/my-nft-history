"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Loading } from "../Loaidng/Loading";

const addressFormat = {
  pattern: {
    value: /^0x[0-9a-fA-F]{40}$/,
    message: "アドレス入力に不備があります",
  },
  required: { value: true, message: "アドレス入力に不備があります" },
};

export const AddressForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<{ address: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = handleSubmit((v) => {
    setIsLoading(true);
    router.push(`/${v.address}`);
  });

  if (isLoading) {
    return (
      <div>
        <Loading />
        <p className="mt-4 animate-pulse">画面遷移中</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex">
        <input
          {...register("address", { ...addressFormat })}
          className="bg-black  border rounded-md border-gray-700 w-[400px] pl-4 text-xl py-1"
          placeholder="Wallet アドレスを入力してください"
        />
        <button
          className="flex-none ml-2 border rounded-sm px-2 border-blue-500 text-blue-500"
          onClick={handleClick}
        >
          送信
        </button>
      </div>
      {errors.address?.message ? (
        <p className="absolute -bottom-8 text-red-500 text-sm">
          {errors.address.message}
        </p>
      ) : null}
    </div>
  );
};
