import React from "react";
import imgLogo from "../assets/images/img0.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ShoppingCartIcon,
  MapPinIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

const navListMenuItems = [
  {
    title: "Akun Profile",
    description: "Halaman untuk mengedit akun Anda.",
    icon: UserIcon,
  },
  {
    title: "Pesanan Saya",
    description: "Ayo lihat pesana Anda!",
    icon: ShoppingCartIcon,
  },
  {
    title: "Alamat Saya",
    description: "Atur alamat anda untuk mendapatkan data akurat.",
    icon: MapPinIcon,
  },
  {
    title: "Logout",
    description: "Sampai jumpa kembali",
    icon: PowerIcon,
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="white"
              className="flex items-center text-sm font-bold md:text-white lg:text-blue-gray-900"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-300 lg:text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    ),
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-white"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Profile
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="white"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">Beranda</ListItem>
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="white"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <div className="flex">
            <FontAwesomeIcon icon={faBell} className="pr-2" />
            <a href="#" className="flex items-center">
              Notifikasi
            </a>
          </div>
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="white"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <div className="flex">
            <FontAwesomeIcon icon={faShoppingCart} className="pr-2" />
            <Link to="/register" className="flex items-center">
              Keranjang
            </Link>
          </div>
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="white"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Catalogue
        </ListItem>
      </Typography>
      <div className="block lg:hidden">
        <NavListMenu />
      </div>

    </List>
  );
}

const NavbarLogin = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [loginVariant, setLoginVariant] = React.useState("text");
  const [signupVariant, setSignupVariant] = React.useState("text");

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const handleLoginClick = () => {
    setLoginVariant("gradient");
    setSignupVariant("text");
  };

  const handleSignupClick = () => {
    setSignupVariant("gradient");
    setLoginVariant("text");
  };

  return (
    <Navbar className="mx-auto max-w-full border-none rounded-none px-4 py-2" style={{ backgroundColor: "#232323" }}>
      <div className="flex items-center justify-between text-white">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
          style={{ backgroundImage: `url(${imgLogo})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", width: "150px", height: "40px" }}
        ></Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <Link to="/login" onClick={handleLoginClick}>
            <Button
              variant={loginVariant}
              size="sm"
              color={"white"}
            >
              Log In
            </Button>
          </Link>
          <Link to="/register" onClick={handleSignupClick}>
            <Button
              variant={signupVariant}
              size="sm"
              color={"white"}
            >
              Sign Up
            </Button>
          </Link>
        </div>

        <IconButton
          variant="text"
          color="white"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Link to="/login" onClick={handleLoginClick} className="w-full">
            <Button
              variant={loginVariant}
              size="sm"
              color={ "white"}
              fullWidth
            >
              Log In
            </Button>
          </Link>
          <Link to="/register" onClick={handleSignupClick} className="w-full"> 
            <Button
              variant={signupVariant}
              size="sm"
              color={"white"}
              fullWidth
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default NavbarLogin;
