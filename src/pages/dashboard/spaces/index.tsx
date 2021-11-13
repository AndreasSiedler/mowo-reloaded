import API, { GraphQLResult } from "@aws-amplify/api";
import { Button, IconButton } from "@chakra-ui/button";
import { Center, Flex, Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { GetStaticProps } from "next";
import React, { ReactElement } from "react";
import useSWR from "swr";
import { ListProductsQuery } from "../../../API";
import ActionBar from "../../../components/ActionBar";
import ProductCard from "../../../components/ProductCard";
import SidebarWithHeader from "../../../components/SidebarWithHeader";
import { listProducts } from "../../../graphql/queries";

const fetcher = async () => {
  const response = (await API.graphql({ query: listProducts })) as GraphQLResult<ListProductsQuery>;
  return response.data.listProducts.items;
};

/**
 * Fetches all Spaces of user and render them in a grid
 * @return {ReactElement}
 */
export default function Spaces(): ReactElement {
  const { data, error } = useSWR("/amplify/listProducts", fetcher);

  function ErrorResponse() {
    if (error) {
      return (
        <Center>
          <Heading as="h4">Something went wrong...</Heading>
        </Center>
      );
    }
    return null;
  }

  function LoadingSpinner() {
    if (!data) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
    return null;
  }

  function SpacesGrid() {
    if (data) {
      return <> {data && data.map((item) => <ProductCard key={item.id} {...item} />)}</>;
    }
    return null;
  }

  return (
    <SidebarWithHeader>
      <ActionBar />
      <ErrorResponse />
      <LoadingSpinner />
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
