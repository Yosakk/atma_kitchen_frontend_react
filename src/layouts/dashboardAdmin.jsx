import { Outlet, useLocation } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "../widgets/layout";
import navbarRoutes from "../routes/routeData";
import navbarRoutesMo from "../routes/routeMO";
import navbarRoutesOwner from "../routes/routeOwner";

import { useMaterialTailwindController, setOpenConfigurator } from "../context";

const DashboardAdmin = ({children}) => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const location = useLocation();
  
  let sidebarRoutes = [];
  if (location.pathname.startsWith("/admin")) {
    sidebarRoutes = navbarRoutes;
  } else if (location.pathname.startsWith("/mo")) {
    sidebarRoutes = navbarRoutesMo;
  } else if (location.pathname.startsWith("/owner")) {
    sidebarRoutes = navbarRoutesOwner;
  }

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={sidebarRoutes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <div >
          {children ? children : <Outlet />}
        </div>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

DashboardAdmin.displayName = "/src/layouts/dashboard.jsx";

export default DashboardAdmin;
