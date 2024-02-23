import { useLocation } from "react-router-dom";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import FileUploadForm from "@/components/FileUploadForm";
import useStagedFile from "@/hooks/useStagedFile";
import NavigateButton from "@/components/buttons/NavigateButton";

interface LocationState {
  currentCategoryPath: string;
  categoryId: string;
  resourceId: string;
  flag: string;
}

function ResourceForm() {
  const location = useLocation();
  const state = location.state as LocationState;
  const { currentCategoryPath, categoryId, resourceId, flag } = state;

  const isInitialUser = useSelector(
    (state: RootState) => state.user.isInitialUser,
  );
  const token = useSelector((state: RootState) => state.user.token);

  const {
    previewFile,
    requiredDetails,
    imageByOptions,
    handleOnChange,
    handleFileChange,
    handleSubmit,
    getRootProps,
    getInputProps,
  } = useStagedFile({
    token,
    flag,
    categoryId,
    resourceId,
    currentCategoryPath,
  });

  return (
    <main>
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="relative p-10 bg-stone-100 rounded-lg drop-shadow-md w-3/5">
          {!isInitialUser && (
            <NavigateButton
              path={`/resource-list/${currentCategoryPath}`}
              title={"Back to List"}
              className={
                "absolute right-5 top-5 py-0.5 px-3 bg-stone-800 rounded-full text-sm text-stone-100 font-semibold"
              }
            />
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 h-fit">
              <div>
                <h2 className="text-lg font-bold">
                  {isInitialUser ? "Brand Logo" : currentCategoryPath}
                </h2>

                <div
                  {...getRootProps()}
                  className="flex items-center justify-center border border-stone-800 rounded-md w-60 h-60"
                >
                  <input {...getInputProps()} />
                  {previewFile ? (
                    <img
                      src={previewFile}
                      alt="chosen"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <p className="text-xs text-stone-400">
                      Drag and drop or click here
                    </p>
                  )}
                </div>

                <p className="text-xs text-stone-400">
                  * Please upload a representative image.
                </p>
              </div>

              <div className="col-span-2 flex flex-col">
                {flag === "update" ? (
                  <h2 className="text-lg font-bold">New version name</h2>
                ) : (
                  <h2 className="text-lg font-bold">Name</h2>
                )}

                <input
                  name="name"
                  className="items-center mb-5 border border-stone-800 rounded-md h-7 bg-transparent placeholder-stone-400 placeholder:text-xs"
                  placeholder={
                    flag === "update"
                      ? "Please write a name for the new version (e.g., 1.5.2, 3.0.2)."
                      : "Please write the logo name of your brand"
                  }
                  value={requiredDetails.name}
                  onChange={handleOnChange}
                />

                <h2 className="text-lg font-bold">Description</h2>

                <textarea
                  name="description"
                  className="flex-grow border border-stone-800 rounded-md bg-transparent placeholder-stone-400 placeholder:text-xs"
                  placeholder="Please let your team members know what to watch out for when using it."
                  value={requiredDetails.description}
                  onChange={handleOnChange}
                />

                <p className="text-xs text-stone-400">
                  * The content will be displayed on the main page.
                </p>
              </div>
            </div>

            <div className="mt-10">
              {Object.keys(imageByOptions).map((option) => (
                <FileUploadForm
                  key={option}
                  option={option}
                  handleFileChange={(event) => handleFileChange(event, option)}
                  imageByOption={imageByOptions[option]}
                />
              ))}
            </div>

            <button
              type="submit"
              className=" block mx-auto mt-9 bg-stone-800 w-40 h-10 text-lg font-light rounded-md text-stone-100"
            >
              Done
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ResourceForm;
