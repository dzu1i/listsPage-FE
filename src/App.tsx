import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ListDetailPage from "./lists/ListDetailPage";

export default function App() {
  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <div className="card">
              <h1>Shopping Lists</h1>
              <p>Demo: open the sample list.</p>
              <Link className="btn" to="/lists/groceries">Open “Groceries”</Link>
            </div>
          }
        />
        <Route path="/lists/:listId" element={<ListDetailPage />} />
      </Routes>
    </div>
  );
}
