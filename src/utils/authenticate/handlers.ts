import { Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";
import {
  signInWithGoogle,
  signOutWithGoogle,
} from "@/utils/authenticate/googleAuth";
import { authenticateUser } from "@/apis/users";
import { setUser, clearUser } from "@/features/user/slice";

interface Category {
  name: string;
  id: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  uid: string;
  token: string;
  isInitialUser: boolean;
  categoryIds: Category[];
}

interface GoogleSignInResult {
  error?: string;
  token?: string;
}

interface AuthenticateResult {
  error?: string;
  user?: User;
}

interface NavigationState {
  category: string;
}

interface ErrorState {
  error: string;
}

export const handleSignIn = async (
  dispatch: Dispatch,
  navigate: NavigateFunction,
) => {
  const googleSignInResult: GoogleSignInResult = await signInWithGoogle();

  if (googleSignInResult.error) {
    navigate("/error", {
      state: { error: googleSignInResult.error } as ErrorState,
    });

    return;
  }

  const authenticateResult: AuthenticateResult = await authenticateUser(
    googleSignInResult.token,
  );

  if (authenticateResult.error) {
    navigate("/error", {
      state: { error: authenticateResult.error } as ErrorState,
    });

    return;
  }

  if (authenticateResult.user) {
    dispatch(
      setUser({
        id: authenticateResult.user.id,
        email: authenticateResult.user.email,
        name: authenticateResult.user.name,
        uid: authenticateResult.user.uid,
        token: googleSignInResult.token,
        isInitialUser: authenticateResult.user.isInitialUser,
        categoryIds: authenticateResult.user.categoryIds,
      }),
    );

    if (authenticateResult.user.isInitialUser === true) {
      navigate("/initial-resource-form", {
        state: { category: "Brand Logo" } as NavigationState,
      });

      return;
    }
  }

  navigate(`/resource-list/${encodeURIComponent("Brand Logo")}`);
};

export const handleSignOut = async (
  dispatch: Dispatch,
  navigate: NavigateFunction,
) => {
  await signOutWithGoogle();

  dispatch(clearUser());

  navigate("/");
};
