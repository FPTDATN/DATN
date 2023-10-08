import { ProductType } from "@/types/Product";
import { FunctionComponent } from "react";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

interface ListProductItemsProps {
    heading?: string;
    hostProducts?: ProductType[]
}

const ListProductItems: FunctionComponent<ListProductItemsProps> = ({ heading }) => {

    return <section className="flex items-center font-poppins dark:bg-gray-800 ">
        <div className="justify-center flex-1 max-w-6xl px-0 py-4 mx-auto lg:py-8 md:px-4">
            <h2 className="pb-2 text-xl font-bold text-left text-gray-800 md:text-3xl dark:text-gray-400">
                {heading}
            </h2>
            <div className="w-20 mb-6 border-b border-red-700 dark:border-gray-400"></div>
            <div className="grid gap-4 mb-11 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
            </div>

            <div className="flex justify-center">
                <Link to={'/filter'} className="px-4 py-1 border border-primary/90 hover:bg-primary/90 text-primary/90 hover:text-white rounded">Xem thêm</Link>
            </div>
        </div>
    </section>
}

export default ListProductItems;