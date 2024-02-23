import { useDispatch, useSelector } from "react-redux";
import { setResourceInfo, clearResourceInfo } from "@/features/resource/slice";
import { getResourceInfo } from "@/apis/categories";
import { toast } from "react-hot-toast";
import { RootState } from "@/store";

const useSelectResource = (categoryId) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);

  const imageSelector = async (resourceId) => {
    if (!resourceId) {
      dispatch(clearResourceInfo());

      return;
    }

    const requestResult = await getResourceInfo(token, categoryId, resourceId);

    if (requestResult.error) {
      toast.error(requestResult.error);

      return;
    }

    dispatch(
      setResourceInfo({ selectedResourceCategoryId: requestResult.categoryId }),
    );
    dispatch(setResourceInfo({ selectedResourceId: requestResult.resourceId }));
    dispatch(setResourceInfo({ selectedResourceData: requestResult }));
  };

  return { imageSelector };
};

export default useSelectResource;
