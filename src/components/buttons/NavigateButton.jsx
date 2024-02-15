import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { goToRoute } from "@/utils/navigation";

function NavigateButton({ path, state, title, className }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => goToRoute(navigate, path, state)}
      className={className}
    >
      {title}
    </button>
  );
}

const statePropTypes = PropTypes.oneOfType([
  PropTypes.shape({
    currentCategoryPath: PropTypes.string,
  }),
  PropTypes.func,
]);

NavigateButton.propTypes = {
  path: PropTypes.string.isRequired,
  state: statePropTypes,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default NavigateButton;
