import { ListPostsQuery, Post } from "../API";
import { listPosts } from "../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import { GetServerSideProps } from "next";
import { withSSRContext } from "aws-amplify";
import ProductCard from "../components/ProductCard";
import { SimpleGrid } from "@chakra-ui/react";
import Hero from "../components/Hero";

export default function Home({ posts = [] }: { posts: Post[] }) {
  return (
    <>
      <SimpleGrid columns={[1, 2, 2, 3, 4]}>
        {posts.map((post) => (
          <ProductCard key={post.id} />
        ))}
      </SimpleGrid>
      <Hero />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const SSR = withSSRContext({ req });

  const response = (await SSR.API.graphql({ query: listPosts })) as GraphQLResult<ListPostsQuery>;

  return {
    props: {
      posts: response.data.listPosts.items,
    },
  };
};
