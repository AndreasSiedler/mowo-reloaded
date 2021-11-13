import { GraphQLResult } from "@aws-amplify/api";
import { withSSRContext } from "aws-amplify";
import { GetStaticProps } from "next";
import React, { ReactElement } from "react";
import { ListProductsQuery } from "../API";
import { listProducts } from "../graphql/queries";

interface Props {}

export default function SpaceDetail({}: Props): ReactElement {
  return <div>Space Details</div>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const SSR = withSSRContext();

  const response = (await SSR.API.graphql({
    query: listProducts,
  })) as GraphQLResult<ListProductsQuery>;

  return {
    props: "test",
  };
};
