// eslint-disable-next-line react/prop-types
function ImageGrid({ category }) {
  return (
    <div className="w-3/5 overflow-auto h-screen">
      <div className="grid grid-cols-4 gap-4 mt-12 mr-12">
        {/* eslint-disable-next-line react/prop-types */}
        {category.map(img => {
          const objectID = img.split("/")[3].replace(/"/g, "");

          return (
            <div key={objectID} className="bg-stone-100 rounded-xl">
              <img src={img} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImageGrid;
