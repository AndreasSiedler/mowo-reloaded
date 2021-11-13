import React, { ReactElement } from "react";
import NextLink from "next/link";
import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  VStack,
  Text,
  Box,
  MenuList,
  MenuItem,
  useColorModeValue,
  MenuDivider,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { Auth } from "aws-amplify";

/**
 * Renders a Profile button with dropdown menu
 * @return {ReactElement}
 */
export default function ProfileButton(): ReactElement {
  return (
    <Menu>
      <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
        <HStack>
          <Avatar
            size={"sm"}
            src={
              "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            }
          />
          <VStack
            display={{ base: "none", md: "flex" }}
            alignItems="flex-start"
            spacing="1px"
            ml="2"
          >
            <Text fontSize="sm">Justina Clark</Text>
            <Text fontSize="xs" color="gray.600">
              Admin
            </Text>
          </VStack>
          <Box display={{ base: "none", md: "flex" }}>
            <FiChevronDown />
          </Box>
        </HStack>
      </MenuButton>
      <MenuList
        bg={useColorModeValue("white", "gray.900")}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <NextLink href="/dashboard">
          <MenuItem>Profile</MenuItem>
        </NextLink>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Billing</MenuItem>
        <MenuDivider />
        <MenuItem onClick={() => Auth.signOut()}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  );
}
