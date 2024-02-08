import { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryBar from "./CategoryBar";
import ImageGrid from "./ImageGrid";
import ControlPanel from "./control-panel/ControlPanel";
import UserContext from "@/contexts/UserContext";

//eslint-disable-next-line react/prop-types
function ResourceList({ setCategoriesId }) {
  const user = useContext(UserContext);
  const { userEmail, isAdmin, categoriesId } = user;
  const { category } = useParams();
  const [resourcesUrl, setResourcesUrl] = useState([]);
  const [resourcesData, setResourcesData] = useState([]);
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [selectedResourceId, setSelectedResourceId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const navigate = useNavigate();

  async function getCategoriesId() {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/categories`,
    );
    setCategoriesId(response.data.categories);
  }

  useEffect(() => {
    getCategoriesId();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const categoryId = categoriesId.find(
        (item) => item.name === category,
      )?._id;
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/categories/${categoryId}`,
      );
      setResourcesUrl(response.data.categoryList.map((item) => item.svgUrl));
      setResourcesData(response.data.categoryList);
    } catch (error) {
      console.error(
        "There was an issue loading your data. Please try again later.",
      );
    }
  }, [category, categoriesId]);

  useEffect(() => {
    if (categoriesId) {
      fetchData();
    }
  }, [fetchData]);

  const handleCategoryChange = (newCategory) => {
    navigate(`/resource-list/${newCategory}`);
  };

  const handleImageSelect = async (imageId) => {
    setSelectedResourceId(imageId);

    if (imageId === null) {
      setSelectedImageData(null);

      return;
    }

    try {
      const categoryId = categoriesId.find(
        (item) => item.name === category,
      )?._id;
      setSelectedCategoryId(categoryId);
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/categories/${categoryId}/resources/${imageId}`,
      );
      setSelectedImageData(response.data);
    } catch (error) {
      toast.error(
        "There was an issue loading your data. Please try again later.",
      );
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <CategoryBar
        categories={categoriesId ? categoriesId.map((item) => item.name) : []}
        activeCategory={category}
        onChangeCategory={handleCategoryChange}
      />
      <ImageGrid
        svgUrl={resourcesUrl}
        data={resourcesData}
        onImageSelect={handleImageSelect}
        isAdmin={isAdmin}
        categoryName={category}
        fetchData={fetchData}
      />
      <ControlPanel
        email={userEmail}
        resourceData={selectedImageData}
        categoryId={selectedCategoryId}
        resourceId={selectedResourceId}
      />
    </div>
  );
}

export default ResourceList;
