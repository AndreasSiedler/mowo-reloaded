import { ListSpacesQuery, Space } from "../API";
import { listSpaces } from "../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import { GetServerSideProps } from "next";
import { withSSRContext } from "aws-amplify";
import ProductCard from "../components/SpaceCard";
import { Container, SimpleGrid } from "@chakra-ui/react";
import Hero from "../components/Hero";

export default function Home({ spaces = [] }: { spaces: Space[] }) {
  return (
    <Container maxW="container.xl">
      <SimpleGrid columns={[1, 2, 2, 3, 4]}>
        {spaces.map((space) => (
          <>
            <ProductCard key={space.id} {...space} />
          </>
        ))}
      </SimpleGrid>
      <Hero />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const SSR = withSSRContext({ req });

  const response = (await SSR.API.graphql({
    query: listSpaces,
  })) as GraphQLResult<ListSpacesQuery>;

  return {
    props: {
      spaces: response.data.listSpaces.items,
    },
  };
};
