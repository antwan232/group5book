import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./authSlice";

export default function ClerkAuthListener() {
  const { user, isSignedIn } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignedIn) {
      dispatch(
        setUser({
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          imageUrl: user.imageUrl,
        })
      );
    } else {
      dispatch(clearUser());
    }
  }, [isSignedIn, user, dispatch]);

  return null;
}
