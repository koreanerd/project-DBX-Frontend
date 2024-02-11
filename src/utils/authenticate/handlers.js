import {
  signInWithGoogle,
  signOutWithGoogle,
} from "@/utils/authenticate/googleAuth";
import { authenticateUser } from "@/apis/user";
import { setUser, clearUser } from "@/features/user/slice";

export const handleSignIn = async (dispatch, navigate) => {
  const googleSignInResult = await signInWithGoogle();

  if (googleSignInResult.error) {
    navigate("/error", { state: { error: googleSignInResult.error } });

    return;
  }

  const authenticateResult = await authenticateUser(googleSignInResult.token);

  if (authenticateResult.error) {
    navigate("/error", { state: { error: authenticateResult.error } });

    return;
  }

  dispatch(
    setUser({
      id: authenticateResult.user.id,
      email: authenticateResult.user.email,
      name: authenticateResult.user.name,
      uid: authenticateResult.user.uid,
      token: googleSignInResult.token,
      isInitialUser: authenticateResult.user.isInitialUser,
    }),
  );

  if (authenticateResult.user.isInitialUser === true) {
    navigate("/initial-resource-form", { state: { category: "Brand Logo" } });

    return;
  }

  navigate("/resource-list/BrandLogo");
};

export const handleSignOut = async (dispatch, navigate) => {
  await signOutWithGoogle();

  dispatch(clearUser());

  navigate("/");
};
