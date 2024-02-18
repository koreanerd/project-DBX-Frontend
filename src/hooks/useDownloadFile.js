import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { downloadResourFile } from "@/apis/categories";

const useDownloadFile = () => {
  const token = useSelector((state) => state.user.token);

  const download = async (url) => {
    const requestResult = await downloadResourFile(token, url);
    if (requestResult.error) {
      toast.error(requestResult.error);

      return;
    }

    toast.success("File download was successful.");

    const downloadUrl = window.URL.createObjectURL(requestResult);
    const link = document.createElement("a");

    link.href = downloadUrl;

    const fileName = url.split("/").pop();

    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  };

  return { download };
};

export default useDownloadFile;
