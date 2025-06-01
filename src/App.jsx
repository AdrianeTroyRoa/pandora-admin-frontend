import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const menuElements = ["Products", "Inquiries"];

const productSample = [
  {
    title: "Basin",
    description:
      "low-lying area of land, typically surrounded by higher land, where water naturally collects. It can refer to a drainage basin (an area where all precipitation drains to a common outlet like a river) or a geological basin (a depression formed by tectonic activity where sediments accumulate).",
  },
  { title: "Palanggana", description: "Basin japun pero bisaya. Hehehe." },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/*Navbar*/}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-zinc-100 shadow-md">
        <div className="container flex flex-wrap items-center justify-between mx-auto py-3">
          <a
            href="#"
            className="mr-4 block cursor-pointer py-1.5 text-base text-indigo-500 font-semibold"
          >
            King8 Admin
          </a>
          <div className="hidden lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {menuElements.map((e) => (
                <li className="flex items-center p-1 text-sm gap-x-2 text-indigo-500">
                  <a href="#" className="flex items-center">
                    {e}
                  </a>
                </li>
              ))}
              <li>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  type="button"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </nav>

      {/*Product title card*/}
      <div className="w-full h-72 relative mt-24">
        <div className="w-full h-24 font-extrabold top-20 flex justify-center items-center text-black text-5xl absolute z-10">
          PRODUCTS
        </div>
      </div>

      <div className="flex flex-col items-center gap-7">
        <div className="flex flex-row items-center justify-center gap-7">
          {/*Search index*/}
          <div className="w-full max-w-sm min-w-[200px]">
            <div className="relative">
              <input
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Search products..."
              />
              <button
                className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Search
              </button>
            </div>
          </div>

          {/*Add Product button*/}
          <button className="bg-blue-700 p-2 rounded text-white text-xs hover:bg-blue-800 min-w-[120px]">
            + Add Product
          </button>
        </div>

        {/*cards for products*/}
        <div className="flex flex-col justify-center items-center gap-3">
          {productSample.map((product) => (
            <div className="border-1 border-gray-200 grid grid-cols-3 gap-7 items-center p-4 lg:w-256 sm:w-128 rounded">
              <div className="flex items-center">
                <div className="border-1 p-6">Img</div>
              </div>
              <label className="flex flex-col text-justify">
                <span className="text-lg font-bold">{product.title}</span>
                <span className="text-sm text-gray-500">
                  {product.description}
                </span>
              </label>
              <div className="grid gap-3 justify-end">
                <button
                  className="hover:text-white text-red-700 bg-white border-1 border-red-700
                     hover:bg-red-700 p-1 rounded"
                >
                  Delete
                </button>
                <button
                  className="hover:text-white border-1 border-blue-700 hover:bg-blue-700
                     text-blue-700 p-1 rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
