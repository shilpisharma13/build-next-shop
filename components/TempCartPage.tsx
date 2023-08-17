import Link from 'next/link'
import Image from 'next/image'

const TempCartPage = ({ data }) => {
  return (
    <form action={data.cart.checkoutUrl} method='GET'>
      <ul>
        {data.cart.lines.edges.map((item) => {
          const variant = item.node.merchandise
          return (
            <li key={item.node.id}>
              <div>
                <Image
                  src={variant.image.url}
                  alt={variant.image.altText}
                  width={variant.image.width}
                  height={variant.image.height}
                />
              </div>
              <Link href={'/products/' + variant.product.handle}>
                {variant.product.title}
              </Link>
              <div>{variant.priceV2.amount}</div>
              <div>Quantity: {item.node.quantity}</div>
              {/* <button
                onClick={() => {
                  console.log('removed')
                  // handleRemoveItem(data.cart.id, item.node.id)
                }}
              >
                Remove
              </button> */}
            </li>
          )
        })}
      </ul>
      <h2>Total</h2>
      {/* <div>{data.cart.estimatedCost.totalAmount.amount}</div> */}
      {/* <button type='submit'>Checkout</button> */}
    </form>
  )
}
export default TempCartPage
