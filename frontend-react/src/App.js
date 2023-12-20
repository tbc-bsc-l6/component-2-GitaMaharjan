import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Customer/Root";
import ErrorPage from "./pages/ErrorPage";
import AboutUsPage from "./pages/Customer/AboutUsPage";

import LoginPage from "./pages/Customer/LoginPage";
import SignUpForm from "./components/Login/SignUpForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Customer/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
