import AuthenticationButton from "@/components/buttons/AuthenticationButton";
import { handleSignIn } from "@/utils/authenticate/handlers";

function LandingPage() {
  return (
    <main>
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center justify-center bg-stone-100 drop-shadow-md rounded-lg w-96 h-40">
          <h2 className="text-center mb-4 text-3xl font-bold">DBX</h2>

          <AuthenticationButton
            handler={handleSignIn}
            title="Login with Google"
            className="block mx-auto mb-2.5 border border-black rounded-md bg-black text-1xl w-52 h-10 text-zinc-200"
            ariaLabel="Login button"
          />
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
