import { Squares2X2Icon } from "@heroicons/react/20/solid"


const GridView = () => {
  return (
    <button
      type='button'
      className='-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7'
    >
      <span className='sr-only'>View grid</span>
      <Squares2X2Icon className='h-5 w-5' aria-hidden='true' />
    </button>
  )
}
export default GridView

