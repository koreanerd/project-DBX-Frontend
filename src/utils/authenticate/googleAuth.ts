import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from "firebase/auth";
import app from "@/config/firebaseConfig";

interface SignInSuccessResult {
  user: User;
  token: string;
}

interface SignInFailureResult {
  error: string;
}

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<
  SignInSuccessResult | SignInFailureResult
> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    return { user: result.user, token };
  } catch (error) {
    console.error(error);

    const errorMessage =
      error instanceof Error ? error.message : "Google sign-in failed";

    return { error: errorMessage };
  }
};

export const signOutWithGoogle = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);

    throw new Error(error.message || "Sign-out failed");
  }
};
