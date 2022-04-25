import { Registerable } from "./registerable";
import React from "react";
import { getCommerceProvider } from "./saleor";
import { GlobalContextMeta } from "@plasmicapp/host";
import registerGlobalContext from "@plasmicapp/host/registerGlobalContext";

interface CommerceProviderProps {
  children?: React.ReactNode;
  saleor_api_url: string;
}
export const commerceProviderMeta: GlobalContextMeta<CommerceProviderProps> = {
  name: "plasmic-commerce-saleor-provider",
  displayName: "Saleor Provider",
  props: {
    saleor_api_url: "string",
  },
  importPath: "commerce-providers/saleor",
  importName: "SaleorProvider",
};

function CommerceProviderComponent(props: CommerceProviderProps) {
  const { saleor_api_url, children } = props;

  const CommerceProvider = getCommerceProvider(saleor_api_url);

  return <CommerceProvider>{children}</CommerceProvider>;
}

export function registerCommerceProvider(
  loader?: Registerable,
  customCommerceProviderMeta?: GlobalContextMeta<CommerceProviderProps>
) {
  const doRegisterComponent: typeof registerGlobalContext = (...args) =>
    loader
      ? loader.registerGlobalContext(...args)
      : registerGlobalContext(...args);
  doRegisterComponent(
    CommerceProviderComponent,
    customCommerceProviderMeta ?? commerceProviderMeta
  );
}
