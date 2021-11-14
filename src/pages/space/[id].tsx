import { GraphQLResult } from "@aws-amplify/api";
import { Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import { withSSRContext } from "aws-amplify";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { ReactElement } from "react";
import { GetSpaceQuery, ListSpacesQuery, Space } from "../../API";
import SwiperGallery from "../../components/SwiperGallery";
import { getSpace, listSpaces } from "../../graphql/queries";

const dummyImages = [
  {
    img: "https://images.unsplash.com/photo-1426901523280-39daa6101bce",
    title: "Random image",
    alt: "Random alt text",
  },
  {
    img: "https://images.unsplash.com/photo-1426901555017-389235de7b0d",
    title: "Random image",
    alt: "Random alt text",
  },
  {
    img: "https://images.unsplash.com/photo-1425321395722-b1dd54a97cf3",
    title: "Random image",
    alt: "Random alt text",
  },
  {
    img: "https://images.unsplash.com/photo-1426901428072-737be6c018f9",
    title: "Random image",
    alt: "Random alt text",
  },
];

type SpaceDetailProps = {
  space: Space;
};

/**
 * Renders a space detail page
 * @return {ReactElement}
 */
export default function SpaceDetail({ space }: SpaceDetailProps): ReactElement {
  return (
    <>
      <section>
        <SwiperGallery data={dummyImages} />
        <Container maxW="container.xl">
          <Grid h="200px" templateColumns="repeat(12, 1fr)" gap={4}>
            <GridItem colSpan={[12, 8]}>
              {space.title && <Heading size="xl">{space.title}</Heading>}
            </GridItem>
            <GridItem colSpan={[12, 4]} bg="tomato" />
          </Grid>
        </Container>
      </section>
    </>
  );
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
