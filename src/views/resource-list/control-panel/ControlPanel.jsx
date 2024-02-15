import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import CopyLinkButton from "./CopyLinkButton";

import { downloadResourFile } from "@/apis/categories";

function ControlPanel() {
  const token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);
  const resourceData = useSelector(
    (state) => state.resource.selectedResourceData,
  );

  const {
    resourceId,
    categoryId,
    categoryName,
    authorName,
    resourceName,
    uploadDate,
    version,
    files,
  } = resourceData;

  const download = async (url) => {
    const requestResult = await downloadResourFile(token, url);

    if (requestResult.error) {
      toast.error(requestResult.error);

      return;
    }

    toast.success("Download successful!");

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

  return (
    <div className="w-1/5 h-full drop-shadow-2xl bg-stone-300">
      <div className="flex items-center bg-stone-100 h-16 text-stone-500">
        <div className="flex items-center ml-6">
          <div className="w-8 h-8 rounded-md bg-green-400"></div>

          <p className="ml-4">{email}</p>
        </div>
      </div>

      <div className="p-6">
        {resourceData.files && (
          <>
            <div className="p-3 bg-stone-600 text-stone-100 rounded-xl mb-5">
              <h2 className="text-xl font-bold mb-2">{resourceName}</h2>
              <p>Category: {categoryName}</p>

              <p>Author: {authorName}</p>

              <p>Upload date: {new Date(uploadDate).toLocaleDateString()}</p>

              <p>Version: {version}</p>
            </div>

            <div className="flex justify-center bg-stone-800 text-center rounded-full text-sm py-1 text-stone-100">
              <span className="material-symbols-outlined pr-1">
                content_paste
              </span>

              <CopyLinkButton resourceId={resourceId} categoryId={categoryId} />
            </div>

            <h3 className="text-lg font-bold mt-4">Files:</h3>
          </>
        )}

        <ul>
          {files?.map((file) => (
            <li key={file._id} className=" p-3 bg-stone-100 mb-5 rounded-xl">
              <h4 className="mb-3 px-3 bg-stone-400 inline-block text-stone-100 text-md font-semibold rounded-full">{`${file.option}`}</h4>

              <div className="flex">
                <button
                  type="button"
                  onClick={() => download(file.svgUrl)}
                  className="hover:bg-stone-200 flex font-medium"
                >
                  <span className="material-symbols-outlined">download</span>

                  <p>SVG</p>
                </button>

                <p className="px-3"> / </p>

                <button
                  type="button"
                  onClick={() => download(file.pngUrl)}
                  className="hover:bg-stone-200 flex font-medium"
                >
                  <span className="material-symbols-outlined">download</span>

                  <p>PNG</p>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ControlPanel;
