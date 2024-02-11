import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { initialRegistration } from "../apis/user";

const useStagedFile = (token) => {
  const navigate = useNavigate();
  const [previewFile, setPreviewFile] = useState(null);
  const [requiredDetails, setRequiredDetails] = useState({
    name: "",
    description: "",
    default: null,
  });
  const [logoByOptions, setlogoByOptions] = useState({
    "Dark Mode": null,
    "1.5x": null,
    "2x": null,
    "3x": null,
    "4x": null,
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setRequiredDetails((prev) => ({ ...prev, [name]: value }));
  };

  const onDrop = (stagedFile) => {
    const file = stagedFile[0];

    if (file && file.type !== "image/svg+xml") {
      toast.error("Selected file is not SVG.\nPlease choose SVG file! :)");

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewFile(reader.result);
    };

    setRequiredDetails((prev) => ({ ...prev, default: file }));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileChange = (event, option) => {
    if (event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];

    if (file && file.type !== "image/svg+xml") {
      toast.error("Selected file is not SVG.\nPlease choose SVG file! :)");

      return;
    }

    setlogoByOptions((prev) => ({ ...prev, [option]: file }));
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const date = new Date().toString();
    const requestData = {
      name: `${requiredDetails.name}`,
      details: {
        version: "1.0.0",
        uploadDate: date,
        description: requiredDetails.description,
      },
      files: [],
    };

    if (requiredDetails.default) {
      const svgContent = await readFileAsText(requiredDetails.default);

      requestData.files.push({
        option: "default",
        svgContent: svgContent,
      });
    }

    Object.keys(logoByOptions).forEach(async (option) => {
      const file = logoByOptions[option];

      if (file) {
        const svgContent = await readFileAsText(requiredDetails.default);

        requestData.files.push({
          option: option,
          svgContent: svgContent,
        });
      }
    });

    const requestResult = await initialRegistration(token, requestData);

    if (requestResult.error) {
      toast.error(requestResult.error);

      return;
    }

    toast.success("Upload successful!");

    navigate("/resource-list/brand-logo");
  };

  return {
    previewFile,
    requiredDetails,
    logoByOptions,
    handleOnChange,
    handleFileChange,
    handleSubmit,
    getRootProps,
    getInputProps,
  };
};

export default useStagedFile;