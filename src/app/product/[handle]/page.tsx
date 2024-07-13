import { redirect } from "next/navigation";
import { ProductView } from "app/components/product/ProductView";
import { getProducts } from "app/services/shopify/products";
import sanitizeHtml from "sanitize-html";

interface ProductPageProps {
  searchParams: {
    id: string;
  };
}

export async function generateMetadata({ searchParams }: ProductPageProps) {
  const id = searchParams.id;
  const products = await getProducts(id);

  return {
    title: `${products[0].title} | Future World`,
    description: sanitizeHtml(products[0].description, { allowedTags: [] }),
    openGraph: {
      images: [
        {
          url: products[0].image,
          alt: products[0].title,
        },
      ],
    },
  };
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const id = searchParams.id;
  const products = await getProducts(id);

  if (!id) redirect("/store");

  return <ProductView product={products[0]} />;
}
