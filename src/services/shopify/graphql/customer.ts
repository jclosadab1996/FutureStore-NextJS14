import { GraphQLClientSingleton } from "app/graphql";
import { getOrdersQuery } from "app/graphql/queries/getOrders";
import { cookies } from "next/headers";

type CustomerType = {
  customer: {
    orders: {
      edges: any[];
      totalCount: number;
    };
  };
};

export const getCustomerOrders = async () => {
  const cookiesStorage = cookies();
  const accessToken = cookiesStorage.get("accessToken")?.value || "";
  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
  const variables = {
    customerAccessToken: accessToken,
  };

  const { customer }: CustomerType = await graphqlClient.request(
    getOrdersQuery,
    variables
  );
  const orders = customer?.orders?.edges.map((edge: any) => edge.node);
  return {
    totalOrders: customer?.orders?.totalCount,
    orders,
  };
};
