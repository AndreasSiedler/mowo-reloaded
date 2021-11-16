import API, { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { DeleteIcon } from "@chakra-ui/icons";
import { Center } from "@chakra-ui/layout";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import useSWR from "swr";
import {
  DeleteSpaceInput,
  DeleteSpaceMutation,
  GetSpaceQuery,
  GetSpaceQueryVariables,
  Space,
  UpdateSpaceInput,
  UpdateSpaceMutation,
} from "../../../API";
import ActionBar from "../../../components/ActionBar";
import ErrorMessage from "../../../components/ErrorMessage";
import FormGenerator from "../../../components/FormGenerator";
import SidebarWithHeader from "../../../components/SidebarWithHeader";
import { toastErrorConfig, toastSuccessConfig } from "../../../config/constants";
import ProductFormFields from "../../../config/spaces_form_fields.json";
import { updateSpace, deleteSpace } from "../../../graphql/mutations";
import { getSpace } from "../../../graphql/queries";

const fetcher = async (spaceId: string) => {
  const variables: GetSpaceQueryVariables = {
    id: spaceId,
  };
  const response = (await API.graphql({
    query: getSpace,
    variables: variables,
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
  const { data, error } = useSWR(`/dashboard/spaces/getSpace/${spaceId}`, () =>
    fetcher(spaceId as string)
  );
  const toast = useToast();

  async function handleSubmit(data: Space) {
    try {
      const input: UpdateSpaceInput = {
        id: data.id,
        title: data.title,
        images: data.images,
        _version: data._version,
      };

      const response = (await API.graphql({
        query: updateSpace,
        variables: {
          input: input,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<UpdateSpaceMutation>;

      toast({ ...toastSuccessConfig });
      return response.data.updateSpace;
    } catch (error) {
      toast({ ...toastErrorConfig });
    }
  }

  async function removeSpace() {
    try {
      if (!data) throw Error;
      const deleteSpaceInput: DeleteSpaceInput = {
        id: data.id,
        _version: data._version,
      };

      (await API.graphql({
        query: deleteSpace,
        variables: {
          input: deleteSpaceInput,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<DeleteSpaceMutation>;

      toast({ ...toastSuccessConfig });
      return router.push("/dashboard/spaces");
    } catch (error) {
      console.error(error);
      toast({ ...toastErrorConfig });
    }
  }

  return (
    <SidebarWithHeader>
      <ActionBar>
        <Tooltip hasArrow label="Delete space">
          <IconButton
            aria-label="Add Space"
            size="lg"
            colorScheme="teal"
            variant="solid"
            icon={<DeleteIcon />}
            onClick={removeSpace}
          />
        </Tooltip>
      </ActionBar>
      {error && <ErrorMessage error={error} />}
      {!data && (
        <Center>
          <Spinner />
        </Center>
      )}
      {data && (
        <FormGenerator formData={ProductFormFields[0]} initialData={data} onSubmit={handleSubmit} />
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
