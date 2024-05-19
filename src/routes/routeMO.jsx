import {
  HomeIcon,
  CakeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faUserTie } from '@fortawesome/free-solid-svg-icons';

  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  
  export const routes = [
    //MO
    {
      layout: "dashboard",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "Dashboard",
          path: "/mo/home",
        },
        {
          icon: <FontAwesomeIcon icon={faUserTie} {...icon} />,
          name: "Pegawai",
          path: "/mo/pegawai/read",
          pages: [
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "readpegawai",
              path: "/mo/pegawai/add",
            },
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "editpegawai",
              path: "/mo/pegawai/edit",
            },
          ],
        },
        {
          icon: <UserGroupIcon {...icon} />,
          name: "Penitip",
          path: "/mo/penitip/read",
          pages: [
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "readpenitip",
              path: "/mo/penitip/add",
            },
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "editpenitip",
              path: "/mo/penitip/edit",
            },
          ],
        },
        {
          icon: <FontAwesomeIcon icon={faBox} {...icon} />,
          name: "Pembelian Bahan Baku",
          path: "/mo/pencatatanPembelianBahanBaku/read",
          pages: [
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "addpencatatanPembelianBahanBaku",
              path: "/mo/pencatatanPembelianBahanBaku/add",
            },
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "editpencatatanPembelianBahanBaku",
              path: "/mo/pencatatanPembelianBahanBaku/edit",
            },
          ],
        },
        {
          icon: <DocumentTextIcon {...icon} />,
          name: "Pengeluaran Lain",
          path: "/mo/pencatatanPengeluaranLain/read",
          pages: [
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "addpencatatanPengeluaranLain",
              path: "/mo/pencatatanPengeluaranLain/add",
            },
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "editpencatatanPengeluaranLain",
              path: "/mo/pencatatanPengeluaranLain/edit",
            },
          ],
        },
        {
          icon: <ClipboardDocumentListIcon {...icon} />,
          name: "Konfirmasi Pesanan",
          path: "/mo/konfirmasi/pesanan/read",
          pages: [
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "read Konfirmasi",
              path: "/mo/konfirmasi/pesanan/read",
            },
          ],
        },
      ],
    },
    //owner
  ];
  
  export default routes;
  