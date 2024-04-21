import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/customer/ProfilePage";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
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
  