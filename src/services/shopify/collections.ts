import { env } from "app/config/env";
import { shopifyUrls } from "./urls";

//📌 https://shopify.dev/docs/api/admin-rest/2023-10/resources/smartcollection

export const getCollections = async () => {
  try {
    const response = await fetch(shopifyUrls.collections.all, {
      headers: new Headers({
        "X-Shopify-Access-Token": env.SHOPIFY_TOKEN,
      }),
    });
    const { smart_collections } = await response.json();

    const transformedCollections = smart_collections.map((collection: any) => {
      const { id, title, handle } = collection;
      return { id, title, handle };
    });
    return transformedCollections;
  } catch (error) {}
};

export const getCollectionProducts = async (id: string) => {
  try {
    const response = await fetch(shopifyUrls.collections.products(id), {
      headers: new Headers({
        "X-Shopify-Access-Token": env.SHOPIFY_TOKEN,
      }),
    });
    const { products } = await response.json();

    return products;
  } catch (error) {}
};
