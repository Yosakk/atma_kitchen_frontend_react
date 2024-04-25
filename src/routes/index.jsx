import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/customer/ProfilePage";
import EditProfilePage from "../pages/customer/EditProfilePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import HomePage from "../pages/customer/HomePage";
import DashboardAdmin from "../layouts/dashboard";
import HomeAdmin from "../pages/dashboard/home";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
  },
  {
    path: "/admin",
    element: <DashboardAdmin />,
    children : [
      {
        path : "/admin/home",
        element : <HomeAdmin />
      }
    ]
  },
  {
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },  
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/customer/profile",
        element: <ProfilePage />
      },
      {
        path: "/customer/profile/edit",
        element: <EditProfilePage />
      },
      {
        path: "/forgot/password",
        element: <ForgotPasswordPage />
      },
      {
        path: "/home",
        element: <HomePage />
      }
    ],
  },
]);
const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default AppRouter;
  