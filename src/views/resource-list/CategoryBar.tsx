import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

function CategoryBar() {
  const navigate = useNavigate();
  const { currentCategoryPath } = useParams();
  const categoryIds = useSelector((state: RootState) => state.user.categoryIds);
  const categoriesName = categoryIds.map((category) => category.name);

  const handleCategoryChange = (newCategory: string) => {
    navigate(`/resource-list/${newCategory}`);
  };

  return (
    <div className="grid grid-rows-5 grid-flow-col pl-6 pr-6 w-1/5 h-full">
      <div className="row-start-2 row-span-2 border-t-2 border-stone-400">
        <ul className="mt-6">
          {categoriesName.map((categoryName) => (
            <li key={categoryName} className="hover:bg-stone-200">
              <button
                type="button"
                className={`ml-7 mb-1 text-xl text-stone-500 cursor-default ${
                  currentCategoryPath === categoryName
                    ? "font-bold text-stone-800"
                    : ""
                }`}
                onClick={() => handleCategoryChange(categoryName)}
              >
                {categoryName}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryBar;
