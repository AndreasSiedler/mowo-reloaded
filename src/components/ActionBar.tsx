import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack, Spacer } from "@chakra-ui/react";
import React, { ReactElement, ReactNode } from "react";

/**
 * Renders a Dashboard action navigation bar
 * @return {ReactElement}
 */
export default function ActionBar({ children }: { children: ReactNode }): ReactElement {
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
      <Box>{children}</Box>
    </HStack>
  );
}
