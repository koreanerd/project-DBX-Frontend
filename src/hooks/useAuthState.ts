import { getAuth } from "firebase/auth";
import app from "@/config/firebaseConfig";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "@/features/user/slice";
import { getMyInformation } from "@/apis/users";

const useAuthState = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        dispatch(clearUser());

        return;
      }

      const token = await user.getIdToken();
      const result = await getMyInformation(token);

      if (result.error) {
        console.error(result.error);

        return;
      }

      dispatch(
        setUser({
          id: result._id,
          email: result.email,
          name: result.name,
          uid: result.uid,
          token: token,
          isInitialUser: result.isInitialUser,
          categoryIds: result.categoryIds,
        }),
      );
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuthState;
