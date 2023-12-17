import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import AboutUsPage from "./pages/AboutUsPage";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
