import { GraphQLClientSingleton } from "app/graphql";
import { customerName } from "app/graphql/queries/customerName";
import { cookies } from "next/headers";

type CustomerType = {
  customer: {
    firstName: string;
    email: string;
  };
};

export const validateAccessToken = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (accessToken) {
    const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
    const { customer }: CustomerType = await graphqlClient.request(
      customerName,
      {
        customerAccessToken: accessToken,
      }
    );
    return customer;
  }
  return null;
};
