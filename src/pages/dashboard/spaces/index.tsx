import API, { GraphQLResult } from "@aws-amplify/api";
import { AddIcon } from "@chakra-ui/icons";
import { Center } from "@chakra-ui/layout";
import { IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import useSWR from "swr";
import { CreateSpaceMutation, ListSpacesQuery } from "../../../API";
import ActionBar from "../../../components/ActionBar";
import ErrorMessage from "../../../components/ErrorMessage";
import ProductCard from "../../../components/ProductCard";
import SidebarWithHeader from "../../../components/SidebarWithHeader";
import { createSpace } from "../../../graphql/mutations";
import { listSpaces } from "../../../graphql/queries";

const fetcher = async () => {
  const response = (await API.graphql({ query: listSpaces })) as GraphQLResult<ListSpacesQuery>;
  return response.data.listSpaces.items;
};

/**
 * Fetches all Spaces of user and render them in a grid
 * @return {ReactElement}
 */
export default function Spaces(): ReactElement {
  const { data, error } = useSWR("/dashboard/listSpaces", fetcher);
  const router = useRouter();
  const toast = useToast();

  function SpacesGrid() {
    if (data) {
      return <> {data && data.map((item) => <ProductCard key={item.id} {...item} />)}</>;
    }
    return null;
  }

  async function addSpace() {
    try {
      const res = (await API.graphql({
        query: createSpace,
        variables: {
          input: {},
        },
      })) as GraphQLResult<CreateSpaceMutation>;
      const space = res.data.createSpace;
      router.push(`/dashboard/spaces/${space.id}`);
    } catch (error) {
      console.log(error);
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
      <SpacesGrid />
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
