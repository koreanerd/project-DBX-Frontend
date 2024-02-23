import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getResourceVersion } from "@/apis/categories";
import NavigateButton from "@/components/buttons/NavigateButton";
import useDownloadFile from "@/hooks/useDownloadFile";

interface File {
  option: string;
  svgContent: string;
  _id: string;
  svgUrl: string;
  pngUrl: string;
}

interface VersionDetail {
  _id: string;
  details: {
    version: string;
    uploadDate: string;
    author: string;
    description: string;
  };
  name: string;
  categoryId: string;
  files: File[];
  __v: number;
}

function ResourceVersionList() {
  const location = useLocation();
  const { categoryId, resourceId, currentCategoryPath } = location.state;
  const token = useSelector((state: RootState) => state.user.token);

  const [isLoading, setIsLoading] = useState(true);
  const [versionData, setVersionData] = useState<VersionDetail[]>([]);

  const fetchData = async () => {
    if (!token) {
      setIsLoading(false);

      return;
    }

    setIsLoading(true);

    const requestResult = await getResourceVersion(
      token,
      categoryId,
      resourceId,
    );

    if (requestResult.error) {
      toast.error(requestResult.error);

      setIsLoading(false);

      return;
    }

    setVersionData([...requestResult]);
    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const { download } = useDownloadFile();

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <div className="flex items-center justify-center pt-10 w-screen h-screen overflow-auto drop-shadow-lg">
      {isLoading ? (
        <div className="w-3/5 bg-stone-100 rounded-2xl pb-10">Loading...</div>
      ) : (
        <div className="relative w-3/5 bg-stone-100 rounded-2xl pb-10">
          <NavigateButton
            path={`/resource-list/${currentCategoryPath}`}
            title={"Back to List"}
            className={
              "absolute right-5 top-5 py-0.5 px-3 bg-stone-800 rounded-full text-sm text-stone-100 font-semibold"
            }
          />

          {[...versionData].reverse().map((version, index) => {
            const currentVersion = version.details.version;
            const previousVersion = versionData[index + 1]
              ? versionData[index + 1].details.version
              : "N/A";

            return (
              <div key={version._id}>
                <div className="border-b-2 border-stone-300 pt-10 pb-5">
                  <div className="px-10">
                    <div className="flex justify-between mb-4">
                      <div className="flex items-center">
                        <h2 className="text-2xl font-bold">{`v${version.details.version}`}</h2>

                        {index === 0 && (
                          <p className="border-2 ml-2 px-1 text-xs font-semibold border-black rounded-2xl">
                            Latest
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-lg font-semibold">Changes</p>

                    <p>{`redesign, version update ${previousVersion} -> ${currentVersion}`}</p>
                  </div>
                </div>
                <div>
                  <div className="px-10">
                    <h3 className="text-lg font-semibold py-3">Assets</h3>

                    <ul className="border border-black rounded-lg">
                      {version.files.map((file, fileIndex) => (
                        <li
                          key={file._id}
                          className={`px-2 py-3 text-sm ${
                            fileIndex + 1 !== version.files.length
                              ? "border-b border-black"
                              : ""
                          }`}
                        >
                          <div className="flex justify-between">
                            <div className="flex">
                              <span className="material-symbols-outlined pr-3">
                                image
                              </span>

                              <button
                                type="button"
                                onClick={() => download(file.svgUrl)}
                              >{`${file.option}(svg)`}</button>

                              <p className="px-2"> / </p>

                              <button
                                type="button"
                                onClick={() => download(file.pngUrl)}
                              >{`${file.option}(png)`}</button>
                            </div>
                            <div>
                              <p className="">
                                {`Updated on ${formatDate(
                                  version.details.uploadDate,
                                )}`}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ResourceVersionList;
