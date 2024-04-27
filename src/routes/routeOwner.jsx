import {
  HomeIcon,
  CakeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  
  export const routes = [
    //owner
    {
      layout : "dashboardOwner",
      pages : [
        {
          icon: <HomeIcon {...icon} />,
          name: "Dashboard",
          path: "/owner/home",
        },
        {
          icon: <FontAwesomeIcon icon={faMoneyBill} {...icon} />,
          name: "Gaji dan Bonus Pegawai",
          path: "/owner/gajiPegawai/read",
          pages: [ 
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "readgajipegawai",
              path: "/owner/gajiPegawai/add",
            },
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "editgajipegawai",
              path: "/owner/gajiPegawai/edit",
            },
          ],
        },
      ]
    }
  ];
  
  export default routes;
  