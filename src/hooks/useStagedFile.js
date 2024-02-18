import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/features/user/slice";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { initialRegistration } from "@/apis/users";
import { addResource, updateResourceVersion } from "../apis/categories";

const useStagedFile = (
  token,
  flag,
  categoryId,
  resourceId,
  currentCategoryPath,
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isInitialUser = useSelector((state) => state.user.isInitialUser);
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
    const requestData =
      flag === "update"
        ? {
            details: {
              version: requiredDetails.name,
              uploadDate: date,
              description: requiredDetails.description,
            },
            files: [],
          }
        : {
            name: requiredDetails.name,
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
        svgContent,
      });
    }

    const optionPromises = Object.keys(logoByOptions).map(async (option) => {
      const file = logoByOptions[option];

      if (file) {
        const svgContent = await readFileAsText(file);

        return {
          option,
          svgContent,
        };
      }

      return null;
    });

    const optionFiles = await Promise.all(optionPromises);

    requestData.files.push(...optionFiles.filter((file) => file !== null));

    let requestResult;

    if (flag === "update")
      requestResult = await updateResourceVersion(
        token,
        resourceId,
        requestData,
      );

    if (flag === "addResource")
      requestResult = await addResource(token, categoryId, requestData);

    if (isInitialUser)
      requestResult = await initialRegistration(token, requestData);

    if (requestResult.error) {
      toast.error(requestResult.error);

      return;
    }

    if (requestResult.categoryIds) {
      dispatch(
        setUser({
          categoryIds: requestResult.categoryIds,
          name: requestResult.name,
        }),
      );

      toast.success("Upload successful!");

      navigate(`/setup-overview`);

      return;
    }

    if (flag === "update") {
      toast.success(requestResult.message);
    }

    if (flag === "addResource") {
      toast.success(requestResult.message);
    }

    navigate(`/resource-list/${currentCategoryPath}`);
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
