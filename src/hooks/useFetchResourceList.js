import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { getResourceList } from "@/apis/categories";
import { toast } from "react-hot-toast";

const useFetchResourceList = (categoryId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [urlList, setUrlList] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const token = useSelector((state) => state.user.token);

  const fetchData = useCallback(async () => {
    if (!categoryId) {
      setIsLoading(false);

      return;
    }

    setIsLoading(true);

    const requestResult = await getResourceList(token, categoryId);

    if (requestResult.error) {
      toast.error(requestResult.error);

      setIsLoading(false);

      return;
    }

    setUrlList(requestResult.resourceList.map((resource) => resource.svgUrl));
    setRequestData(requestResult.resourceList);
    setIsLoading(false);
  }, [categoryId, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { urlList, requestData, isLoading };
};

export default useFetchResourceList;
