import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const menuElements = ["Products", "Inquiries"];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/*Navbar*/}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-zinc-100 shadow-md">
        <div className="container flex flex-wrap items-center justify-between mx-auto text-gray-100 py-3">
          <a
            href="#"
            className="mr-4 block cursor-pointer py-1.5 text-base text-gray-200 font-semibold"
          >
            King8 Admin
          </a>
          <div className="hidden lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {menuElements.map((e) => (
                <li className="flex items-center p-1 text-sm gap-x-2 text-gray-200">
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
                  logout
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
      {/*cards for products*/}
      <div className="border-1 border-gray-200 grid grid-cols-3 gap-7 items-center py-4 w-256">
        <div className="flex items-center">
          <div className="border-1 p-6">Img</div>
        </div>
        <label className="flex flex-col text-justify">
          <span className="text-lg font-bold">Hi</span>
          <span className="text-sm text-gray-500">Description</span>
        </label>
        <div>
          <button
            className="text-red-500 hover:text-red-700
                     mr-2 delete-btn"
          >
            Delete
          </button>
          <button
            className="text-blue-500
                     hover:text-blue-700 edit-btn"
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
