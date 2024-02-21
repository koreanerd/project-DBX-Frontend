import NavigateButton from "@/components/buttons/NavigateButton";
import { useSelector } from "react-redux";
import useAuthState from "@/hooks/useAuthState";

function PausePoin() {
  const name = useSelector((state) => state.user.name);

  useAuthState();

  return (
    <div className="flex items-center flex-col justify-center w-screen h-screen text-center">
      <p className="my-2 text-2xl font-medium">Greetings to you, {name}!</p>

      <p className="my-2 text-lg">
        {`We are pleased to inform you that your file has been successfully registered.`}
        <br />
        {`Furthermore, we have also completed the creation of three categories`}
        <br />
        {`tailored just for you: `}
        <span className="font-bold">Brand Logo, Key Image, </span>
        and
        <span className="font-bold"> Icon!</span>
      </p>

      <NavigateButton
        path={`/resource-list/${encodeURIComponent("Brand Logo")}`}
        title={"Start"}
        className={
          "block mt-5 mb-2.5 border border-black rounded-md bg-black text-1xl w-52 h-10 text-zinc-200"
        }
      />
    </div>
  );
}

export default PausePoin;
