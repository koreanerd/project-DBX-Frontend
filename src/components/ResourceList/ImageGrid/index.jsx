// eslint-disable-next-line react/prop-types
function ImageGrid({ category, resourceData }) {
  return (
    <div className="w-3/5 overflow-auto h-screen">
      <div className="grid grid-cols-4 gap-4 mt-12 mr-12">
        {/* eslint-disable-next-line react/prop-types */}
        {category[resourceData].map((img, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="bg-stone-100 rounded-xl">
            <img src={img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGrid;
