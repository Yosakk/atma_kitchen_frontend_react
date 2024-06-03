import {
  HomeIcon,
  CakeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { BanknotesIcon } from "@heroicons/react/24/outline";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/admin/home",
      },
      {
        icon: <CakeIcon {...icon} />,
        name: "Produk",
        path: "/admin/produk/read",
        pages: [
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "addProduk",
            path: "/admin/produk/add",
          },
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "editProduk",
            path: "/admin/produk/edit",
          },
        ],
      },
      // {
      //   icon: <ShoppingBagIcon {...icon} />,
      //   name: "Hampers",
      //   path: "/admin/hampers/read",
      //   pages: [
      //     {
      //       icon: <RectangleStackIcon {...icon} />,
      //       name: "addHampers",
      //       path: "/admin/hampers/add",
      //     },
      //     {
      //       icon: <RectangleStackIcon {...icon} />,
      //       name: "editHampers",
      //       path: "/admin/hampers/edit",
      //     },
      //   ],
      // },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Resep",
        path: "/admin/resep/read",
        pages: [
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "readResep",
            path: "/admin/resep/add",
          },
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "editResep",
            path: "/admin/resep/edit",
          },
        ],
      },
      {
        icon: <FontAwesomeIcon icon={faBox} {...icon} />,
        name: "Bahan Baku",
        path: "/admin/bahanBaku/read",
        pages: [
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "readbahanBaku",
            path: "/admin/bahanBaku/add",
          },
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "editbahanBaku",
            path: "/admin/bahanBaku/edit",
          },
        ],
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Pelanggan",
        path: "/admin/pelanggan/read",
        pages: [
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "readpelanggan",
            path: "/admin/pelanggan/add",
          },
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "editpelanggan",
            path: "/admin/pelanggan/edit",
          },
        ],
      },
      {
        icon: <ClipboardDocumentListIcon {...icon} />,
        name: "Input Jarak Pesanan",
        path: "/admin/pesanan/read",
        pages: [
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "readpesanan",
            path: "/admin/pesanan/read",
          },
        ],
      },
      {
        icon: <ClipboardDocumentListIcon {...icon} />,
        name: "Konfirmasi Pembayaran",
        path: "/admin/konfirmasi/read",
        pages: [
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "read Konfirmasi",
            path: "/admin/konfirmasi/read",
          },
        ],
      },
      {
        icon: <ClipboardDocumentListIcon {...icon} />,
        name: "Pesanan Diproses",
        path: "/admin/pesananDiproses/read",
        pages: [
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "Pesanan Diproses",
            path: "/admin/pesananDiproses/read",
          },
        ],
      },
      {
        icon: <ClipboardDocumentListIcon {...icon} />,
        name: "Pesanan Dikirim",
        path: "/admin/pesananDikirim/read",
        pages: [
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "Pesanan Dikirim",
            path: "/admin/pesananDikirim/read",
          },
        ],
      },
      {
        icon: <BanknotesIcon {...icon} />,
        name: "Penarikan Saldo",
        path: "/admin/saldo/read",
        pages: [
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "readsaldo",
            path: "/admin/saldo/add",
          },
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "editsaldo",
            path: "/admin/saldo/edit",
          },
        ],
      },
    ],
  },
];

export default routes;
