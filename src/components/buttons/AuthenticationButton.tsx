import { forwardRef } from "react";
import { Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface AuthenticationButtonProps {
  handler: (dispatch: Dispatch, navigate: NavigateFunction) => void;
  title?: string;
  className: string;
  icon?: React.ReactNode;
  ariaLabel: string;
}

const AuthenticationButton = forwardRef<
  HTMLButtonElement,
  AuthenticationButtonProps
>(({ handler, title, icon, className, ariaLabel }, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <button
      ref={ref}
      className={className}
      aria-label={ariaLabel}
      onClick={() => {
        handler(dispatch, navigate);
      }}
    >
      {title || icon}
    </button>
  );
});

export default AuthenticationButton;
