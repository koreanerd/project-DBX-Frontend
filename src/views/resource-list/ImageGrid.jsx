import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import useSelectResource from "@/hooks/useSelectResource";
import toast from "react-hot-toast";
import { deleteResourceData } from "@/apis/categories";
import NavigateButton from "@/components/buttons/navigateButton";

function ImageGrid({ list, data }) {
  const { currentCategoryPath } = useParams();
  const token = useSelector((state) => state.user.token);
  const categoryIds = useSelector((state) => state.user.categoryIds);
  const categoryId = categoryIds.find(
    (category) => category.name === currentCategoryPath,
  )?.id;
  const { imageSelector } = useSelectResource(categoryId);
  const gridRef = useRef();

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  const handleOpenModal = (img, id) => {
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
      state: (resourceId) => ({
        resourceId,
        currentCategoryPath,
      }),
    },
    resourceForm: {
      path: "/new-resource-form",
      state: {
        currentCategoryPath,
      },
    },
    versionList: {
      path: "/resource-version-list",
      state: (currentId) => ({
        categoryId,
        resourceId: currentId,
        currentCategoryPath,
      }),
    },
  };

  const deleteResource = async (resourceId) => {
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
  };

  return (
    <div className="relative w-3/5 p-10 overflow-auto h-screen" ref={gridRef}>
      {showModal &&
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

              <NavigateButton
                path={locationData.versionList.path}
                state={locationData.versionList.state(currentId)}
                title={"Previous version"}
                className={
                  "absolute right-0 bottom-0 m-5 py-0.5 px-3 bg-stone-800 rounded-full text-sm text-stone-100 font-semibold"
                }
              />
              <img src={modalContent} alt="" />
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

              <div className="absolute flex justify-between left-0 right-0 bottom-0 w-4/6 m-auto text-xs pb-2 text-stone-100 font-normal">
                <NavigateButton
                  path={locationData.versionForm.path}
                  state={locationData.versionForm.state(data[index].resourceId)}
                  title={"Update"}
                  className={"px-2 py-0.5 rounded-md bg-stone-800"}
                />

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
          <img src="/asset/blank_square.svg" alt="" />
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

ImageGrid.propTypes = {
  list: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default ImageGrid;
