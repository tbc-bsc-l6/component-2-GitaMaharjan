import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import AboutUsPage from "./pages/AboutUsPage";
import SignInForm from "./components/Login/SignInForm";
import SignUpForm from "./components/Login/SIgnUpForm";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/aboutus",
        element: <AboutUsPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
        children: [
          {
            path: "/login/signin",
            element: <SignInForm />,
          },
          {
            path: "/login/signup",
            element: <SignUpForm />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
