import React, { useState } from 'react';
import NavbarLogin from "../../components/NavbarLogin"
import FooterUser from "../../components/Footer"
import { useCountries } from "use-react-countries";
import { motion } from 'framer-motion';
import {
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Typography,
    Popover,
    PopoverHandler,
    Select,
    Option,
    PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const EditProfilePage = () => {
    const { countries } = useCountries();
    const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
    const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));
    const { name, flags, countryCallingCode } = sortedCountries[selectedCountryIndex];
    const [date, setDate] = React.useState();
    const [errors, setErrors] = useState({});
    const [country, setCountry] = React.useState(0);
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [profileImage, setProfileImage] = useState('')

    const checkPasswordStrength = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (passwordRegex.test(password)) {
            setPasswordStrength('strong');
        } else if (password.length >= 8) {
            setPasswordStrength('middle');
        } else {
            setPasswordStrength('low');
        }
    };
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    };


    // Fungsi handleSubmit untuk menangani submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col min-h-screen" style={{backgroundColor: "#FFC655"}}>
            <NavbarLogin />
            <div className="flex-grow flex justify-center">
                <div className="border w-full  m-10 p-2 pt-6 pb-6 rounded-lg bg-white shadow-md p-4" >
                    <div className="flex justify-center items-center md:row-span-2 mb-5">
                        <label htmlFor="profileImage" className="relative cursor-pointer">
                            <motion.img
                                src={profileImage || "https://docs.material-tailwind.com/img/face-2.jpg"}
                                alt="avatar"
                                className="relative inline-block p-1 ring-2 ring-indigo-300 dark:ring-indigo-500 h-[210px] w-[210px] md:w-[180px] md:h-[180px] lg:w-[150px] lg:h-[150px] rounded-full object-cover object-center"
                                whileHover={{ scale: 1.1 }}
                            />
                            <input
                                type="file"
                                id="profileImage"
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <span className="absolute inset-0 flex justify-center items-center w-full h-full text-white text-opacity-0 hover:text-opacity-100 transition-opacity duration-300">
                                Ubah Foto Profile
                            </span>
                        </label>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="mb-2">
                                <label htmlFor="username" className=" block mb-2 text-sm font-medium text-gray-900">Username</label>
                                <Input type='text' size="lg" label="Username" className=' w-sm' placeholder='Joexx01' required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">Nama Lengkap</label>
                                <Input type='text' size="lg" label="Nama Lengkap" className='' placeholder='Joe Biden Kece' required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                                <Input type='email' size="lg" label="Email" className='' placeholder='Joe.Hoe@gmail.com' required />
                            </div>
                            <div className="mb-2">
                                <div className="flex flex-col">
                                    <label htmlFor="phoneNumber" className="mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                                    <div className="flex">
                                        <Menu placement="bottom-start">
                                            <MenuHandler>
                                                <Button
                                                    ripple={false}
                                                    variant="text"
                                                    color="blue-gray"
                                                    className="flex items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 p-auto"
                                                >
                                                    <img
                                                        src={flags.svg}
                                                        alt={name}
                                                        className="h-4 w-4 rounded-full object-cover"
                                                    />
                                                    {countryCallingCode}
                                                </Button>
                                            </MenuHandler>
                                            <MenuList className="max-h-[20rem] max-w-[18rem]">
                                                {sortedCountries.map(({ name, flags, countryCallingCode }, index) => {
                                                    return (
                                                        <MenuItem
                                                            key={name}
                                                            value={name}
                                                            className="flex items-center gap-2"
                                                            onClick={() => setSelectedCountryIndex(index)}
                                                        >
                                                            <img
                                                                src={flags.svg}
                                                                alt={name}
                                                                className="h-5 w-5 rounded-full object-cover"
                                                            />
                                                            {name} <span className="ml-auto">{countryCallingCode}</span>
                                                        </MenuItem>
                                                    );
                                                })}
                                            </MenuList>
                                        </Menu>
                                        <Input
                                            type="tel"
                                            placeholder="Mobile Number"
                                            className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                            containerProps={{
                                                className: "min-w-0",
                                            }}
                                            size='lg'
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="dateBorn" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                                <div className="">
                                    <Popover placement="bottom">
                                        <PopoverHandler>
                                            <Input
                                                label="Select a Date"
                                                onChange={() => null}
                                                value={date ? format(date, "PPP") : ""}
                                                required
                                            />
                                        </PopoverHandler>
                                        <PopoverContent>
                                            <DayPicker
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                showOutsideDays
                                                className="border-0"
                                                classNames={{
                                                    caption: "flex justify-center py-2 mb-4 relative items-center",
                                                    caption_label: "text-sm font-medium text-gray-900",
                                                    nav: "flex items-center",
                                                    nav_button:
                                                        "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                                    nav_button_previous: "absolute left-1.5",
                                                    nav_button_next: "absolute right-1.5",
                                                    table: "w-full border-collapse",
                                                    head_row: "flex font-medium text-gray-900",
                                                    head_cell: "m-0.5 w-9 font-normal text-sm",
                                                    row: "flex w-full mt-2",
                                                    cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                    day: "h-9 w-9 p-0 font-normal",
                                                    day_range_end: "day-range-end",
                                                    day_selected:
                                                        "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                                    day_today: "rounded-md bg-gray-200 text-gray-900",
                                                    day_outside:
                                                        "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                                    day_disabled: "text-gray-500 opacity-50",
                                                    day_hidden: "invisible",
                                                }}
                                                components={{
                                                    IconLeft: ({ ...props }) => (
                                                        <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                                                    ),
                                                    IconRight: ({ ...props }) => (
                                                        <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                                                    ),
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="bank" className="block mb-2 text-sm font-medium text-gray-900">Bank</label>
                                <Select size="md" label="Bank" required>
                                    <Option before={<img src="logo-bca.png" alt="BCA Logo" className="h-5 w-5" />}>BCA</Option>
                                    <Option before={<img src="logo-bni.png" alt="BNI Logo" className="h-5 w-5" />}>BNI</Option>
                                    <Option before={<img src="logo-bri.png" alt="BRI Logo" className="h-5 w-5" />}>BRI</Option>
                                    <Option before={<img src="logo-dana.png" alt="DANA Logo" className="h-5 w-5" />}>DANA</Option>
                                    <Option before={<img src="logo-ovo.png" alt="OVO Logo" className="h-5 w-5" />}>OVO</Option>
                                </Select>
                            </div>

                        </div>
                        <div className="flex justify-center mt-6">
                            <Button variant="outlined" className='mr-3'>Batal</Button>
                            <Button variant="filled">Simpan</Button>
                        </div>

                    </form>
                </div>
            </div>
            <FooterUser />
        </div>
    )
}

export default EditProfilePage;
