import { MainProducts } from "app/components/home/MainProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "✨ Future World ✨",
  description: "Welcome to the future world, an E-commerce from other century",
};

export default function Home() {
  return (
    <main>
      <MainProducts />
    </main>
  );
}
