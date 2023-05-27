import "tailwindcss/tailwind.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFT史",
  description: "今までに手に入れてきたNFTの歴史",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-black text-white h-screen">{children}</body>
    </html>
  );
}
