import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import imgLogo from "../assets/images/img0.png";

const SideNav = () => {
    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-lg ">
            <div className="mb-2 flex items-center gap-4 p-4">
                <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
                <Typography variant="h5" color="blue-gray">
                    Atma Kitchen
                </Typography>
            </div>
            <List>
                <ListItem>
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Alamat Saya
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <ShoppingBagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Pesanan Saya
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <InboxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Pemberitahuan
                    <ListItemSuffix>
                        <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                    </ListItemSuffix>
                </ListItem>
                <ListItem >
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
