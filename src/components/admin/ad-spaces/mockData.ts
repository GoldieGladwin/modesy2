import { AdSpaceConfig } from "./types";

export const adSpaceOptions: { id: string; name: string }[] = [
  { id: "index_1", name: "Index Ad Space 1" },
  { id: "index_2", name: "Index Ad Space 2" },
  { id: "products_sidebar", name: "Products Sidebar" },
  { id: "products_header", name: "Products Header" },
  { id: "product_bottom", name: "Product Bottom" },
  { id: "blog_1", name: "Blog Ad Space 1" },
  { id: "blog_2", name: "Blog Ad Space 2" },
  { id: "profile", name: "Profile Ad Space" },
];

export const initialAdSpacesData: Record<string, AdSpaceConfig> = {
  index_1: {
    id: "index_1",
    name: "Index Ad Space 1",
    desktop: {
      width: 728,
      height: 90,
      adCode: "",
      adUrl: "",
    },
    mobile: {
      width: 300,
      height: 250,
      adCode: "",
      adUrl: "",
    },
  },
  index_2: {
    id: "index_2",
    name: "Index Ad Space 2",
    desktop: {
      width: 728,
      height: 90,
      adCode: "",
      adUrl: "",
    },
    mobile: {
      width: 300,
      height: 250,
      adCode: "",
      adUrl: "",
    },
  },
};
