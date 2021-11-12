import { GetStaticProps } from "next";
import React, { ReactElement } from "react";
import FormGenerator from "../../../components/FormGenerator";
import SidebarWithHeader from "../../../components/SidebarWithHeader";
import ProductFormFields from "../../../config/spaces_form_fields.json";

interface Props {}

export default function Spaces({}: Props): ReactElement {
  return (
    <SidebarWithHeader>
      <FormGenerator formData={ProductFormFields[0]} />
    </SidebarWithHeader>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      hideHeader: true,
    },
  };
};
