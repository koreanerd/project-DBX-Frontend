import { useState } from "react";
import ImageGrid from "./ImageGrid";

function ResourceList() {
  const [selectedCategory, setSelectedCategory] = useState("Brand Logo"); // Default category

  const images = {
    "Brand Logo": Array(16).fill("../../../asset/Asset_logo.svg"),
    "Key Image": Array(16).fill("../../../asset/Asset_key.svg"),
    Icon: Array(16).fill("../../../asset/Asset_icon.svg"),
  };

  function handleCategoryClick(cartegory) {
    setSelectedCategory(cartegory);
  }

  return (
    <div className="flex w-screen h-screen">
      {/* Category Bar: Shows the list of categories */}
      <div className="grid grid-rows-5 grid-flow-col pl-6 pr-16 w-1/5 h-full">
        <div className="row-start-2 row-span-2 border-t-2 border-stone-400">
          <ul className="mt-6">
            {Object.keys(images).map(category => (
              <li key={category} className="hover:bg-stone-200">
                <button
                  type="button"
                  className={`ml-7 mb-1 text-xl text-stone-500 cursor-default ${
                    selectedCategory === category
                      ? "font-bold text-stone-800"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Resource List: Displays the resources based on the selected category */}
      <ImageGrid category={images} resourceData={selectedCategory} />

      {/* Panel: Shows user information or specific function component */}
      <div className="w-1/5 h-full drop-shadow-2xl bg-stone-300">
        <div className="flex items-center bg-stone-100 h-16 text-stone-500">
          <div className="flex items-center ml-6">
            <div className="w-8 h-8 rounded-md bg-green-400"> </div>
            <p className="ml-4">dbx5173@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceList;
