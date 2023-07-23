import { useState, useRef } from "react";
import FileInput from "./FileInput";

function ResourceForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Add submit logic here
  }

  return (
    <div className="p-10 bg-stone-100 rounded-lg drop-shadow-md w-3/5">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 h-fit">
          <div>
            <h2 className="text-lg font-bold">Brand logo</h2>
            <div className="border border-stone-800 rounded-md w-60 h-60">
              {" "}
            </div>
            <p className="text-xs text-stone-400">
              * Please set your brand signature logo.
            </p>
          </div>
          <div className="col-span-2 flex flex-col">
            <h2 className="text-lg font-bold">Name</h2>
            <input
              className="items-center mb-5 border border-stone-800 rounded-md h-7 bg-transparent placeholder-stone-400 placeholder:text-xs"
              placeholder="Please write the log name of your brand"
            />
            <h2 className="text-lg font-bold">Description</h2>
            <textarea
              className="flex-grow border border-stone-800 rounded-md bg-transparent placeholder-stone-400 placeholder:text-xs"
              placeholder="Please tell your team members what to pay attention to when using the brand logo."
            />
            <p className="text-xs text-stone-400">
              * The content will be displayed on the main page.
            </p>
          </div>
        </div>
        <div className="mt-10">
          {["Dark mode", "1.5x", "2x", "3x", "4x"].map(mode => (
            <FileInput
              key={mode}
              label={mode}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              selectedFile={selectedFile}
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
