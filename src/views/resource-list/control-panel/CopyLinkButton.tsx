import { useRef, useEffect } from "react";
import * as ClipboardJS from "clipboard";
import { toast } from "react-hot-toast";

interface CopyLinkButtonProps {
  resourceId: string;
  categoryId: string;
}

function CopyLinkButton({ resourceId, categoryId }: CopyLinkButtonProps) {
  const copyButtonRef = useRef(null);

  const providedUrl = `${
    import.meta.env.VITE_BACKEND_URL
  }/dbx/categories/${categoryId}/resources/${resourceId}`;

  useEffect(() => {
    if (copyButtonRef.current) {
      const clipboard = new ClipboardJS(copyButtonRef.current, {
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
    }
  }, [providedUrl]);

  return (
    <button ref={copyButtonRef} type="button">
      Copy provided link
    </button>
  );
}

export default CopyLinkButton;
