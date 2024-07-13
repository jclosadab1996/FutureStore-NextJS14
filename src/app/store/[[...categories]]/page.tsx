import { ProductsWrapper } from "app/components/Store/ProductsWrapper";
import { getProducts } from "app/services/shopify/products";
import {
  getCollectionProducts,
  getCollections,
} from "app/services/shopify/collections";

interface CategoryProps {
  params: {
    categories: string[];
  };
  searchParams: {
    search?: string;
  };
}

export default async function Category(props: CategoryProps) {
  const { categories } = props.params;
  let products = [];

  if (categories) {
    const collections = await getCollections();

    const selectedCollectionId = collections.find(
      (collection: any) => collection.handle === categories[0]
    ).id;

    products = await getCollectionProducts(selectedCollectionId);
  } else {
    products = await getProducts();
  }

  return <ProductsWrapper products={products} />;
}
