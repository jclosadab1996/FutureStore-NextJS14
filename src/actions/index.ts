"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GraphQLClientSingleton } from "app/graphql";
import { createCartMutation } from "app/graphql/mutations/createCartMutation";
import { createUserMutation } from "app/graphql/mutations/createUserMutation";
import { createAccessToken } from "app/utils/auth/createAccessToken";
import { validateAccessToken } from "app/utils/auth/validateAccessToken";

type CustomerCreate = {
  customerCreate: {
    customer: {
      firstName: string;
      email: string;
    };
  };
};
export const handleCreateUser = async (formData: FormData) => {
  const formDataObject = Object.fromEntries(formData);
  // delete formDataObject["password_confirmation"];
  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();

  const variables = {
    input: {
      email: formDataObject.email,
      firstName: formDataObject.first_name,
      lastName: formDataObject.last_name,
      phone: "+58" + formDataObject.phone,
      password: formDataObject.password,
    },
  };
  // const { customerCreate, customerUserErrors } = await graphqlClient.request(
  const { customerCreate }: CustomerCreate = await graphqlClient.request(
    createUserMutation,
    variables
  );

  if (!customerCreate) {
    console.log("❌ Something went wrong creating the user");
    return null;
  }
  console.log("✅ customerCreate: ", customerCreate);

  const { customer } = customerCreate;

  if (customer?.firstName) {
    await createAccessToken(
      formDataObject.email as string,
      formDataObject.password as string
    );
    redirect("/store");
  }
};

export const handleLogin = async (formData: FormData) => {
  const { email, password } = Object.fromEntries(formData);
  const accesToken = await createAccessToken(
    email as string,
    password as string
  );
  console.log("🚧: ", {
    accesToken,
    email,
    password,
  });
  if (accesToken) {
    redirect("/store");
  }
};

export const handleCreateCart = async (items: CartItem[]) => {
  const cookiesStore = cookies();
  const accesToken = cookiesStore.get("accessToken")?.value as string;

  if (!accesToken) redirect("/login");

  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
  const customer = await validateAccessToken();
  const variables = {
    input: {
      buyerIdentity: {
        customerAccessToken: accesToken,
        email: customer?.email,
      },
      lines: items.map((item) => ({
        merchandiseId: item.merchandiseId,
        quantity: item.quantity,
      })),
    },
  };

  const {
    cartCreate,
  }: {
    cartCreate?: {
      cart?: {
        checkoutUrl: string;
      };
    };
  } = await graphqlClient.request(createCartMutation, variables);

  return cartCreate?.cart?.checkoutUrl;
};
