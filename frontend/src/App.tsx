import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminUsersPage } from "./components";

export const App = () => {
  //
  //
  return (
    <div className="App">
      <BrowserRouter>
        {
          <Routes>
            <Route path="/" element={<AdminUsersPage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        }
      </BrowserRouter>
    </div>
  );
};
