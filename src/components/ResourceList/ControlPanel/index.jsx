import AWS from "aws-sdk";
import { toast } from "react-hot-toast";
// eslint-disable-next-line react/prop-types
function ControlPanel({ email, resourceData }) {
  if (!resourceData) {
    return null;
  }
  // eslint-disable-next-line react/prop-types
  const { categoryName, authorName, resourceName, uploadDate, version, files } =
    resourceData;

  AWS.config.update({
    accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
  });

  function handleDownload(fileUrl) {
    const url = new URL(fileUrl);
    const fileKey = decodeURIComponent(url.pathname.substring(1));

    const s3 = new AWS.S3();
    const params = {
      Bucket: "team-dbx",
      Key: fileKey,
    };

    function downloadBlob(blob, name) {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = name;
      document.body.appendChild(link);
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      document.body.removeChild(link);
    }

    s3.getObject(params, (err, data) => {
      if (err) {
        toast.error("File download failed.");

        return;
      }

      const fileBlob = new Blob([data.Body.toString()], {
        type: "application/octet-stream",
      });
      downloadBlob(fileBlob, url.pathname.split("/").pop());
    });
  }

  return (
    <div className="w-1/5 h-full drop-shadow-2xl bg-stone-300">
      <div className="flex items-center bg-stone-100 h-16 text-stone-500">
        <div className="flex items-center ml-6">
          <div className="w-8 h-8 rounded-md bg-green-400"> </div>
          <p className="ml-4">{email}</p>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold">{resourceName}</h2>
        <p>Category: {categoryName}</p>
        <p>Author: {authorName}</p>
        <p>Upload date: {new Date(uploadDate).toLocaleDateString()}</p>
        <p>Version: {version}</p>
        <h3 className="text-lg font-bold mt-4">Files:</h3>
        <ul>
          {/* eslint-disable-next-line react/prop-types */}
          {files.map(file => (
            <li key={file._id}>
              <h4>{file.fileName}</h4>
              <button type="button" onClick={() => handleDownload(file.svgUrl)}>
                SVG Download
              </button>
              <br />
              <button type="button" onClick={() => handleDownload(file.pngUrl)}>
                PNG Download
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ControlPanel;
