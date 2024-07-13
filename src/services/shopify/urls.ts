import { env } from "app/config/env";

/*
Admin REST API endpoints are organized by resource type.
You’ll need to use different endpoints depending on your app’s requirements.

All Admin REST API endpoints follow this pattern:
https://{store_name}.myshopify.com/admin/api/2023-10/{resource}.json

The Admin API is versioned, with new releases four times per year.

ref: https://shopify.dev/docs/api/admin-rest
*/
export const shopifyUrls = {
  products: {
    all: `${env.SHOPIFY_HOSTNAME}/admin/api/2023-10/products.json`,
    mainProducts: `${env.SHOPIFY_HOSTNAME}/admin/api/2023-10/collections/431758475493/products.json`,
  },
  collections: {
    all: `${env.SHOPIFY_HOSTNAME}/admin/api/2023-10/smart_collections.json`,
    products: (id: string) =>
      `${env.SHOPIFY_HOSTNAME}/admin/api/2023-10/collections/${id}/products.json`,
  },
};
