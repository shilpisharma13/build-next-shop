"use client";

import ProductsPage from "./ProductsPage";

import { useProductStore } from "@/context/useProductStore";

import useStore from "@/context/useStore";
import { useEffect } from "react";

interface Props {
  products: [];
}

const AllProducts = ({ products }: Props) => {
  const [filteredProducts, loadProducts, filterProducts, sortProducts] =
    useProductStore((state) => [
      state.filteredProducts,
      state.loadProducts,
      state.filterProducts,
      state.sortProducts,
    ]);

  const filter = useStore(useProductStore, (state) => state.filter);
  const filters = useStore(useProductStore, (state) => state.filters);
  const sort = useStore(useProductStore, (state) => state.sort);

  useEffect(() => {
    loadProducts();
  }, [filter]);

  useEffect(() => {
    filterProducts();
    sortProducts();
  }, [filters, sort, filter]);

  // useEffect(() => {
  //   sortProducts()
  // }, [sort])

  return <ProductsPage products={filteredProducts} />;
  // if (filter === false) return <ProductsPage products={products} />
  // if (filter === true) return <ProductsPage products={filteredProducts} />
};
export default AllProducts;
