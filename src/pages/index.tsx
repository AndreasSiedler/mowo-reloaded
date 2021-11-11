import { ListProductsQuery, Product } from "../API";
import { listProducts } from "../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import { GetServerSideProps } from "next";
import { withSSRContext } from "aws-amplify";
import ProductCard from "../components/ProductCard";
import { SimpleGrid } from "@chakra-ui/react";
import Hero from "../components/Hero";

export default function Home({ spaces = [] }: { spaces: Product[] }) {
  return (
    <>
      <SimpleGrid columns={[1, 2, 2, 3, 4]}>
        {spaces.map((space) => (
          <>
            <pre>{JSON.stringify(space, null, 2)}</pre>
            <ProductCard key={space.id} />
          </>
        ))}
      </SimpleGrid>
      <Hero />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const SSR = withSSRContext({ req });

  const response = (await SSR.API.graphql({
    query: listProducts,
  })) as GraphQLResult<ListProductsQuery>;

  return {
    props: {
      spaces: response.data.listProducts.items,
    },
  };
};
