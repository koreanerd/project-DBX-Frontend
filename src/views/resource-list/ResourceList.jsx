import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryBar from "./CategoryBar";
import ImageGrid from "./ImageGrid";
import ControlPanel from "./control-panel/ControlPanel";
import useFetchResourceList from "@/hooks/useFetchResourceList";

function ResourceList() {
  const { currentCategoryPath } = useParams();
  const categoryIds = useSelector((state) => state.user.categoryIds);
  const categoryId = categoryIds.find(
    (category) => category.name === currentCategoryPath,
  )?.id;

  const { fetchData, urlList, requestData, isLoading } =
    useFetchResourceList(categoryId);

  return (
    <div className="flex w-screen h-screen">
      <CategoryBar />

      {isLoading ? (
        <div className="relative w-3/5 p-10 overflow-auto h-screen">
          Loading...
        </div>
      ) : (
        <ImageGrid list={urlList} data={requestData} fetchData={fetchData} />
      )}

      <ControlPanel />
    </div>
  );
}

export default ResourceList;
