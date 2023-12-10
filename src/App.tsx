import { Routes, Route } from "react-router-dom";
import Root from "./routes/root";
import Siewki from "./routes/siewki";
import AuthPage from "./routes/authPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/siewki" element={<Siewki />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
};

export default App;
