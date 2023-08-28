import { ProductSlice } from "@/lib/createProductSlice"
import { Squares2X2Icon } from "@heroicons/react/20/solid"
import ProductCard from "./ProductCard"

interface Props {
  products: []
}
const GridView = ({products}: Props) => {
  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {products?.map((product: ProductSlice) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  )
}
export default GridView

