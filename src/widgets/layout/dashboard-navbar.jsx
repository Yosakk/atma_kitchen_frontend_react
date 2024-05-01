import { useLocation, Link } from "react-router-dom";
import { Navbar, Typography, Button, IconButton, Breadcrumbs } from "@material-tailwind/react";
import { UserCircleIcon, Bars3Icon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenSidenav } from "../../context";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [, role, page] = pathname.split("/");

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5" : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""}`}
          >
            <Link to={`/${role}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {role}
              </Typography>
            </Link>
            <Typography variant="small" color="blue-gray" className="font-normal">
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Link to={`/${role}/pegawai/profile`}>
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-2 xl:flex normal-case"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              {role === "admin" ? "Admin" : role.toUpperCase()} {/* ganti disini kalau mau diganti jadi username yang aktif */}
            </Button>
            <IconButton variant="text" color="blue-gray" className="grid xl:hidden">
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </Link>
          <Link to="/login">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex normal-case"
            >
              <ArrowLeftEndOnRectangleIcon className="h-5 w-5 text-blue-gray-500" />
              Log Out
            </Button>
            <IconButton variant="text" color="blue-gray" className="grid xl:hidden">
              <ArrowLeftEndOnRectangleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}

export default DashboardNavbar;
