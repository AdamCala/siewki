import { Routes, Route } from "react-router-dom";
import Root from "./routes/root";
import Siewki from "./routes/siewki";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/siewki" element={<Siewki />} />
      </Routes>
    </>
  );
};

export default App;
