import { createBrowserRouter, RouterProvider } from "react-router-dom";

//customer
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/customer/ProfilePage";
import EditProfilePage from "../pages/customer/EditProfilePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import HomePage from "../pages/customer/HomePage";

//admin
import DashboardAdmin from "../layouts/dashboardAdmin";
// import DashboardMo from "../layouts/dashboardMo";
import HomeAdmin from "../pages/admin/home";

import ReadProduct from "../pages/admin/product/readProduct";
import ReadHampers from "../pages/admin/hampers/readHampers";
import ReadResep from "../pages/admin/resep/readResep";
import ReadBahanBaku from "../pages/admin/bahanBaku/readBahanBaku";
import AddBahanBaku from "../pages/admin/bahanBaku/addBahanBaku";
import EditBahanBaku from "../pages/admin/bahanBaku/editbahanBaku";
import ReadPelanggan from "../pages/admin/pelanggan/readPelanggan";
//MO
import ReadPegawai from "../pages/mo/pegawai/readPegawai";
import ReadPenitip from "../pages/mo/penitip/readPenitip";
import ReadPencatatanPembelianBahanBaku from "../pages/mo/pencatatan/readPencatatanPembelianBahanBaku";
import ReadPencatatanPengeluaranLain from "../pages/mo/pencatatan/readPencatatanPengeluaranLain";
//owner
import ReadGajiPegawai from "../pages/owner/pegawai/readGajiPegawai";




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
        path : "/admin",
        element : <HomeAdmin />
      },
      {
        path : "/admin/home",
        element : <HomeAdmin />
      },
      {
        path : "/admin/product/read",
        element : <ReadProduct />
      },
      {
        path : "/admin/hampers/read",
        element : <ReadHampers />
      },
      {
        path : "/admin/resep/read",
        element : <ReadResep />
      },
      {
        path : "/admin/bahanBaku/read",
        element : <ReadBahanBaku />
      },
      {
        path : "/admin/bahanBaku/add",
        element : <AddBahanBaku/>
      },
      {
        path : "/admin/bahanBaku/edit",
        element : <EditBahanBaku/>
      },
      {
        path : "/admin/pelanggan/read",
        element : <ReadPelanggan />
      },
      
    ]
  },
  {
    path: "/mo",
    element: <DashboardAdmin />,
    children : [
      {
        path : "/mo",
        element : <HomeAdmin />
      },
      {
        path : "/mo/home",
        element : <HomeAdmin />
      },
      {
        path : "/mo/pegawai/read",
        element : <ReadPegawai />
      },
      {
        path : "/mo/penitip/read",
        element : <ReadPenitip />
      },
      {
        path : "/mo/pencatatanPembelianBahanBaku/read",
        element : <ReadPencatatanPembelianBahanBaku />
      },
      {
        path : "/mo/pencatatanPengeluaranLain/read",
        element : <ReadPencatatanPengeluaranLain />
      },           
    ]
  },
  {
    path: "/owner",
    element: <DashboardAdmin />,
    children : [
      {
        path : "/owner",
        element : <HomeAdmin />
      },
      {
        path : "/owner/home",
        element : <HomeAdmin />
      },
      {
        path : "/owner/gajiPegawai/read",
        element : <ReadGajiPegawai />
      },    
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
  