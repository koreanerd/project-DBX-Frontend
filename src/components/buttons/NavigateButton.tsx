import { useNavigate } from "react-router-dom";
import { goToRoute } from "@/utils/navigation";

interface NavigateButtonProps {
  path: string;
  state?: { currentCategoryPath?: string } | (() => void);
  title: string;
  className?: string;
}

function NavigateButton({
  path,
  state,
  title,
  className,
}: NavigateButtonProps) {
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

export default NavigateButton;
