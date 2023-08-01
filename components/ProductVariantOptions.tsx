
const ProductVariantOptions = ({
  name,
  values,
  selectedOptions,
  setOptions,
}) => {
  return (
    <div className='mt-10'>
      <h3 className='text-sm font-medium text-gray-900 pb-2'>{name}</h3>
      <div className='inline-flex items-center flex-wrap'>
        {values.map((value) => {
          const id = `option-${name}-${value}`
          const checked = selectedOptions[name] === value

          return (
            <label key={id} htmlFor={id}>
              <input
                className='sr-only'
                type='radio'
                id={id}
                name={`option-${name}`}
                value={value}
                checked={checked}
                onChange={() => {
                  setOptions(name, value)
                }}
              />
              <div
                className={`p-2 mt-3 text-lg rounded-full block cursor-pointer mr-3 ${
                  checked
                    ? 'text-white bg-gray-900'
                    : 'text-gray-900 bg-gray-200'
                }`}
              >
                <span className='px-2'>{value}</span>
              </div>
            </label>
          )
        })}
      </div>
    </div>
  )
}
export default ProductVariantOptions
