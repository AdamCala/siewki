import { Routes, Route } from "react-router-dom";
import Root from "./routes/root";
import Siewki from "./routes/siewki";
import Auth from "./routes/auth";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/siewki" element={<Siewki />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
};

export default App;
