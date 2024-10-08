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
    <div>
      <div className="flex flex-col md:flex-row gap-8 w-screen justify-center">
        <div className="relative w-screen md:w-auto px-8 md:px-0">
          <input
            {...register("address", { ...addressFormat })}
            className="bg-black h-full  border rounded-md border-gray-700 w-full md:mx-0 md:w-[400px] px-4 text-sm md:text-xl py-3 md:py-1"
            placeholder="Wallet アドレスを入力してください"
          />
          {errors.address?.message ? (
            <p className="absolute -bottom-6 md:-bottom-8 text-red-500 text-sm ">
              {errors.address.message}
            </p>
          ) : null}
        </div>
        <button
          className="flex-none border rounded-sm px-4 py-2 md:px-2 w-fit mx-auto md:mx-0 border-blue-500 text-blue-500"
          onClick={handleClick}
        >
          検索
        </button>
      </div>
    </div>
  );
};
