// eslint-disable-next-line react/prop-types
function FileInput({ label, fileInputRef, handleFileChange, selectedFile }) {
  return (
    <div className="flex col-span-3 mt-3">
      <h2 className="pr-10 w-40 text-right">{label}</h2>
      <div className="flex justify-between flex-grow col-span-2 border border-stone-800 rounded-md h-7">
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div
          className={`flex items-center ml-2 ${
            selectedFile ? `text-xs text-black` : `text-xs text-stone-400`
          }`}
        >
          {selectedFile
            ? // eslint-disable-next-line react/prop-types
              selectedFile.name
            : "No files have been selected yet. *Please only upload SVG files!"}
        </div>
        <button
          type="button"
          // eslint-disable-next-line react/prop-types
          onClick={() => fileInputRef.current.click()}
          className="px-1 bg-stone-800 text-sm font-light text-stone-100"
        >
          Choose your file
        </button>
      </div>
    </div>
  );
}

export default FileInput;
