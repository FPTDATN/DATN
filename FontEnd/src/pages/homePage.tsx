import { Outlet } from "react-router-dom"
import { HotProduct } from "./hot-product"
import RelatedProducts from "@/components/RelatedProducts"

export const HomePage = () => {
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
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-4 w-4 rtl:rotate-180"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
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
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="h-4 w-4"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
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
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
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
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
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
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                    />
                                                </svg>
                                            </span>
                                        </summary>

                                        <div className="border-t border-gray-200 bg-white">


                                            <ul className="space-y-1 border-t border-gray-200 p-4">
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                        role="menuitem"
                                                    >
                                                        Áo nam
                                                    </a>
                                                </li>

                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                        role="menuitem"
                                                    >
                                                        Áo nữ
                                                    </a>
                                                </li>

                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                        role="menuitem"
                                                    >
                                                        Áo con nít
                                                    </a>
                                                </li>



                                            </ul>
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <li>
                                    <a href="#" className="group block overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                            alt=""
                                            className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[340px]"
                                        />

                                        <div className="relative bg-white pt-3">
                                            <h3
                                                className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
                                            >
                                                Basic Tee
                                            </h3>

                                            <p className="mt-2">
                                                <span className="sr-only"> Regular Price </span>

                                                <span className="tracking-wider text-gray-900"> £24.00 GBP </span>
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="group block overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                            alt=""
                                            className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[340px]"
                                        />

                                        <div className="relative bg-white pt-3">
                                            <h3
                                                className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
                                            >
                                                Basic Tee
                                            </h3>

                                            <p className="mt-2">
                                                <span className="sr-only"> Regular Price </span>

                                                <span className="tracking-wider text-gray-900"> £24.00 GBP </span>
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="group block overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                            alt=""
                                            className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[340px]"
                                        />

                                        <div className="relative bg-white pt-3">
                                            <h3
                                                className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
                                            >
                                                Basic Tee
                                            </h3>

                                            <p className="mt-2">
                                                <span className="sr-only"> Regular Price </span>

                                                <span className="tracking-wider text-gray-900"> £24.00 GBP </span>
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="group block overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                            alt=""
                                            className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[340px]"
                                        />

                                        <div className="relative bg-white pt-3">
                                            <h3
                                                className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
                                            >
                                                Basic Tee
                                            </h3>

                                            <p className="mt-2">
                                                <span className="sr-only"> Regular Price </span>

                                                <span className="tracking-wider text-gray-900"> £24.00 GBP </span>
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="group block overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                            alt=""
                                            className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[340px]"
                                        />

                                        <div className="relative bg-white pt-3">
                                            <h3
                                                className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
                                            >
                                                Basic Tee
                                            </h3>

                                            <p className="mt-2">
                                                <span className="sr-only"> Regular Price </span>

                                                <span className="tracking-wider text-gray-900"> £24.00 GBP </span>
                                            </p>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="group block overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                            alt=""
                                            className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[340px]"
                                        />

                                        <div className="relative bg-white pt-3">
                                            <h3
                                                className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
                                            >
                                                Basic Tee
                                            </h3>

                                            <p className="mt-2">
                                                <span className="sr-only"> Regular Price </span>

                                                <span className="tracking-wider text-gray-900"> £24.00 GBP </span>
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            </ul>




                        </div>
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
                                        fill-rule="evenodd"
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
                                        fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </a>
                        </li>
                    </ol>
                </div>

                <hr />
                <HotProduct />
                <RelatedProducts/>
            </section>
        </>
    )
}