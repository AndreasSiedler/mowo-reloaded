import API, { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { CognitoUser } from "@aws-amplify/auth";
import { AddIcon } from "@chakra-ui/icons";
import { Center, SimpleGrid } from "@chakra-ui/layout";
import { IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import useSWR from "swr";
import { CreateSpaceInput, CreateSpaceMutation, ListSpacesQuery } from "../../../API";
import ActionBar from "../../../components/ActionBar";
import ErrorMessage from "../../../components/ErrorMessage";
import ProductCard from "../../../components/ProductCard";
import SidebarWithHeader from "../../../components/SidebarWithHeader";
import { toastErrorConfig } from "../../../config/constants";
import { useUser } from "../../../context/AuthContext";
import { createSpace } from "../../../graphql/mutations";
import { listSpaces } from "../../../graphql/queries";

const fetcher = async (user: CognitoUser) => {
  const response = (await API.graphql({
    query: listSpaces,
    variables: {
      input: {
        _deleted: !true,
      },
    },
  })) as GraphQLResult<ListSpacesQuery>;
  return response.data.listSpaces.items;
};

/**
 * Fetches all Spaces of user and render them in a grid
 * @return {ReactElement}
 */
export default function Spaces(): ReactElement {
  const { user } = useUser();
  if (user) {
    console.log(user.getUsername());
  }
  const { data, error } = useSWR("/dashboard/listSpaces", fetcher);
  const router = useRouter();
  const toast = useToast();

  async function addSpace() {
    try {
      const createSpaceInput: CreateSpaceInput = {};
      const res = (await API.graphql({
        query: createSpace,
        variables: {
          input: createSpaceInput,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<CreateSpaceMutation>;
      const space = res.data.createSpace;
      router.push(`/dashboard/spaces/${space.id}`);
    } catch (error) {
      toast({ ...toastErrorConfig });
    }
  }

  return (
    <SidebarWithHeader>
      <ActionBar>
        <Tooltip hasArrow label="Add space">
          <IconButton
            aria-label="Add Space"
            size="lg"
            colorScheme="teal"
            variant="solid"
            icon={<AddIcon />}
            onClick={addSpace}
          >
            <AddIcon mr="10px" />
            Add Space
          </IconButton>
        </Tooltip>
      </ActionBar>
      {error && <ErrorMessage error={error} />}
      {!data && (
        <Center>
          <Spinner />
        </Center>
      )}
      <SimpleGrid columns={[1, 2, 2, 3, 4]}>
        {data && data.map((item) => <ProductCard key={item.id} {...item} />)}
      </SimpleGrid>
    </SidebarWithHeader>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      hideHeader: true,
    },
  };
};
