import React, { useState, useEffect } from "react";
import imgLogo from "../assets/images/img0.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faShoppingCart,
  faHouse,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { showDataCustomer } from "../api/customer/customerApi";
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
  Avatar,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ShoppingCartIcon,
  MapPinIcon,
  PowerIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import useRefresh from "../services/useRefresh";

const navListMenuItems = [
  {
    title: "Akun Profile",
    description: "Halaman untuk mengedit akun Anda.",
    icon: UserIcon,
  },
  {
    title: "Pesanan Saya",
    description: "Ayo lihat pesanan Anda!",
    icon: ShoppingCartIcon,
  },
  {
    title: "Pemberitahuan",
    description: "Ayo lihat pemberitahuan Anda!",
    icon: BellIcon,
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
    ({ icon, title, description, path }, key) => (
      <a key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
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
    )
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
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
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

function NavlistNotLogin() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography as="a" variant="small" color="white" className="font-medium">
        <Link to="/home" className="flex items-center">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <div className="flex">
              <FontAwesomeIcon icon={faHouse} className="pr-2" />
              Beranda
            </div>
          </ListItem>
        </Link>
      </Typography>
      <Typography as="a" variant="small" color="white" className="font-medium">
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <div className="flex">
            <FontAwesomeIcon icon={faBagShopping} className="pr-2" />
            <Link to="/catalogue" className="flex items-center">
              Catalogue
            </Link>
          </div>
        </ListItem>
      </Typography>
    </List>
  );
}

function NavList() {
  const [cartTotal, setCartTotal] = useState(0);
  const refresh = useRefresh("cartUpdated");

  useEffect(() => {
    const updateCartTotal = () => {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      if (cartItems) {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartTotal(totalItems);
      } else {
        setCartTotal(0);
      }
    };

    // Panggil updateCartTotal saat komponen pertama kali di-mount dan setiap kali terjadi perubahan pada keranjang
    updateCartTotal();
  }, [refresh]);
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography as="a" variant="small" color="white" className="font-medium">
        <Link to="/home" className="flex items-center">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <div className="flex">
              <FontAwesomeIcon icon={faHouse} className="pr-2" />
              Beranda
            </div>
          </ListItem>
        </Link>
      </Typography>
      <Typography as="a" variant="small" color="white" className="font-medium">
        <Link to="/catalogue" className="flex items-center">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <div className="flex">
              <FontAwesomeIcon icon={faBagShopping} className="pr-2" />
              Catalogue
            </div>
          </ListItem>
        </Link>
      </Typography>
      <Typography as="a" variant="small" color="white" className="font-medium">
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <div className="flex">
            <FontAwesomeIcon icon={faBell} className="pr-2" />
            <a className="flex items-center">Notifikasi</a>
          </div>
        </ListItem>
      </Typography>
      <Typography as="a" variant="small" color="white" className="font-medium">
        <Link to="/keranjang" className="flex items-center">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <div className="flex">
              <FontAwesomeIcon icon={faShoppingCart} className="pr-2" />
              Keranjang
            </div>
            {cartTotal > 0 && (
              <span className="bg-blue-500 text-white text-xs rounded-full px-1">
                {cartTotal}
              </span>
            )}
          </ListItem>
        </Link>
      </Typography>
      
      {/* <div className="block lg:hidden">
        <NavListMenu />
      </div> */}
    </List>
  );
}

const NavbarLogin = () => {
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [openNav, setOpenNav] = React.useState(false);
  const [loginVariant, setLoginVariant] = React.useState("text");
  const [signupVariant, setSignupVariant] = React.useState("text");
  const [userData, setUserData] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      showDataCustomer()
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    };
    fetchData();
  }, []);

  const handleSignOut = () => {
    console.log("logout");
    localStorage.removeItem("cart"); // Menghapus data dari sessionStorage
    localStorage.removeItem("kategori");
    // const cart = localStorage.getItem("cart"); // Menghapus data dari sessionStorage
    // console.log(cart)
    sessionStorage.removeItem("isLogin");

    // Emit event untuk memberi tahu perubahan pada keranjang
    window.dispatchEvent(new Event("cartUpdated"));
  };

  React.useEffect(() => {
    setIsLoggedInUser(sessionStorage.getItem("isLogin"));
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
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
    <Navbar
      className="mx-auto max-w-full border-none rounded-none px-4 py-2 fixed top-0 z-50"
      style={{ backgroundColor: "#232323" }}
    >
      <div className="flex items-center justify-between text-white">
        <Typography
          as="a"
          className="mr-4 cursor-pointer py-1.5 font-medium"
          style={{
            backgroundImage: `url(${imgLogo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            width: "150px",
            height: "40px",
          }}
        />
        <div className="hidden lg:block">
          {isLoggedInUser ? <NavList /> : <NavlistNotLogin />}
        </div>
        <div className="hidden gap-2 lg:flex">
          {isLoggedInUser ? (
            <Menu>
              <Typography
                variant="small"
                className="flex font-medium justify-center items-center"
              >
                {userData?.username}
              </Typography>
              <MenuHandler>
                <Avatar
                  variant="circular"
                  alt="tania andrew"
                  className="cursor-pointer w-9 h-9"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
              </MenuHandler>
              <MenuList>
                <MenuItem className="flex items-center gap-2">
                  <Link to="/customer/profile">
                    <div className="flex ">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10 5C10 5.53043 9.78929 6.03914 9.41421 6.41421C9.03914 6.78929 8.53043 7 8 7C7.46957 7 6.96086 6.78929 6.58579 6.41421C6.21071 6.03914 6 5.53043 6 5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5ZM8 9C7.0426 8.99981 6.10528 9.27449 5.29942 9.7914C4.49356 10.3083 3.85304 11.0457 3.454 11.916C4.01668 12.5706 4.71427 13.0958 5.49894 13.4555C6.28362 13.8152 7.13681 14.0009 8 14C8.86319 14.0009 9.71638 13.8152 10.5011 13.4555C11.2857 13.0958 11.9833 12.5706 12.546 11.916C12.147 11.0457 11.5064 10.3083 10.7006 9.7914C9.89472 9.27449 8.9574 8.99981 8 9Z"
                          fill="#90A4AE"
                        />
                      </svg>

                      <Typography variant="small" className="font-medium ml-2">
                        My Profile
                      </Typography>
                    </div>
                  </Link>
                </MenuItem>
                <hr className="my-2 border-blue-gray-50" />
                <MenuItem className="flex ">
                  <Link to="/login" onClick={handleSignOut}>
                    <div className="flex ">
                      <PowerIcon className="h-5 w-5 mr-1" color="red" />
                      <Typography
                        variant="small"
                        color="red"
                        className="font-medium"
                      >
                        Sign Out
                      </Typography>
                    </div>
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Link to="/login" onClick={handleLoginClick}>
                <Button variant={loginVariant} size="sm" color={"white"}>
                  Log In
                </Button>
              </Link>
              <Link to="/register" onClick={handleSignupClick}>
                <Button variant={signupVariant} size="sm" color={"white"}>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
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
        {isLoggedInUser ? <NavList /> : <NavlistNotLogin />}{" "}
        {/* ganti kondisi ini sesudah perbaiki */}
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          {isLoggedInUser ? (
            <>
              <Link to="/login" onClick={handleSignOut} className="w-full">
                <Button
                  variant={loginVariant}
                  size="sm"
                  color={"white"}
                  fullWidth
                >
                  Log Out
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={handleLoginClick} className="w-full">
                <Button
                  variant={loginVariant}
                  size="sm"
                  color={"white"}
                  fullWidth
                >
                  Log In
                </Button>
              </Link>
              <Link
                to="/register"
                onClick={handleSignupClick}
                className="w-full"
              >
                <Button
                  variant={signupVariant}
                  size="sm"
                  color={"white"}
                  fullWidth
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
};

export default NavbarLogin;
