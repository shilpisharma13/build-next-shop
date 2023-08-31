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
export const Tfilters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'Clothing', label: 'Clothing', checked: false },
      { value: 'Backpacks', label: 'Backpacks', checked: false },
      { value: 'Shoes', label: 'Shoes', checked: false },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },

  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '4', label: '4', checked: false },
      { value: '5', label: '5', checked: false },
      { value: '6', label: '6', checked: false },
      { value: '7', label: '7', checked: false },
      { value: '8', label: '8', checked: false },
      { value: '9', label: '9', checked: false },
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
