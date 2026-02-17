import { BrowserRouter, Route, Routes } from "react-router";
import ClassPage from "./features/ClassPage";
import GradePage from "./features/GradePage";
import TableGrades from "./features/TableGrades";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TableGrades />} />
        <Route path="/grade/:grade" element={<GradePage />} />
        <Route path="/grade/:grade/:letter" element={<ClassPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
