import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryBar from "./CategoryBar";
import ImageGrid from "./ImageGrid";
import ControlPanel from "./ControlPanel";

function ResourceList() {
  const [selectedCategory, setSelectedCategory] = useState("Brand Logo");
  const [resourcesData, setResourcesData] = useState({});

  async function fetchData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/categories/${
          import.meta.env.VITE_CATEGORY_ID
        }`
      );
      const categoryData = response.data.categoryList.reduce((acc, item) => {
        acc["Brand Logo"] = acc["Brand Logo"] || [];
        acc["Brand Logo"].push(item.svgUrl);

        return acc;
      }, {});

      setResourcesData(categoryData);
    } catch (error) {
      toast.error(`Error fetching data: ${error}`);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
      <ImageGrid category={resourcesData[selectedCategory] || []} />
      <ControlPanel />
    </div>
  );
}

export default ResourceList;
