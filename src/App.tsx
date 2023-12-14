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

/**
 * Main component representing the application.
 * Manages user authentication state and renders different pages based on the route.
 * Utilizes React Router for routing and Redux for state management.
 */
const App = () => {
  const dispatch = useAppDispatch();

  /**
   * Effect hook to subscribe to authentication state changes.
   * Dispatches a login action when a user is authenticated.
   * @returns {Function} Unsubscribe function to clean up the subscription.
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.email) {
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user?.photoURL || null,
          })
        );
      }
    });

    // Cleanup function to unsubscribe when the component is unmounted
    return () => unsubscribe();
  }, [dispatch]);

  /**
   * Renders the main application structure with React Router handling routes.
   * Includes placeholders for different pages based on the route.
   * @returns {JSX.Element} The JSX element representing the application structure.
   */
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
