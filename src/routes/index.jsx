import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useRoutes } from "react-router-dom";
//customer
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/customer/ProfilePage";
import EditProfilePage from "../pages/customer/EditProfilePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import HomePage from "../pages/customer/HomePage";
import KatalogPage from "../pages/customer/KatalogPage";
import KeranjangPage from "../pages/customer/KeranjangPage";

//admin
import DashboardAdmin from "../layouts/dashboardAdmin";
import NotFound from "../components/notFound";
// import DashboardMo from "../layouts/dashboardMo";
import HomeAdmin from "../pages/admin/home";

import ReadProduk from "../pages/admin/produk/readProduk";
import AddProduk from "../pages/admin/produk/addProduk";
import EditProduk from "../pages/admin/produk/editProduk";

// import ReadHampers from "../pages/admin/product/hampers/readHampers";
import AddHampers from "../pages/admin/produk/hampers/addHampers";
import EditHampers from "../pages/admin/produk/hampers/editHampers";

import ReadResep from "../pages/admin/resep/readResep";
import AddResep from "../pages/admin/resep/addResep";
import EditResep from "../pages/admin/resep/editResep";

import ReadBahanBaku from "../pages/admin/bahanBaku/readBahanBaku";
import AddBahanBaku from "../pages/admin/bahanBaku/addBahanBaku";
import EditBahanBaku from "../pages/admin/bahanBaku/editbahanBaku";

import ReadPelanggan from "../pages/admin/pelanggan/readPelanggan";
import ProfilePagePelanggan from "../pages/admin/pelanggan/ProfilePage";
//MO
import ReadPegawai from "../pages/mo/pegawai/readPegawai";
import AddPegawai from "../pages/mo/pegawai/addPegawai";
import EditPegawai from "../pages/mo/pegawai/editPegawai";
import ProfilePagePegawai from "../pages/mo/pegawai/ProfilePage";

import ReadPenitip from "../pages/mo/penitip/readPenitip";
import AddPenitip from "../pages/mo/penitip/addPenitip";
import EditPenitip from "../pages/mo/penitip/editPenitip";

import ReadPencatatanPembelianBahanBaku from "../pages/mo/pencatatan/readPencatatanPembelianBahanBaku";
import AddPembelianBahanBaku from "../pages/mo/pencatatan/addPembelianBahanBaku";
import EditPembelianBahanBaku from "../pages/mo/pencatatan/editPembelianBahanBaku";

import ReadPencatatanPengeluaranLain from "../pages/mo/pencatatan/readPencatatanPengeluaranLain";
import AddPencatatanPengeluaranLain from "../pages/mo/pencatatan/addPencatatanPengeluaranLain";
import EditPencatatanPengeluaranLain from "../pages/mo/pencatatan/editPencatatanPengeluaranLain";
//owner
import ReadGajiPegawai from "../pages/owner/pegawai/readGajiPegawai";
import EditGajiPegawai from "../pages/owner/pegawai/editGajiPegawai";



const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound/>,
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
        path : "/admin/produk/read",
        element : <ReadProduk />
      },
      {
        path : "/admin/produk/add",
        element : <AddProduk/>
      },
      {
        path : "/admin/produk/edit",
        element : <EditProduk/>
      },
      // {
      //   path : "/admin/hampers/read",
      //   element : <ReadHampers />
      // },
      {
        path : "/admin/hampers/add",
        element : <AddHampers/>
      },
      {
        path : "/admin/hampers/edit/:id",
        element : <EditHampers/>
      },
      {
        path : "/admin/resep/read",
        element : <ReadResep />
      },
      {
        path : "/admin/resep/add",
        element : <AddResep />
      },
      {
        path : "/admin/resep/edit",
        element : <EditResep />
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
        path : "/admin/bahanBaku/edit/:id",
        element : <EditBahanBaku/>
      },
      {
        path : "/admin/pelanggan/read",
        element : <ReadPelanggan />
      },
      {
        path : "/admin/pelanggan/profile/:id",
        element : <ProfilePagePelanggan />
      },
      {
        path : "/admin/pegawai/profile",
        element : <ProfilePagePegawai />
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
        path : "/mo/pegawai/add",
        element : <AddPegawai />
      },
      {
        path : "/mo/pegawai/edit/:id",
        element : <EditPegawai />
      },
      {
        path : "/mo/pegawai/profile",
        element : <ProfilePagePegawai />
      },
      {
        path : "/mo/penitip/read",
        element : <ReadPenitip />
      },
      {
        path : "/mo/penitip/add",
        element : <AddPenitip />
      },
      {
        path : "/mo/penitip/edit/:id",
        element : <EditPenitip />
      },
      {
        path : "/mo/pencatatanPembelianBahanBaku/read",
        element : <ReadPencatatanPembelianBahanBaku />
      },
      {
        path : "/mo/pencatatanPembelianBahanBaku/add",
        element : <AddPembelianBahanBaku />
      },
      {
        path : "/mo/pencatatanPembelianBahanBaku/edit/:id",
        element : <EditPembelianBahanBaku />
      },
      {
        path : "/mo/pencatatanPengeluaranLain/read",
        element : <ReadPencatatanPengeluaranLain />
      },
      {
        path : "/mo/pencatatanPengeluaranLain/add",
        element : <AddPencatatanPengeluaranLain />
      },
      {
        path : "/mo/pencatatanPengeluaranLain/edit/:id",
        element : <EditPencatatanPengeluaranLain />
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
      {
        path : "/owner/gajiPegawai/edit/:id",
        element : <EditGajiPegawai />
      },
      {
        path : "/owner/pegawai/profile",
        element : <ProfilePagePegawai />
      },       
    ]
  },
  {
    children: [
      {
        path: "/",
        element: <HomePage />,
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
        path: "/customer/profile/edit/:id",
        element: <EditProfilePage />
      },
      {
        path: "/forgot/password",
        element: <ForgotPasswordPage />
      },
      {
        path: "/home",
        element: <HomePage />
      },
      {
        path: "/catalogue",
        element: <KatalogPage />
      },
      {
        path: "/keranjang",
        element: <KeranjangPage />
      },
      // {
      //   path: "/catalogue/produk",
      //   element: <ProdukPage />
      // },
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
  