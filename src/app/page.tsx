import { AddressForm } from "src/component/AddressForm/AddressForm";

export default async function Page() {
  return (
    <div className="relative h-full">
      <p className="text-lg font-bold absolute text-center left-0 right-0 top-20">
        ウォレットのNFT史
      </p>
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <AddressForm />
      </div>
    </div>
  );
}
