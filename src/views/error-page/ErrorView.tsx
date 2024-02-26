import { useLocation } from "react-router-dom";
import NavigateButton from "@/components/buttons/NavigateButton";

function ErrorView() {
  const location = useLocation();
  const errorMessage: string =
    location.state?.error || "An unknown error occurred";

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center bg-stone-100 drop-shadow-md rounded-lg w-96 h-52">
        <h2 className="text-center mb-4 text-3xl font-bold">Error</h2>

        <p className="mb-4">{`"${errorMessage}"`}</p>

        <NavigateButton
          path="/"
          title="Return to Home"
          className="block mx-auto mb-2.5 border border-black rounded-md bg-black text-1xl w-52 h-10 text-zinc-200"
        />
      </div>
    </div>
  );
}

export default ErrorView;
