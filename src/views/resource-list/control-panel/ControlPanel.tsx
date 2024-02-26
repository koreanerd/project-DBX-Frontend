import { RootState } from "@/store";
import { useSelector } from "react-redux";
import CopyLinkButton from "./CopyLinkButton";
import useDownloadFile from "@/hooks/useDownloadFile";
import { handleSignOut } from "@/utils/authenticate/handlers";
import AuthenticationButton from "@/components/buttons/AuthenticationButton";
import { signOutIcon } from "@/assets/svgIcons";

interface File {
  option: string;
  svgContent: string;
  _id: string;
  svgUrl: string;
  pngUrl: string;
}

function ControlPanel() {
  const email = useSelector((state: RootState) => state.user.email);
  const resourceData = useSelector(
    (state: RootState) => state.resource.selectedResourceData,
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

  const { download } = useDownloadFile();

  return (
    <div className="w-1/5 h-full drop-shadow-2xl bg-stone-300">
      <div className="flex items-center justify-center w-full h-16 bg-stone-100 text-stone-500">
        <div className="flex items-center justify-between">
          <div className="w-8 h-8 rounded-md bg-green-400"></div>

          <p className="mx-5">{email}</p>

          <AuthenticationButton
            handler={handleSignOut}
            icon={signOutIcon}
            className="text-stone-500"
            ariaLabel="Logout button"
          />
        </div>
      </div>

      <div className="p-6">
        {resourceData.files ? (
          <div>
            <div className="p-3 bg-stone-600 text-stone-100 rounded-xl mb-5">
              <h2 className="text-xl font-bold mb-2">{resourceName}</h2>
              <p>Category: {categoryName}</p>

              <p>Author: {authorName}</p>

              <p>
                Upload date:{" "}
                {uploadDate && new Date(uploadDate).toLocaleDateString()}
              </p>

              <p>Version: {version}</p>
            </div>

            <div className="flex justify-center bg-stone-800 text-center rounded-full text-sm py-1 text-stone-100">
              <span className="material-symbols-outlined pr-1">
                content_paste
              </span>

              {resourceId && categoryId && (
                <CopyLinkButton
                  resourceId={resourceId}
                  categoryId={categoryId}
                />
              )}
            </div>

            <h3 className="text-lg font-bold mt-4">Files:</h3>
          </div>
        ) : (
          ""
        )}

        <ul>
          {files?.map((file: File) => (
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
