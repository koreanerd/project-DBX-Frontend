import { useEffect, useState, useCallback } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { getResourceList } from "@/apis/categories";
import { toast } from "react-hot-toast";

interface ResourceData {
  resourceId: string;
  svgUrl: string;
}

interface UseFetchResourceListReturn {
  urlList: string[];
  requestData: ResourceData[];
  isLoading: boolean;
  fetchData: (categoryId: string) => Promise<void>;
}

const useFetchResourceList = (
  categoryId: string,
): UseFetchResourceListReturn => {
  const token = useSelector((state: RootState) => state.user.token);

  const [isLoading, setIsLoading] = useState(true);
  const [urlList, setUrlList] = useState<string[]>([]);
  const [requestData, setRequestData] = useState<ResourceData[]>([]);

  const fetchData = useCallback(async () => {
    if (!categoryId || !token) {
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

    setUrlList(
      requestResult.resourceList.map(
        (resource: ResourceData) => resource.svgUrl,
      ),
    );
    setRequestData(requestResult.resourceList);
    setIsLoading(false);
  }, [categoryId, token]);

  useEffect(() => {
    fetchData();
  }, [categoryId, token, fetchData]);

  return { urlList, requestData, isLoading, fetchData };
};

export default useFetchResourceList;
