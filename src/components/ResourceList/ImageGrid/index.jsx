import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ImageGrid({ category }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  function openModal(img) {
    setSelectedImage(img);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setSelectedImage(null);
    setDarkMode(false);
  }

  function navigateToVersionPage() {
    navigate("/resource-version");
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div className="w-3/5 overflow-auto h-screen">
      <div className="grid grid-cols-4 gap-4 mt-12 mr-12">
        {/* eslint-disable-next-line react/prop-types */}
        {category.map(img => {
          const objectID = img.split("/")[3].replace(/"/g, "");

          return (
            <div
              key={objectID}
              role="button"
              tabIndex={0}
              onClick={() => openModal(img)}
              onKeyDown={event => {
                if (event.key === "Enter" || event.key === " ") {
                  openModal(img);
                }
              }}
              className="bg-stone-100 rounded-xl"
            >
              <img src={img} alt="" />
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="w-1/4 mx-auto my-40 bg-stone-300"
      >
        {selectedImage && (
          <div>
            <img
              src={selectedImage}
              alt=""
              className={darkMode ? "dark-version" : ""}
            />
            <button
              type="button"
              onClick={navigateToVersionPage}
              className="border border-black"
            >
              Previous version &gt;
            </button>
            <button
              type="button"
              onClick={toggleDarkMode}
              className="border border-black"
            >
              Switch to {darkMode ? "Normal" : "Dark"} Mode
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ImageGrid;
