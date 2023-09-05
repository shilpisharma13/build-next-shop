import { getProducts } from "@/utils/shopify/productQueries.js";
import {
  getFilteredProducts,
  getProductsByMultipleOptions,
} from "@/utils/shopify/filterQueries";
import { create } from "zustand";
import { Product, ProductSlice } from "@/lib/createProductSlice";
import { persist } from "zustand/middleware";
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
} from "react";

interface ProductStore {
  allProducts: ProductSlice[];
  filteredProducts: ProductSlice[];
  gridView: boolean;
  filter: boolean;
  sort: string;
  filters: {
    text: string;
    type: string;
    category: string[];
    brand: string[];
    size: string[];
    color: string[];
  };
  loadProducts: () => void;
  updateFilters: (e: ChangeEvent) => void;
  filterProducts: () => void;
  updateSort: (e: FormEvent) => void;
  sortProducts: () => void;
  clearFilters: () => void;
  setGridView: () => void;
  setListView: () => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      allProducts: [],
      filteredProducts: [],
      filter: false,
      sort: "Price (Low to High)",
      filters: {
        text: "",
        type: "",
        category: [],
        brand: [],
        size: [],
        color: [],
      },
      loadProducts: async () => {
        const response = await getProducts();
        set({
          allProducts: response.products.edges,
          filteredProducts: response.products.edges,
          // sort: "",
          filter: false,
        });
      },
      updateFilters: (e) => {
        const filters = get().filters;
        let tempFilters = get().filters;
        let name = e.target?.name;
        let value = e.target?.value;
        let checked = e.target.checked;
        console.log(name, value, checked);
        if (name === "text") {
          return set({
            filters: {
              ...tempFilters,
              [name]: value,
            },
          });
        }
        if (name === "type") {
          value = e.target.textContent;
          set({
            filters: {
              ...tempFilters,
              [name]: value,
            },
          });
        } else {
          if (checked === true) {
            set({
              filters: {
                ...tempFilters,
                [name]: [...filters[name], value],
              },
            });
          }
          if (checked === false) {
            tempFilters[name] = tempFilters[name].filter((b) => b !== value);
            set({
              filters: {
                ...tempFilters,
              },
            });
          }
        }
      },
      filterProducts: () => {
        const allProducts = get().allProducts;
        const filters = get().filters;

        let tempProducts = [...allProducts];
        if (filters.text) {
          tempProducts = tempProducts.filter((p) =>
            p.node.title.toLowerCase().includes(filters.text)
          );
        }
        if (filters.type) {
          tempProducts = tempProducts.filter((p) => {
            const tag = p.node.tags.includes(filters.type.toLowerCase());
            return tag;
          });
        }

        if (filters.brand[0]) {
          let arr;
          arr = filters.brand.map((b) => {
            arr = tempProducts.filter((p) => p.node.vendor === b);
            return arr;
          });
          tempProducts = arr.flat();
        }
        if (filters.category[0]) {
          let arr;
          arr = filters.brand.map((b) => {
            arr = tempProducts.filter((p) => p.node.vendor === b);
            return arr;
          });
          tempProducts = arr.flat();
        }
        // if (filters.size[0]) {
        //   let arr
        //   arr = filters.brand.map((b) => {
        //     arr = tempProducts.filter((p) => p.node.vendor === b)
        //     return arr
        //   })
        //   tempProducts = arr.flat()
        // }
        // if (filters.size[0]) {
        //   let arr
        //   arr = filters.brand.map((b) => {
        //     arr = tempProducts.filter((p) => p.node.vendor === b)
        //     return arr
        //   })
        //   tempProducts = arr.flat()
        // }

        set({
          filteredProducts: [...tempProducts],
        });
      },
      updateSort: (e) => {
        let sortValue = e?.target?.value;
        if (sortValue === "mp") {
          set({
            sort: "Most Popular",
          });
        }
        if (sortValue === "newest") {
          set({
            sort: "New Arrivals",
          });
        }
        if (sortValue === "sale") {
          set({
            sort: "Sale",
          });
        }

        if (sortValue === "lth") {
          set({
            sort: "Price (Low to High)",
          });
        }
        if (sortValue === "htl") {
          set({
            sort: "Price (High to Low)",
          });
        }
      },
      sortProducts: () => {
        const filteredProducts = get().filteredProducts;
        const sortValue = get().sort;
        let tempProducts = [...filteredProducts];
        console.log(sortValue);
        if (sortValue === "mp") {
        }
        if (sortValue === "newest") {
        }
        if (sortValue === "sale") {
        }

        if (sortValue === "Price (Low to High)") {
          tempProducts = tempProducts.sort(
            (a, b) =>
              parseInt(a.node.priceRange.minVariantPrice.amount) -
              parseInt(b.node.priceRange.minVariantPrice.amount)
          );
        }
        if (sortValue === "Price (High to Low)") {
          tempProducts = tempProducts.sort(
            (a, b) =>
              parseInt(b.node.priceRange.minVariantPrice.amount) -
              parseInt(a.node.priceRange.minVariantPrice.amount)
          );
        }
        set({
          filteredProducts: [...tempProducts],
        });
      },
      clearFilters: () => {
        set({
          filter: false,
          sort: "Price (Low to High)",
          filters: {
            text: "",
            type: "",
            category: [],
            brand: [],
            size: [],
            color: [],
          },
        });
      },
      gridView: true,
      setGridView: () => {
        set({ gridView: true });
      },
      setListView: () => {
        set({ gridView: false });
      },
    }),
    {
      name: "cart_shopify",
    }
  )
);
