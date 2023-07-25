import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import FileInput from "./FileInput";

function ResourceForm() {
  const [requiredLogoDetails, setRequiredLogoDetails] = useState({
    name: "",
    description: "",
    default: null,
    categoryId: null,
  });

  const [logoImagesByMode, setLogoImagesByMode] = useState({
    darkmode: null,
    "1.5x": null,
    "2x": null,
    "3x": null,
    "4x": null,
  });

  const [previewSource, setPreviewSource] = useState(null);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setRequiredLogoDetails(prevData => ({ ...prevData, [name]: value }));
  }

  function onDrop(acceptedFiles) {
    const file = acceptedFiles[0];

    if (file && file.type !== "image/svg+xml") {
      toast.error("Selected file is not SVG.\nPlease choose SVG file! :)");

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };

    setRequiredLogoDetails(prevFiles => ({ ...prevFiles, default: file }));
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  function handleFileChange(event, mode) {
    if (event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];

    if (file && file.type !== "image/svg+xml") {
      toast.error("Selected file is not SVG.\nPlease choose SVG file! :)");

      return;
    }

    setLogoImagesByMode(prevFiles => ({ ...prevFiles, [mode]: file }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(requiredLogoDetails);
    console.log(logoImagesByMode);
    // Add submit logic here
  }

  return (
    <div className="p-10 bg-stone-100 rounded-lg drop-shadow-md w-3/5">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 h-fit">
          <div>
            <h2 className="text-lg font-bold">Brand logo</h2>
            {/* eslint-disable react/jsx-props-no-spreading */}
            <div
              {...getRootProps()}
              className="border border-stone-800 rounded-md w-60 h-60"
            >
              <input {...getInputProps()} />
              {previewSource && (
                <img
                  src={previewSource}
                  alt="chosen"
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
            {/* eslint-enable react/jsx-props-no-spreading */}
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
              value={requiredLogoDetails.name}
              onChange={handleInputChange}
            />
            <h2 className="text-lg font-bold">Description</h2>
            <textarea
              name="description"
              className="flex-grow border border-stone-800 rounded-md bg-transparent placeholder-stone-400 placeholder:text-xs"
              placeholder="Please tell your team members what to pay attention to when using the brand logo."
              value={requiredLogoDetails.description}
              onChange={handleInputChange}
            />
            <p className="text-xs text-stone-400">
              * The content will be displayed on the main page.
            </p>
          </div>
        </div>
        <div className="mt-10">
          {Object.keys(logoImagesByMode).map(mode => (
            <FileInput
              key={mode}
              mode={mode}
              handleFileChange={event => handleFileChange(event, mode)}
              logoImageByMode={logoImagesByMode[mode]}
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
  );
}

export default ResourceForm;
