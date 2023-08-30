export const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Sale', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
export const filterHandles = [
  { name: 'Men', href: '#' },
  { name: 'Women', href: '#' },
  { name: 'Kids', href: '#' },
  { name: 'Sale', href: '#' },
]
export const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'Clothing', label: 'Clothing', checked: false },
      { value: 'Backpacks', label: 'Backpacks', checked: false },
      { value: 'Shoes', label: 'Shoes', checked: true },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },

  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'VANS', label: 'VANS', checked: false },
      { value: 'ADIDAS', label: 'ADIDAS', checked: false },
      { value: 'NIKE', label: 'NIKE', checked: false },
      { value: 'SUPRA', label: 'SUPRA', checked: false },
      { value: 'PUMA', label: 'PUMA', checked: false },
      { value: 'TIMEBERLAND', label: 'TIMEBERLAND', checked: false },
      { value: 'CONVERSE', label: 'CONVERSE', checked: false },
      { value: 'DR MARTENS', label: 'DR MARTENS', checked: false },
    ],
  },
]
