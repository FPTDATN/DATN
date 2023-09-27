export const Users = ()=>{
      return(
            <div className=" antialiased h-screen  table table-fixed">
         <div className="flex justify-between p-6">
            <h1 className=" text-2xl">list User </h1>
            
            <div
            className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500"
          >
            <input
              type="text"
              className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
              placeholder="Search"
            />
            <button
              className="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block"
            >
              <svg
                className="w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
         </div>

         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                     <th scope="col" className="px-6 py-3">
                        Product name
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Color
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Category
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Price
                     </th>
                     <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">
                        Apple MacBook Pro 17"
                     </th>
                     <td className="px-6 py-4">
                        Silver
                     </td>
                     <td className="px-6 py-4">
                        Laptop
                     </td>
                     <td className="px-6 py-4">
                        $2999
                     </td>
                     <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                     </td>
                     <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-red-500 hover:underline">Delete</a>
                     </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">
                        Apple MacBook Pro 17"
                     </th>
                     <td className="px-6 py-4">
                        Silver
                     </td>
                     <td className="px-6 py-4">
                        Laptop
                     </td>
                     <td className="px-6 py-4">
                        $2999
                     </td>
                     <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                     </td>
                     <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-red-500 hover:underline">Delete</a>
                     </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">
                        Apple MacBook Pro 17"
                     </th>
                     <td className="px-6 py-4">
                        Silver
                     </td>
                     <td className="px-6 py-4">
                        Laptop
                     </td>
                     <td className="px-6 py-4">
                        $2999
                     </td>
                     <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                     </td>
                     <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-red-500 hover:underline">Delete</a>
                     </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">
                        Microsoft Surface Pro
                     </th>
                     <td className="px-6 py-4">
                        White
                     </td>
                     <td className="px-6 py-4">
                        Laptop PC
                     </td>
                     <td className="px-6 py-4">
                        $1999
                     </td>
                     <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                     </td>
                     <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-red-500  hover:underline">Delete</a>
                     </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">
                        Magic Mouse 2
                     </th>
                     <td className="px-6 py-4">
                        Black
                     </td>
                     <td className="px-6 py-4">
                        Accessories
                     </td>
                     <td className="px-6 py-4">
                        $99
                     </td>
                     <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                     </td>
                     <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-red-500  hover:underline">Delete</a>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>

      </div>
      )
}