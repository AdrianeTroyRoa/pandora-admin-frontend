import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import testService from "./services/testService";
import {
  addProductRequest,
  getAllProducts,
  getProduct,
  updateProduct,
} from "./services/productService";

const menuElements = ["Products", "Inquiries"];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productAmount, setProductAmount] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [currentProductToEdit, setCurrentProductToEdit] = useState(null);
  const [productSample, setProductSample] = useState([
    {
      id: 1,
      title: "Basin",
      image: null,
      numLeft: 12,
      description:
        "low-lying area of land, typically surrounded by higher land, where water naturally collects. It can refer to a drainage basin (an area where all precipitation drains to a common outlet like a river) or a geological basin (a depression formed by tectonic activity where sediments accumulate).",
    },
    {
      id: 2,
      title: "Palanggana",
      image: null,
      numLeft: 13,
      description: "Basin japun pero bisaya. Hehehe.",
    },
  ]);
  const [copyOfProductSample, setCopyOfProductSample] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProductSample([...productSample, ...fetchedProducts]);
      } catch (err) {
        console.error("ERROR:", err);
      }
    };

    fetchProducts();
  }, []);

  //toggle add-product modal
  const openAddModal = () => setIsModalAddOpen(true);
  const closeAddModal = () => setIsModalAddOpen(false);

  //toggle edit-product modal
  const openEditModal = (product) => {
    setIsModalEditOpen(true);
    setCurrentProductToEdit(product);
    setProductName(product.title);
    setProductAmount(product.numLeft);
    setProductDescription(product.description);
  };
  const closeEditModal = () => {
    setIsModalEditOpen(false);
    setCurrentProductToEdit(null);
    setProductName("");
    setProductDescription("");
    setProductAmount(0);
  };

  //toggle delete-product modal
  const openDeleteModal = (product) => {
    setIsModalDeleteOpen(true);
    setCurrentProductToEdit(product);
  };
  const closeDeleteModal = () => {
    setIsModalDeleteOpen(false);
    setCurrentProductToEdit(null);
  };

  //function for adding new product
  const addProduct = () => {
    const newProduct = {
      title: productName,
      image: productImage,
      numLeft: productAmount,
      description: productDescription,
    };
    console.log(newProduct);
    setProductSample([...productSample, newProduct]);
    addProductRequest(newProduct); //Backend operation call
    setProductName("");
    setProductDescription("");
    setProductAmount(0);
    setProductImage(null);
    closeAddModal();
  };

  //function for editing product entry
  const editProduct = (productId) => {
    const newProducts = [...productSample];
    newProducts.map(async (product) => {
      if (product.id === productId) {
        product.title = productName;
        product.description = productDescription;
        product.numLeft = productAmount;
        /*
         *
         * Backend Operation Calls
         *
         * */
        try {
          const productToEdit = await getProduct(product.id);

          let proceedToEdit = false;
          console.warn("Product GOT:", Object.keys(productToEdit));
          console.warn("REACHED FOR LOOP...");
          for (let i of Object.keys(productToEdit)) {
            if (product[i] !== productToEdit[i]) proceedToEdit = true;
          }

          if (proceedToEdit) {
            updateProduct(product);
          }
        } catch (error) {
          console.error("ERROR:", error);
        }
      }
    });
    setProductName("");
    setProductDescription("");
    setProductAmount(0);
    setProductSample(newProducts);
    closeEditModal();
  };

  //function for deleting product entry
  const deleteProduct = (productId) => {
    const prunedProducts = productSample.filter(
      (product) => product.id != productId,
    );
    /*
     *
     * Backend Operation Calls
     *
     * */
    setProductSample(prunedProducts);
    closeDeleteModal();
  };

  //function to search
  const searchProducts = () => {
    let products = [];
    if (searchQuery == "") {
      products = copyOfProductSample;
      setCopyOfProductSample("");
    } else if (productSample.length > copyOfProductSample.length) {
      products = productSample;
      setCopyOfProductSample(productSample);
    } else {
      products = copyOfProductSample;
    }

    const displayProducts = products.filter(
      (product) =>
        product.title.includes(searchQuery) ||
        product.description.includes(searchQuery),
    );

    setProductSample(displayProducts);
  };

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
                  onClick={testService}
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <button
                className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={searchProducts}
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

          {/* Add Product button */}
          <button
            onClick={openAddModal}
            className="bg-blue-700 p-2 rounded text-white text-xs hover:bg-blue-800 min-w-[120px]"
          >
            + Add Product
          </button>

          {/* Add Product modal */}
          {isModalAddOpen && (
            <div
              className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-transparent backdrop-blur-xs transition-opacity duration-300"
              onClick={closeAddModal}
            >
              <div
                className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm bg-white border-1 border-slate-700"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
              >
                <div className="relative flex flex-col">
                  <div className="m-2.5 flex justify-center items-center text-white h-24 rounded-md bg-slate-800">
                    <h3 className="text-2xl">Product Details</h3>
                  </div>

                  <div className="flex flex-col gap-4 p-6">
                    <div className="w-full max-w-sm min-w-[200px]">
                      <label className="block mb-2 text-sm text-slate-600">
                        Upload product image
                      </label>
                      <input
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProductImage(e.target.files[0])}
                      />
                    </div>
                    <hr />
                    <div className="w-full max-w-sm min-w-[200px]">
                      <input
                        type="text"
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Product Name"
                        onChange={(e) => {
                          setProductName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-full max-w-sm min-w-[200px]">
                      <input
                        type="number"
                        min="0"
                        value={productAmount}
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Stocks Left (0 for no stocks)"
                        onChange={(e) => {
                          setProductAmount(e.target.value);
                        }}
                      />
                    </div>

                    <div className="w-full max-w-sm min-w-[200px]">
                      <textarea
                        type="text"
                        className="w-full min-h-32 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Product Description..."
                        onChange={(e) => {
                          setProductDescription(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      onClick={addProduct}
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {isModalDeleteOpen && (
          <div
            className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-transparent backdrop-blur-xs transition-opacity duration-300"
            onClick={closeDeleteModal}
          >
            <div
              className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
            >
              <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">
                Confirm delete?
              </div>
              <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 text-bold">
                This is an irreversable command
              </div>
              <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                <button
                  className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button
                  className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                  type="button"
                  onClick={() => deleteProduct(currentProductToEdit.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/*cards for products*/}
        <div className="flex flex-col justify-center items-center gap-3">
          {productSample.map((product) => (
            <div key={product.id}>
              <div className="border-1 border-gray-200 grid grid-cols-3 gap-7 items-center p-4 lg:w-256 sm:w-128 rounded">
                <div className="flex items-center">
                  <div className="border-1 p-6">Img</div>
                </div>
                <label className="flex flex-col text-justify">
                  <span className="text-lg font-bold">{product.title}</span>
                  <span className="text-sm text-gray-500">
                    {product.description}
                  </span>
                  <span className="text-sm text-gray-500 py-2">
                    <span className="font-bold">STOCKS LEFT: </span>
                    {product.numLeft}
                  </span>
                </label>
                <div className="grid gap-3 justify-end">
                  <button
                    className="hover:text-white text-red-700 bg-white border-1 border-red-700
                     hover:bg-red-700 p-1 rounded"
                    onClick={() => openDeleteModal(product)}
                  >
                    Delete
                  </button>
                  <button
                    className="hover:text-white border-1 border-blue-700 hover:bg-blue-700
                     text-blue-700 p-1 rounded"
                    onClick={() => openEditModal(product)}
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/*Edit Product Modal*/}
              {isModalEditOpen && (
                <div
                  className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-transparent backdrop-blur-xs transition-opacity duration-300"
                  onClick={closeEditModal}
                >
                  <div
                    className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm bg-white border-1 border-slate-700"
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
                  >
                    <div className="relative flex flex-col">
                      <div className="m-2.5 flex justify-center items-center text-white h-24 rounded-md bg-slate-800">
                        <h3 className="text-2xl">Product Details</h3>
                      </div>

                      <div className="flex flex-col gap-4 p-6">
                        <div className="w-full max-w-sm min-w-[200px]">
                          <input
                            type="text"
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            value={productName}
                            onChange={(e) => {
                              setProductName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="w-full max-w-sm min-w-[200px]">
                          <input
                            type="number"
                            min="0"
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Stocks Left (0 for no stocks)"
                            value={productAmount}
                            onChange={(e) => {
                              setProductAmount(e.target.value);
                            }}
                          />
                        </div>

                        <div className="w-full max-w-sm min-w-[200px]">
                          <textarea
                            type="text"
                            className="w-full min-h-32 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            value={productDescription}
                            onChange={(e) => {
                              setProductDescription(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="p-6 pt-0">
                        <button
                          className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => editProduct(currentProductToEdit.id)}
                        >
                          Edit Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
