import { useParams } from "react-router-dom";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { clearResourceInfo } from "@/features/resource/slice";
import CategoryBar from "./CategoryBar";
import ImageGrid from "./ImageGrid";
import ControlPanel from "./control-panel/ControlPanel";
import useFetchResourceList from "@/hooks/useFetchResourceList";
import { useEffect } from "react";

function ResourceList() {
  const { currentCategoryPath } = useParams();
  const dispatch = useDispatch();
  const categoryIds = useSelector((state: RootState) => state.user.categoryIds);
  const categoryId = categoryIds.find(
    (category) => category.name === currentCategoryPath,
  )?.id;

  useEffect(() => {
    dispatch(clearResourceInfo());
  }, [currentCategoryPath]);

  const { urlList, requestData, isLoading, fetchData } = useFetchResourceList(
    categoryId ?? "",
  );

  return (
    <div className="flex w-screen h-screen">
      <CategoryBar />

      {isLoading ? (
        <div className="relative w-3/5 p-10 overflow-auto h-screen">
          Loading...
        </div>
      ) : (
        <ImageGrid list={urlList} data={requestData} refreshData={fetchData} />
      )}

      <ControlPanel />
    </div>
  );
}

export default ResourceList;
