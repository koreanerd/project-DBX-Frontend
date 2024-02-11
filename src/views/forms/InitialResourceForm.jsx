import { useSelector } from "react-redux";
import FileUploadForm from "@/components/FileUploadForm";
import useStagedFile from "@/hooks/useStagedFile";

function InitialResourceForm() {
  const token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);
  const {
    previewFile,
    requiredDetails,
    logoByOptions,
    handleOnChange,
    handleFileChange,
    handleSubmit,
    getRootProps,
    getInputProps,
  } = useStagedFile(token, email);

  return (
    <main>
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="p-10 bg-stone-100 rounded-lg drop-shadow-md w-3/5">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 h-fit">
              <div>
                <h2 className="text-lg font-bold">Brand Logo</h2>

                <div
                  {...getRootProps()}
                  className="border border-stone-800 rounded-md w-60 h-60"
                >
                  <input {...getInputProps()} />
                  {previewFile && (
                    <img
                      src={previewFile}
                      alt="chosen"
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </div>

                <p className="text-xs text-stone-400">
                  * Please set your brand signature logo.
                </p>
              </div>

              <div className="col-span-2 flex flex-col">
                <h2 className="text-lg font-bold">Name</h2>

                <input
                  name="name"
                  className="items-center mb-5 border border-stone-800 rounded-md h-7 bg-transparent placeholder-stone-400 placeholder:text-xs"
                  placeholder="Please write the log name of your brand"
                  value={requiredDetails.name}
                  onChange={handleOnChange}
                />

                <h2 className="text-lg font-bold">Description</h2>

                <textarea
                  name="description"
                  className="flex-grow border border-stone-800 rounded-md bg-transparent placeholder-stone-400 placeholder:text-xs"
                  placeholder="Please tell your team members what to pay attention to when using the brand logo."
                  value={requiredDetails.description}
                  onChange={handleOnChange}
                />

                <p className="text-xs text-stone-400">
                  * The content will be displayed on the main page.
                </p>
              </div>
            </div>

            <div className="mt-10">
              {Object.keys(logoByOptions).map((option) => (
                <FileUploadForm
                  key={option}
                  mode={option}
                  handleFileChange={(event) => handleFileChange(event, option)}
                  logoImageByMode={logoByOptions[option]}
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

export default InitialResourceForm;
