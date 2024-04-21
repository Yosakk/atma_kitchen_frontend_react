import React, { useState } from 'react';
import NavbarLogin from "../components/NavbarLogin";
import { FooterUser } from "../components/Footer";
import imgRegister from "../assets/images/imgRegister.jpg";
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
  PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";



const Register = () => {
  const [date, setDate] = React.useState();
  const [errors, setErrors] = useState({});
  const { countries } = useCountries();
  const [country, setCountry] = React.useState(0);
  const { name, flags, countryCallingCode } = countries[country];
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');


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

  return (
    <div className="font-poppins bg-cover bg-black">
      <NavbarLogin />
      <div className="min-h-screen flex items-center justify-center bg-cover " style={{ backgroundImage: `url(${imgRegister})` }}>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg ">
          <div className="w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register at Atma Kitchen</h2>
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
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <Input
                    type="password"
                    label="Password"
                    placeholder="•••••••••"
                    onChange={handlePasswordChange}
                    required
                  />
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center gap-1 font-normal text-xs"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="-mt-px h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {password ? (
                      <>
                        {passwordStrength === 'low' && (
                          <motion.span
                            className="text-red-500"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            Password must contain at least one uppercase letter, one lowercase letter, and one number.
                          </motion.span>
                        )}
                        {passwordStrength === 'middle' && (
                          <motion.span
                            className="text-yellow-800"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            Password must contain at least one uppercase letter, one lowercase letter, and one number.
                          </motion.span>
                        )}
                        {passwordStrength === 'strong' && (
                          <motion.span
                            className="text-green-500"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            Password meets the strength requirements.
                          </motion.span>
                        )}
                      </>
                    ) : (
                      <motion.span
                        className="text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                      >
                        Use at least 8 characters, one uppercase, one lowercase and one number.
                      </motion.span>
                    )}
                  </Typography>
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
                          {countries.map(({ name, flags, countryCallingCode }, index) => {
                            return (
                              <MenuItem
                                key={name}
                                value={name}
                                className="flex items-center gap-2"
                                onClick={() => setCountry(index)}
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
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-black bg-opacity-70 text-white font-bold w-1/2 py-2 px-4 transition-colors duration-300 hover:bg-black hover:text-yellow-300 mt-4"
                >
                  Register
                </button>
              </div>
            </form>
          </div>

        </div >
      </div >
      <FooterUser />
    </div >
  );
}

export default Register;
