import { useGetProductsQuery } from "@/api/product"
import { HotProduct } from "./hot-product"
import ProductItem from "@/components/children/ProductItem";
import Skeleton from 'react-loading-skeleton'
import { useGetCategoriesQuery } from "@/api/category";
import { useEffect, useState } from "react";

export const HomePage = () => {

    const { data, isLoading } = useGetProductsQuery();
    const { data: categories } = useGetCategoriesQuery();

    const [products, setProducts] = useState(data?.docs);

    const filterByCategory = (_id: string) => {
        const filter = data?.docs.filter((product) => product.categoryId === _id)
        setProducts(filter);
    };

    useEffect(() => {
        setProducts(data?.docs)
    }, [isLoading])


    return (
        <>

            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <header>
                        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl p-4">
                            Product Home
                        </h2>


                    </header>

                    <div className="mt-8 block lg:hidden">
                        <button
                            className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
                        >
                            <span className="text-sm font-medium"> Filters & Sorting </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4 rtl:rotate-180"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8 col-span-1">
                        <div className="hidden space-y-4 lg:block">
                            <div className="relative ">
                                <label className="sr-only"> Search </label>

                                <input
                                    type="text"
                                    id="Search"
                                    placeholder="Search for..."
                                    className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm p-2"
                                />

                                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                                    <button type="button" className="text-gray-600 hover:text-gray-700">
                                        <span className="sr-only">Search</span>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="h-4 w-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 p-2">
                                    Sort By
                                </label>

                                <select id="SortBy" className="w-40% rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm p-2 ">
                                    <option>Sort By</option>
                                    <option value="Title, DESC">Title, DESC</option>
                                    <option value="Title, ASC">Title, ASC</option>
                                    <option value="Price, DESC">Price, DESC</option>
                                    <option value="Price, ASC">Price, ASC</option>
                                </select>
                            </div>

                            <div>
                                <p className="block text-xs font-medium text-gray-700">Filters</p>

                                <div className="mt-1 space-y-2">


                                    <details
                                        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                    >
                                        <summary
                                            className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                                        >
                                            <span className="text-sm font-medium"> Price </span>

                                            <span className="transition group-open:-rotate-180">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                    />
                                                </svg>
                                            </span>
                                        </summary>

                                        <div className="border-t border-gray-200 bg-white">
                                            <header className="flex items-center justify-between p-4">
                                                <span className="text-sm text-gray-700">
                                                    The highest price is $600
                                                </span>

                                                <button
                                                    type="button"
                                                    className="text-sm text-gray-900 underline underline-offset-4"
                                                >
                                                    Reset
                                                </button>
                                            </header>

                                            <div className="border-t border-gray-200 p-4">
                                                <div className="flex justify-between gap-4">
                                                    <label

                                                        className="flex items-center gap-2"
                                                    >
                                                        <span className="text-sm text-gray-600">$</span>

                                                        <input
                                                            type="number"
                                                            id="FilterPriceFrom"
                                                            placeholder="From"
                                                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                                        />
                                                    </label>

                                                    <label className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-600">$</span>

                                                        <input
                                                            type="number"
                                                            id="FilterPriceTo"
                                                            placeholder="To"
                                                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </details>

                                    <details
                                        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                    >
                                        <summary
                                            className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                                        >
                                            <span className="text-sm font-medium"> Colors </span>

                                            <span className="transition group-open:-rotate-180">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                    />
                                                </svg>
                                            </span>
                                        </summary>

                                        <div className="border-t border-gray-200 bg-white">


                                            <ul className="space-y-1 border-t border-gray-200 p-4">
                                                <li>
                                                    <label

                                                        className="inline-flex items-center gap-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id="FilterRed"
                                                            className="h-5 w-5 rounded border-gray-300"
                                                        />

                                                        <span className="text-sm font-medium text-gray-700">
                                                            Red
                                                        </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label

                                                        className="inline-flex items-center gap-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id="FilterBlue"
                                                            className="h-5 w-5 rounded border-gray-300"
                                                        />

                                                        <span className="text-sm font-medium text-gray-700">
                                                            Blue
                                                        </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label

                                                        className="inline-flex items-center gap-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id="FilterGreen"
                                                            className="h-5 w-5 rounded border-gray-300"
                                                        />

                                                        <span className="text-sm font-medium text-gray-700">
                                                            Green
                                                        </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label

                                                        className="inline-flex items-center gap-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id="FilterOrange"
                                                            className="h-5 w-5 rounded border-gray-300"
                                                        />

                                                        <span className="text-sm font-medium text-gray-700">
                                                            Orange
                                                        </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label

                                                        className="inline-flex items-center gap-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id="FilterPurple"
                                                            className="h-5 w-5 rounded border-gray-300"
                                                        />

                                                        <span className="text-sm font-medium text-gray-700">
                                                            Purple
                                                        </span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label

                                                        className="inline-flex items-center gap-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id="FilterTeal"
                                                            className="h-5 w-5 rounded border-gray-300"
                                                        />

                                                        <span className="text-sm font-medium text-gray-700">
                                                            Teal
                                                        </span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </details>
                                    <details
                                        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                    >
                                        <summary
                                            className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                                        >
                                            <span className="text-sm font-medium"> Category </span>

                                            <span className="transition group-open:-rotate-180">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                    />
                                                </svg>
                                            </span>
                                        </summary>

                                        <div className="border-t border-gray-200 bg-white">


                                            <ul className="space-y-1 border-t border-gray-200 p-4">
                                                <li onClick={() => setProducts(data?.docs)}>
                                                    <a
                                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                        role="menuitem"
                                                    >
                                                        Tất cả
                                                    </a>
                                                </li>
                                                {categories?.docs.map((category) => (
                                                    <li key={category._id} onClick={() => filterByCategory(category._id)}>
                                                        <a
                                                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                            role="menuitem"
                                                        >
                                                            {category.name}
                                                        </a>
                                                    </li>

                                                ))}

                                            </ul>
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </div>

                        {isLoading ? <div className="col-span-3">
                            <div className="grid grid-cols-4 gap-x-2">
                                {[...new Array(4)].map((_item, index: number) => (
                                    <Skeleton key={index} className="w-full  min-h-[360px] h-full" />
                                ))}
                            </div>
                        </div> :

                            <section className="col-span-3 flex items-center bg-gray-100 font-poppins dark:bg-gray-800 ">
                                <div className="justify-center flex-1 max-w-6xl px-2 py-2 mx-auto lg:py-2 md:px-2">
                                    {products?.length === 0 ? <h1 className="text-xl">Chưa có sản phẩm nào 😥</h1> :
                                        <div className="grid gap-2 mb-11 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                                            {products?.map((product) => {
                                                return <ProductItem key={product._id} product={product} />
                                            })}
                                        </div>
                                    }
                                </div>
                            </section>
                        }

                    </div>
                    <ol className="mt-8 flex justify-center gap-1 text-xs font-medium">
                        <li>
                            <a
                                href="#"
                                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
                            >
                                <span className="sr-only">Prev Page</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="block h-8 w-8 rounded border border-gray-100 text-center leading-8"
                            >
                                1
                            </a>
                        </li>

                        <li
                            className="block h-8 w-8 rounded border-black bg-black text-center leading-8 text-white"
                        >
                            2
                        </li>

                        <li>
                            <a
                                href="#"
                                className="block h-8 w-8 rounded border border-gray-100 text-center leading-8"
                            >
                                3
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="block h-8 w-8 rounded border border-gray-100 text-center leading-8"
                            >
                                4
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
                            >
                                <span className="sr-only">Next Page</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </li>
                    </ol>
                </div>

                <hr />
                <HotProduct />
            </section>
        </>
    )
}