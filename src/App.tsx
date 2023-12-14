import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { auth } from "./config/firebase";

import Root from "./routes/root";
import Siewki from "./routes/siewki";
import AuthPage from "./routes/authPage";
import Profile from "./routes/profile";
import NotFound from "./routes/notFound";
import { useAppDispatch } from "./hooks/storeHook";
import { login } from "./features/authSlice";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.email)
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user?.photoURL || null,
          })
        );
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Root />} />
        <Route path="/siewki" element={<Siewki />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
