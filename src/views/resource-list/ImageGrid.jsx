import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import useSelectResource from "@/hooks/useSelectResource";
import { goToRoute } from "@/utils/navigation";

function ImageGrid({ list, data, fetchData }) {
  const navigate = useNavigate();
  const { currentCategoryPath } = useParams();
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
        resourceId: currentId,
        currentCategoryPath,
      }),
    },
  };

  async function resourceDelete(id) {
    const response = await axios.delete(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/categories/${categoryId}/resources/${id}`,
    );

    if (response.data.result === "OK") {
      fetchData();
    }
  }

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

              <button
                type="button"
                onClick={() =>
                  goToRoute(
                    navigate,
                    locationData.versionList.path,
                    locationData.versionList.state,
                  )
                }
                className="absolute right-0 bottom-0 m-5 py-0.5 px-3 bg-stone-800 rounded-full text-sm text-stone-100 font-semibold"
              >
                Previous version &gt;
              </button>
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
                <button
                  type="button"
                  onClick={() =>
                    goToRoute(
                      navigate,
                      locationData.versionForm.path,
                      locationData.versionForm.state(data[index].resourceId),
                    )
                  }
                  className="px-2 py-0.5 rounded-md bg-stone-800"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => resourceDelete(data[index].resourceId)}
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
          <button
            type="button"
            onClick={() =>
              goToRoute(
                navigate,
                locationData.resourceForm.path,
                locationData.resourceForm.state(currentId),
              )
            }
            className="absolute left-0 right-0 top-0 bottom-0 w-4/5 h-4/5 m-auto bg-white backdrop-filter rounded-xl p-1 text-5xl font-light text-stone-700 transform transition duration-500 hover:scale-105"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ImageGrid.propTypes = {
  list: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func,
};

export default ImageGrid;
