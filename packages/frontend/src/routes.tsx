import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import IndexPage from "./pages/index";
import ClaimsMinePage from "./pages/claims-mine";
import UploadPage from "./pages/upload";
import SignInPage from "./pages/sign-in";
import LogoutPage from "./pages/logout";
import NotFoundPage from "./pages/error/NotFound";
import AuthGuard from "~/guards/AuthGuard";

const router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
      },
      {
        path: "/claims",
        element: <AuthGuard />,
        children: [
          {
            path: "upload",
            element: <UploadPage />,
          },
          {
            path: "mine",
            element: <ClaimsMinePage />,
          },
        ],
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
