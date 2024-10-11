import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/layout/Layout";
import PrivateLayout from "./components/layout/PrivateLayout";
import Home from "./views/Home";
import SnippetLibrary from "./views/SnippetLibrary";
import SnippetList from "./views/SnippetList";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>

          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <PrivateLayout />  {/* Diferente Layout */}
              </ProtectedRoute>
            }
          >
            <Route index element={<SnippetLibrary />} />
            <Route path="snippets" element={<SnippetList />} />
          </Route>
            
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
