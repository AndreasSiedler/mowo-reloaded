import { ListPostsQuery, Post } from "../API";
import { listPosts } from "../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import { GetServerSideProps } from "next";
import { withSSRContext } from "aws-amplify";

export default function Home({ posts = [] }: { posts: Post[] }) {
  return <div>{JSON.stringify(posts)}</div>;
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
