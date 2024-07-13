import { GraphQLClientSingleton } from "app/graphql";
import { customerAccessTokenCreateMutation } from "app/graphql/mutations/customerAccessTokenCreate";
import { cookies } from "next/headers";

type CustomerAccessTokenCreateMutationType = {
  customerAccessTokenCreate: {
    customerAccessToken: {
      accessToken: string;
      expiresAt: string;
    };
  };
};
export const createAccessToken = async (email: string, password: string) => {
  const cookieStore = cookies();

  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();

  const { customerAccessTokenCreate }: CustomerAccessTokenCreateMutationType =
    await graphqlClient.request(customerAccessTokenCreateMutation, {
      email,
      password,
    });

  /* 
    console.log(customerAccessTokenCreate);
    
    response example 👇
    customerAccessTokenCreate:  {
        customerAccessToken: {
        accessToken: 'b93c2cd81d0dc586e3f40f490eb4f019',
        expiresAt: '2024-02-11T22:51:21Z'
        }
  */
  console.log("👀 customerAccessTokenCreate: ", customerAccessTokenCreate);
  if (!customerAccessTokenCreate?.customerAccessToken) {
    console.log("❌ Something went wrong creating the access token");
    return null;
  }

  const { accessToken, expiresAt } =
    customerAccessTokenCreate?.customerAccessToken;

  cookieStore.set("accessToken", accessToken, {
    path: "/",
    expires: new Date(expiresAt),
    httpOnly: true,
    sameSite: "strict",
  });
  return accessToken;
};
