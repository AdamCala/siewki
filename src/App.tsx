import { Routes, Route } from "react-router-dom";
import Root from "./routes/root";
import Siewki from "./routes/siewki";
import AuthPage from "./routes/authPage";
import Profile from "./routes/profile";
import NotFound from "./routes/notFound";

const App = () => {
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
