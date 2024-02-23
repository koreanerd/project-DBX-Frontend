import { useRef } from "react";

interface FileUploadFormProps {
  option: string;
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    option: string,
  ) => void;
  imageByOption: File;
}

function FileUploadForm({
  option,
  handleFileChange,
  imageByOption,
}: FileUploadFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex col-span-3 mt-3">
      <h2 className="pr-10 w-40 text-right">{option}</h2>

      <div className="flex justify-between flex-grow col-span-2 border border-stone-800 rounded-md h-7">
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(event) => {
            handleFileChange(event, option);
          }}
        />

        <div
          className={`flex items-center ml-2 ${
            imageByOption ? `text-xs text-black` : `text-xs text-stone-400`
          }`}
        >
          {imageByOption
            ? imageByOption.name
            : "No files have been selected yet. *Please only upload SVG files!"}
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-1 bg-stone-800 text-sm font-light text-stone-100"
        >
          Choose your file
        </button>
      </div>
    </div>
  );
}

export default FileUploadForm;
