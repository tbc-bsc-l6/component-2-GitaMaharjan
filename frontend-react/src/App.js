import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import AboutUsPage from "./pages/AboutUsPage";

import LoginPage from "./pages/LoginPage";
import SignUpForm from "./components/Login/SignUpForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "aboutus",
//         element: <AboutUsPage />,
//       },
//       {
//         path: "login",
//         element: <LoginPage />,
//         children: [
//           {
//             path: "signup",
//             element: <SignUpForm />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

function App() {
  return (
    // return <RouterProvider router={router} />;
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
