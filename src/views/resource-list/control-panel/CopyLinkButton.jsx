import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import ClipboardJS from "clipboard";
import { toast } from "react-hot-toast";

function CopyLinkButton({ resourceId, categoryId }) {
  const copyButtonRef = useRef(null);
  let clipboard = null;

  const providedUrl = `${
    import.meta.env.VITE_BACKEND_URL
  }/dbx/categories/${categoryId}/resources/${resourceId}`;

  useEffect(() => {
    clipboard = new ClipboardJS(copyButtonRef.current, {
      text: () => providedUrl,
    });

    clipboard.on("success", () => {
      toast.success("Copy success!");
    });

    clipboard.on("error", () => {
      toast.error("Copy failed...");
    });

    return () => {
      clipboard.destroy();
    };
  }, [providedUrl]);

  return (
    <button ref={copyButtonRef} type="button">
      Copy provided link
    </button>
  );
}

CopyLinkButton.propTypes = {
  resourceId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
};

export default CopyLinkButton;
