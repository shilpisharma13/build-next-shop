import { ListBulletIcon } from '@heroicons/react/20/solid'
import { ProductSlice } from '@/lib/createProductSlice'
import { Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'

interface Props {
  products: []
}
const ListView = ({ products }: Props) => {
  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-10 '>
      {products?.map((product: ProductSlice) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  )
}
export default ListView
