import { useRef } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getFixedUrl } from "@/apis/dbxServices";

interface CopyLinkButtonProps {
  resourceId: string;
}

function CopyLinkButton({ resourceId }: CopyLinkButtonProps) {
  const token = useSelector((state: RootState) => state.user.token);
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  const handleCopyClick = async () => {
    const requestResult = await getFixedUrl(token, resourceId);

    if (requestResult.error) {
      toast.error(requestResult.error);

      return;
    }

    await navigator.clipboard.writeText(requestResult);

    toast.success("Copy success!");
  };

  return (
    <button ref={copyButtonRef} type="button" onClick={handleCopyClick}>
      Copy provided link
    </button>
  );
}

export default CopyLinkButton;
