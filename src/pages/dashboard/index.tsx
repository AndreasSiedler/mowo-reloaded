import { GetStaticProps } from "next";
import React, { ReactElement } from "react";
import SidebarWithHeader from "../../components/SidebarWithHeader";

interface Props {}

export default function Dashboard({}: Props): ReactElement {
  return <SidebarWithHeader>Dashboard Home</SidebarWithHeader>;
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      hideHeader: true,
    },
  };
};
