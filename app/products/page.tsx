import Sort from '@/components/Sort'
import { getProducts } from '../../utils/shopify'
import SidebarFilter from '@/components/SidebarFilter'
import Products from '@/components/Products'

export default async function Page() {
  const response = await getProducts()
  const initialData: [] = response.products.edges ? response.products.edges : []

  // const collectionsResponse = await getCollectionsList()
  // const collectionsList = collectionsResponse.collections.edges

  // const categoriesResponse = await getCategoriesList()
  // const categoriesList = new Set(
  //   categoriesResponse.products.nodes.map((item) => item.productType)
  // )

  return (
    <div className='bg-white'>
      {/* <StoreInitializer cart={cart}, cartOpen={cartOpen}/> */}
      <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-5 gap-4'>
          <div className='col-span-5 flex items-baseline justify-end border-b border-gray-200 pb-4 pt-24'>
            <Sort />
          </div>
          <div className='col-span-1 pr-3'>
            <SidebarFilter />
          </div>
          <div className='col-span-4'>
            <Products products={initialData} />
          </div>
        </div>
      </main>
    </div>
  )
}

// sm md lg xl 2xl
