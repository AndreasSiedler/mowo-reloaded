import API, { GraphQLResult } from "@aws-amplify/api";
import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import useSWR from "swr";
import { GetSpaceQuery, Space, UpdateProductMutation } from "../../../API";
import ErrorMessage from "../../../components/ErrorMessage";
import FormGenerator from "../../../components/FormGenerator";
import SidebarWithHeader from "../../../components/SidebarWithHeader";
import ProductFormFields from "../../../config/spaces_form_fields.json";
import { updateProduct } from "../../../graphql/mutations";
import { getSpace } from "../../../graphql/queries";

const fetcher = async (spaceId: string) => {
  const response = (await API.graphql({
    query: getSpace,
    variables: {
      id: spaceId,
    },
  })) as GraphQLResult<GetSpaceQuery>;
  return response.data.getSpace;
};

/**
 * Renders a update/add space form
 * @return {ReactElement}
 */
export default function Spaces(): ReactElement {
  const router = useRouter();
  const { spaceId } = router.query;
  const { data, error } = useSWR("/dashboard/spaces/getSpace", () => fetcher(spaceId as string));
  const toast = useToast();

  async function handleSubmit(data: Space) {
    console.log("data", data);
    try {
      const input = {
        id: data.id,
        title: data.title,
      };

      const response = (await API.graphql({
        query: updateProduct,
        variables: {
          input: input,
        },
      })) as GraphQLResult<UpdateProductMutation>;

      toast({
        title: "Space updated.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return response.data.updateProduct;
    } catch (error) {
      toast({
        title: "Failure.",
        description: "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  }

  return (
    <SidebarWithHeader>
      {error && <ErrorMessage error={error} />}
      {!data && (
        <Center>
          <Spinner />
        </Center>
      )}
      {data && (
        <FormGenerator formData={ProductFormFields[0]} defaults={data} onSubmit={handleSubmit} />
      )}
    </SidebarWithHeader>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  return {
    props: {
      hideHeader: true,
      title: "Juhu",
    },
  };
};
