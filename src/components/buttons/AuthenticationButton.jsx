import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forwardRef } from "react";

const AuthenticationButton = forwardRef(
  function AuthenticationButton(props, ref) {
    const { handler, title, css, ariaLabel } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
      <button
        ref={ref}
        className={css}
        aria-label={ariaLabel}
        onClick={() => {
          handler(dispatch, navigate);
        }}
      >
        {title}
      </button>
    );
  },
);

AuthenticationButton.propTypes = {
  handler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  css: PropTypes.string.isRequired,
  icon: PropTypes.node,
  ariaLabel: PropTypes.string.isRequired,
};

export default AuthenticationButton;