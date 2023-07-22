import PropTypes from "prop-types";

function Login({ handleGoogleLogin }) {
  return (
    <div className="flex flex-col items-center justify-center bg-stone-100 drop-shadow-md rounded-lg w-96 h-52">
      <div>
        <h2 className="text-center mb-4 text-3xl font-bold">DBX</h2>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="block mx-auto mb-2.5 border border-black rounded-md bg-black text-1xl w-52 h-10 text-zinc-200"
        >
          Login with Google
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="block mx-auto mb-4 border border-black w-52 rounded-md h-9 text-1xl"
        >
          Guest Mode
        </button>
        <p className="text-xs text-stone-400">
          Not your computer? Use Guest mode to sign in privately.
        </p>
      </div>
    </div>
  );
}

Login.propTypes = {
  handleGoogleLogin: PropTypes.func,
};

Login.defaultProps = {
  handleGoogleLogin: () => {},
};

export default Login;
