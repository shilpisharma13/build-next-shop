import { Product } from '@/lib/createProductSlice'
import SingleProduct from '../../../components/SingleProduct'
import { getSingleProduct } from '../../../utils/shopify'

interface Props {
  params: {
    handle: string
  }
}
const Page = async ({ params: { handle } }: Props) => {
  const response = await getSingleProduct(handle)

  const product: Product = response.productByHandle
 
  return (
    <h1>
      <SingleProduct product={product} />
    </h1>
  )
}

export default Page
