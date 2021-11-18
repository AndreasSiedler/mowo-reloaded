import NextLink from "next/link";
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Space } from "../../API";
import Storage from "@aws-amplify/storage";
import Rating from "./Rating";

const data = {
  id: "123",
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

/**
 * SpaceCard renders a card with a space image, title, description and price
 * @param {Product} props
 * @return {ReactElement}
 */
export default function SpaceCard({ id, title, images = [], _deleted }: Space): ReactElement {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    async function getImageUrl(key: string): Promise<string> {
      // get the signed URL string
      const signedURL = await Storage.get(key); // get key from Storage.list
      return signedURL;
    }

    async function loadImages() {
      const imageUrls = await Promise.all<string>(images.map(async (img) => getImageUrl(img.key)));
      setImageUrls(imageUrls);
    }

    loadImages();
  }, []);

  return (
    <LinkBox>
      <Flex p={5} w="full" alignItems="center" justifyContent="center">
        <Box
          bg={useColorModeValue("white", "gray.800")}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="sm"
          position="relative"
        >
          {data.isNew && <Circle size="10px" position="absolute" top={2} right={2} bg="red.200" />}

          <Image src={imageUrls[0]} alt={`Picture of ${data.name}`} roundedTop="lg" />

          <Box p="6">
            <Box d="flex" alignItems="baseline">
              {_deleted && (
                <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                  Deleted
                </Badge>
              )}
            </Box>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box fontSize="2xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                <NextLink href={`/dashboard/spaces/${id}`}>
                  <LinkOverlay href="#">{title}</LinkOverlay>
                </NextLink>
              </Box>
              <Tooltip
                label="Add to cart"
                bg="white"
                placement={"top"}
                color={"gray.800"}
                fontSize={"1.2em"}
              >
                <chakra.a href={"#"} display={"flex"}>
                  <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
                </chakra.a>
              </Tooltip>
            </Flex>

            <Flex justifyContent="space-between" alignContent="center">
              <Rating rating={data.rating} numReviews={data.numReviews} />
              <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
                <Box as="span" color={"gray.600"} fontSize="lg">
                  £
                </Box>
                {data.price.toFixed(2)}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </LinkBox>
  );
}
