import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "./App";
import JobDetailsPage from "./pages/JobDetails";
import PostJobPage from "./pages/PostJob";

const routerInstance = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/jobDetails/:id",
    element: <JobDetailsPage/>
  },
  {
    path: "/postJob",
    element: <PostJobPage/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routerInstance}/>
  </StrictMode>
);