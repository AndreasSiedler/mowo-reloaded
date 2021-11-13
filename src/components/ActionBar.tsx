import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";

/**
 * Renders a Dashboard action navigation bar
 * @return {ReactElement}
 */
export default function ActionBar(): ReactElement {
  return (
    <HStack>
      <Box>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Docs</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Spacer />
      <Box>
        <Button size="lg" colorScheme="teal" variant="solid">
          Add Space
        </Button>
      </Box>
    </HStack>
  );
}
