import { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryBar from "./CategoryBar";
import ImageGrid from "./ImageGrid";
import ControlPanel from "./ControlPanel";
import UserContext from "../../../contexts/UserContext";
import { InitialResponseContext } from "../../../contexts/InitialResponseContext";

function ResourceList() {
  const user = useContext(UserContext);
  const { initialResponse } = useContext(InitialResponseContext);
  const { userEmail } = user;
  const { category } = useParams();
  const [resourcesUrl, setResourcesUrl] = useState([]);
  const [resourcesData, setResourcesData] = useState([]);
  const [selectedImageData, setSelectedImageData] = useState(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const categoryId = initialResponse.find(
        item => item.name === category
      )._id;
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/categories/${categoryId}`
      );
      setResourcesUrl(response.data.categoryList.map(item => item.svgUrl));
      setResourcesData(response.data.categoryList);
    } catch (error) {
      toast.error(
        "There was an issue loading your data. Please try again later."
      );
    }
  }, [category, initialResponse]);

  useEffect(() => {
    if (initialResponse) {
      fetchData();
    }
  }, [fetchData, initialResponse]);

  const handleCategoryChange = newCategory => {
    navigate(`/resource-list/${newCategory}`);
  };

  const handleImageSelect = async imageId => {
    try {
      const categoryId = initialResponse.find(
        item => item.name === category
      )._id;
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/categories/${categoryId}/resources/${imageId}`
      );
      setSelectedImageData(response.data);
    } catch (error) {
      toast.error(
        "There was an issue loading your data. Please try again later."
      );
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <CategoryBar
        categories={
          initialResponse ? initialResponse.map(item => item.name) : []
        }
        activeCategory={category}
        onChangeCategory={handleCategoryChange}
      />
      <ImageGrid
        svgUrl={resourcesUrl}
        data={resourcesData}
        onImageSelect={handleImageSelect}
      />
      <ControlPanel email={userEmail} resourceData={selectedImageData} />
    </div>
  );
}

export default ResourceList;
