import { useState } from "react";
import CategoryBar from "./CategoryBar";
import ImageGrid from "./ImageGrid";
import ControlPanel from "./ControlPanel";

function ResourceList() {
  const [selectedCategory, setSelectedCategory] = useState("Brand Logo"); // Default category

  const resourcesData = {
    "Brand Logo": Array(16).fill("../../../asset/Asset_logo.svg"),
    "Key Image": Array(16).fill("../../../asset/Asset_key.svg"),
    Icon: Array(16).fill("../../../asset/Asset_icon.svg"),
  };

  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  return (
    <div className="flex w-screen h-screen">
      <CategoryBar
        categories={Object.keys(resourcesData)}
        activeCategory={selectedCategory}
        onChangeCategory={handleCategoryClick}
      />
      <ImageGrid category={resourcesData} resourceData={selectedCategory} />
      <ControlPanel />
    </div>
  );
}

export default ResourceList;
