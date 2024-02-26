import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import useSelectResource from "@/hooks/useSelectResource";
import toast from "react-hot-toast";
import { deleteResourceData } from "@/apis/categories";
import NavigateButton from "@/components/buttons/NavigateButton";

interface ResourceData {
  resourceId: string;
  svgUrl: string;
}

interface ImageGridProps {
  list: string[];
  data: ResourceData[];
  refreshData: (categoryId: string) => Promise<void>;
}

function ImageGrid({ list, data, refreshData }: ImageGridProps) {
  const { currentCategoryPath } = useParams();
  const token = useSelector((state: RootState) => state.user.token);
  const categoryIds = useSelector((state: RootState) => state.user.categoryIds);
  const categoryId = categoryIds.find(
    (category) => category.name === currentCategoryPath,
  )?.id;
  const { imageSelector } = useSelectResource(categoryId);
  const gridRef = useRef<HTMLDivElement>(null);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const handleOpenModal = (img: string, id: string) => {
    setModalContent(img);
    setShowModal(true);
    imageSelector(id);
    setCurrentId(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    imageSelector(null);
  };

  const locationData = {
    versionForm: {
      path: "/new-resource-version-form",
      state: (resourceId: string) => ({
        resourceId,
        currentCategoryPath,
        flag: "update",
      }),
    },
    resourceForm: {
      path: "/new-resource-form",
      state: {
        categoryId,
        currentCategoryPath,
        flag: "addResource",
      },
    },
    versionList: {
      path: "/resource-version-list",
      state: (resourceId: string) => ({
        categoryId,
        resourceId,
        currentCategoryPath,
      }),
    },
  };

  const deleteResource = async (resourceId: string) => {
    const requestResult = await deleteResourceData(
      token,
      categoryId,
      resourceId,
    );

    if (requestResult.error) {
      toast.error(requestResult.error);

      return;
    }

    toast.success(requestResult.message);

    if (categoryId) refreshData(categoryId);
  };

  useEffect(() => {
    handleCloseModal();
  }, [currentCategoryPath]);

  return (
    <div className="relative w-3/5 p-10 overflow-auto h-screen" ref={gridRef}>
      {showModal &&
        gridRef.current &&
        createPortal(
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-1/2 bg-stone-100 p-5 rounded-xl">
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute left-0 top-0 m-5 py-0.5 px-3 bg-stone-800 rounded-full text-sm text-stone-100 font-normal"
              >
                Close
              </button>

              {currentId && (
                <NavigateButton
                  path={locationData.versionList.path}
                  state={locationData.versionList.state(currentId)}
                  title={"Previous version"}
                  className={
                    "absolute right-0 bottom-0 m-5 py-0.5 px-3 bg-stone-800 rounded-full text-sm text-stone-100 font-semibold"
                  }
                />
              )}

              {currentId && (
                <NavigateButton
                  path={locationData.versionForm.path}
                  state={locationData.versionForm.state(currentId)}
                  title={"Update"}
                  className={
                    "absolute left-0 bottom-0 m-5 py-0.5 px-3 bg-stone-800 rounded-full text-sm text-stone-100 font-semibold"
                  }
                />
              )}

              {modalContent && <img src={modalContent} />}
            </div>
          </div>,
          gridRef.current,
        )}
      <div className="grid grid-cols-4 gap-4">
        {list.map((url, index) => {
          return (
            <div key={url} className="relative bg-stone-100 rounded-xl">
              <img
                src={url}
                alt=""
                onClick={() => handleOpenModal(url, data[index].resourceId)}
              />

              <div className="absolute flex justify-center left-0 right-0 bottom-0 w-4/6 m-auto text-xs pb-2 text-stone-100 font-normal">
                <button
                  type="button"
                  onClick={() => deleteResource(data[index].resourceId)}
                  className="px-2 py-0.5 rounded-md bg-stone-800"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <div className="relative bg-stone-100 rounded-xl">
          <img src="/blank_square.svg" />

          <NavigateButton
            path={locationData.resourceForm.path}
            state={locationData.resourceForm.state}
            title={"+"}
            className={
              "absolute left-0 right-0 top-0 bottom-0 w-4/5 h-4/5 m-auto bg-white backdrop-filter rounded-xl p-1 text-5xl font-light text-stone-700 transform transition duration-500 hover:scale-105"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ImageGrid;
