import { useRef, useState } from "react";
import { createPortal } from "react-dom";

// eslint-disable-next-line react/prop-types
function ImageGrid({ svgUrl, data, onImageSelect }) {
  const gridRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  function handleOpenModal(img, id) {
    setModalContent(img);
    setShowModal(true);
    onImageSelect(id);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div className="relative w-3/5 overflow-auto h-screen" ref={gridRef}>
      {showModal &&
        createPortal(
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/2 bg-stone-100 p-5 rounded-xl">
              <button type="button" onClick={handleCloseModal}>
                Close Modal
              </button>
              <img src={modalContent} alt="" />
            </div>
          </div>,
          gridRef.current // Use the ref as the container for the portal
        )}
      <div className="grid grid-cols-4 gap-4 mt-12 mr-12">
        {/* eslint-disable-next-line react/prop-types, array-callback-return */}
        {svgUrl.map((url, index) => {
          // eslint-disable-next-line no-useless-escape
          const key = url.match(/\"(.+?)\"/)[1];

          return (
            <div key={key} className="bg-stone-100 rounded-xl">
              <img
                src={url}
                alt=""
                // eslint-disable-next-line react/prop-types
                onClick={() => handleOpenModal(url, data[index].id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImageGrid;
