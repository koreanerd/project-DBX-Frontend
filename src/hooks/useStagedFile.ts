import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/features/user/slice";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { DropzoneRootProps, DropzoneInputProps } from "react-dropzone";
import { initialRegistration } from "@/apis/users";
import { addResource, updateResourceVersion } from "@/apis/categories";

interface RequiredDetails {
  name: string;
  description: string;
  default: File | null;
}

interface ImageByOptions {
  "Dark Mode": File | null;
  "1.5x": File | null;
  "2x": File | null;
  "3x": File | null;
  "4x": File | null;
}

interface FileDetail {
  option: string;
  svgContent: string;
}

interface RequestData {
  name?: string;
  details: {
    version: string;
    uploadDate: string;
    description: string;
  };
  files: FileDetail[];
}

interface UseStagedFileArgs {
  token: string | null;
  flag: string;
  categoryId: string;
  resourceId: string;
  currentCategoryPath: string;
}

interface UseStagedFileReturn {
  previewFile: string | null;
  requiredDetails: RequiredDetails;
  imageByOptions: ImageByOptions;
  handleOnChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    option: string,
  ) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
}

const useStagedFile = ({
  token,
  flag,
  categoryId,
  resourceId,
  currentCategoryPath,
}: UseStagedFileArgs): UseStagedFileReturn => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isInitialUser = useSelector(
    (state: RootState) => state.user.isInitialUser,
  );
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [requiredDetails, setRequiredDetails] = useState<RequiredDetails>({
    name: "",
    description: "",
    default: null,
  });
  const [imageByOptions, setImageByOptions] = useState<ImageByOptions>({
    "Dark Mode": null,
    "1.5x": null,
    "2x": null,
    "3x": null,
    "4x": null,
  });

  const handleOnChange: UseStagedFileReturn["handleOnChange"] = (event) => {
    const { name, value } = event.target;

    setRequiredDetails((prev) => ({ ...prev, [name]: value }));
  };

  const onDrop = (stagedFile: File[]) => {
    const file = stagedFile[0];

    if (file && file.type !== "image/svg+xml") {
      toast.error("Selected file is not SVG.\nPlease choose SVG file! :)");

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewFile(reader.result as string | null);
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

    setImageByOptions((prev) => ({ ...prev, [option]: file }));
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string")
          resolve(event.target.result);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleSubmit: UseStagedFileReturn["handleSubmit"] = async (event) => {
    event.preventDefault();

    const date = new Date().toString();
    const requestData: RequestData =
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

    const optionPromises = Object.keys(imageByOptions).map(async (option) => {
      const file = imageByOptions[option];

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

    requestData.files.push(
      ...optionFiles.filter((file): file is FileDetail => file !== null),
    );

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
    imageByOptions,
    handleOnChange,
    handleFileChange,
    handleSubmit,
    getRootProps,
    getInputProps,
  };
};

export default useStagedFile;
