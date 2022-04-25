import { SWRHook } from "@plasmicpkgs/commerce";
import { UseBrands, useBrands } from "@plasmicpkgs/commerce";
import { useMemo } from "react";
import {
  GetAllProductPathsQuery,
  GetAllProductPathsQueryVariables,
} from "../schema";
import { GetBrandsHook } from "../types/site";
import { getAllProductVendors } from "../utils";

export default useBrands as UseBrands<typeof handler>;

export const handler: SWRHook<GetBrandsHook> = {
  fetchOptions: {
    query: getAllProductVendors,
  },
  async fetcher({ input, options, fetch }) {
    const data = await fetch<
      GetAllProductPathsQuery,
      GetAllProductPathsQueryVariables
    >({
      query: getAllProductVendors,
      variables: {
        first: 250,
      },
    });

    let vendorsStrings = data?.products?.edges.map(
      ({ node: { slug } }) => slug
    );
    return Array.from(new Set(vendorsStrings).values()).map((v) => {
      const id = v.replace(/\s+/g, "-").toLowerCase();
      return {
        entityId: id,
        name: v,
        path: `brands/${id}`,
      };
    });
  },
  useHook:
    ({ useData }) =>
    (input) => {
      const response = useData({
        swrOptions: { revalidateOnFocus: false, ...input?.swrOptions },
      });
      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return (response.data?.length ?? 0) <= 0;
              },
              enumerable: true,
            },
          }),
        [response]
      );
    },
};
