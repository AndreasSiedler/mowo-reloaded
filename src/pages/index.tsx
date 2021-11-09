import { Heading } from "@chakra-ui/react";
import { useUser } from "../context/AuthContext";

export default function Home() {
  const { user } = useUser();
  console.log("Current User is ", user);
  return <Heading as="h1">Hello World</Heading>;
}
