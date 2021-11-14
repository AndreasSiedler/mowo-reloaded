import { GraphQLResult } from "@aws-amplify/api";
import { withSSRContext } from "aws-amplify";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { ReactElement } from "react";
import { GetSpaceQuery, ListSpacesQuery, Space } from "../../API";
import { getSpace, listSpaces } from "../../graphql/queries";

type SpaceDetailProps = {
  space: Space;
};

/**
 * Renders a space detail page
 * @return {ReactElement}
 */
export default function SpaceDetail({ space }: SpaceDetailProps): ReactElement {
  return <div>{JSON.stringify(space)}</div>;
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const SSR = withSSRContext();
  const res = (await SSR.API.graphql({
    query: getSpace,
    variables: {
      id: params.id,
    },
  })) as GraphQLResult<GetSpaceQuery>;

  const space = res.data.getSpace;

  return {
    props: {
      space,
    },
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export const getStaticPaths: GetStaticPaths = async () => {
  const SSR = withSSRContext();
  const res = (await SSR.API.graphql({
    query: listSpaces,
  })) as GraphQLResult<ListSpacesQuery>;

  const spaces = res.data.listSpaces.items;

  // Get the paths we want to pre-render based on posts
  const paths = spaces.map((space) => ({
    params: { id: space.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};
