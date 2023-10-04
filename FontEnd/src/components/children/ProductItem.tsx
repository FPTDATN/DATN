import { addToCart } from "@/slices/cart";
import { useAppDispatch } from "@/store/hook";
import { ProductType } from "@/types/Product";
import { AiOutlineStar, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'


type Props = {
    product: ProductType;
}

const ProductItem = ({ product }: Props) => {

    const dispath = useAppDispatch();

    return (
        <div className="rounded-md ">
            <div className="relative ">
                <a href="#" className="">
                    <img src="https://i.postimg.cc/gkxqMsfV/pexels-karolina-grabowska-4464821.jpg" alt="" className="object-cover w-full mx-auto h-96 lg:h-72 " />
                </a>
                <span className="absolute top-0 right-0 px-4 py-2 m-2 lg:px-2 lg:py-1 text-sm font-semibold text-gray-100 bg-red-600 rounded-md">
                    -{product.sale_off}% OFF</span>
                <div className="absolute z-10 flex items-center justify-center p-2 text-center text-gray-700 rounded-full shadow-xl cursor-pointer right-3 bottom-3 bg-gray-50 hover:text-gray-50 hover:bg-blue-600 w-11 h-11 ">
                    <a href="#" className="text-xl">
                        <i><AiOutlineHeart /></i>
                    </a>
                </div>
            </div>
            <div className="p-4 border-b border-gray-200 bg-white  dark:border-gray-900 rounded-b-md dark:bg-gray-900">
                <h3 className="mb-3 text-xl font-medium text-left dark:text-gray-400">
                    <a href="#" className="line-clamp-2"> {product.name}</a>
                </h3>
                <div className="relative flex items-center justify-between mb-3 text-left">
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                        <span className="text-blue-500 dark:text-gray-300">${product.price}</span>
                        <span className="ml-2 line-through dark:text-gray-400">${product.price}</span>
                    </p>
                    <div className="absolute right-0 z-10 flex items-center justify-center text-center text-blue-700 border border-blue-500 rounded-md shadow-xl dark:hover:bg-gray-700 dark:text-gray-400 dark:border-gray-700 hover:bg-blue-600 hover:text-gray-100 w-7 h-7 ">
                        <div onClick={() => dispath(addToCart({...product, quantity: 1}))}  className="text-xl cursor-pointer">
                            <i><AiOutlineShoppingCart /></i>
                        </div>
                    </div>
                </div>
                <ul className="flex justify-items-start space-x-1">
                    <li>
                        <i className="text-base">
                            <AiOutlineStar />
                        </i>
                    </li>
                    <li>
                        <i className="text-base">
                            <AiOutlineStar />
                        </i>
                    </li>
                    <li>
                        <i className="text-base">
                            <AiOutlineStar />
                        </i>
                    </li>
                    <li>
                        <i className="text-base">
                            <AiOutlineStar />
                        </i>
                    </li>
                    <li>
                        <i className="text-base">
                            <AiOutlineStar />
                        </i>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProductItem