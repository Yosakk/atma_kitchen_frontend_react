import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    IconButton,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    InboxIcon,
    PowerIcon,
    XMarkIcon,
    Bars3Icon,
} from "@heroicons/react/24/solid";

const SideNav = ({ activeItem, handleItemClick, isMobileMenuOpen, toggleMobileMenu }) => {
    return (
        <Card className={`w-full max-w-[20rem] p-4 shadow-lg ${isMobileMenuOpen ? 'fixed top-0 left-0 bottom-0 z-50 bg-white' : 'hidden lg:block'}`}>
            {isMobileMenuOpen && (
                <div className="flex justify-end p-4">
                    <IconButton
                        variant="text"
                        color="black"
                        onClick={toggleMobileMenu}
                    >
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    </IconButton>
                </div>
            )}
            <div className="mb-2 flex items-center gap-4 p-4">
                <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
                <Typography variant="h5" color="blue-gray">
                    Atma Kitchen
                </Typography>
            </div>
            <List>
                <ListItem onClick={() => handleItemClick("Alamat Saya")} active={activeItem === "Alamat Saya"}>
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Alamat Saya
                </ListItem>
                <ListItem onClick={() => handleItemClick("Pesanan Saya")} active={activeItem === "Pesanan Saya"}>
                    <ListItemPrefix>
                        <ShoppingBagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Pesanan Saya
                </ListItem>
                <ListItem onClick={() => handleItemClick("Pemberitahuan")} active={activeItem === "Pemberitahuan"}>
                    <ListItemPrefix>
                        <InboxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Pemberitahuan
                    <ListItemSuffix>
                        <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                    </ListItemSuffix>
                </ListItem>
                <ListItem onClick={() => handleItemClick("Log Out")} active={activeItem === "Log Out"}>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" color="red"/>
                    </ListItemPrefix>
                    <Typography variant="paragraph" color="red">Log Out</Typography>
                </ListItem>
            </List>
        </Card>
    );
}

export default SideNav;