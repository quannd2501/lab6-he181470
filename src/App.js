import { BrowserRouter, Routes, Route } from "react-router-dom";
import SubjectList from "./SubjectList";
import SubjectDetail from "./SubjectDetail";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/syllabus" element={<SubjectList />} />

        <Route
          path="/subject/:id"
          element={<SubjectDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;