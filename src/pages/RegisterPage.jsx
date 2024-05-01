import React, { useState, useReducer } from 'react';
import NavbarLogin from "../components/NavbarLogin";
import { FooterUser } from "../components/Footer";
import imgRegister from "../assets/images/imgRegister.jpg";
import { useCountries } from "use-react-countries";
import { motion } from 'framer-motion';
import { userRegister } from '../validation/Validasi';
import { Navigate, useNavigate } from "react-router-dom";
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
  Select,
  Option,
  IconButton,
  Alert
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { RegisterUser } from "../api/AuthApi";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const Register = () => {
  const [open, setOpen] = React.useState(false);
  const { countries } = useCountries();
  const [formData, setFormData] = useReducer(formReducer, {});
  const [date, setDate] = React.useState();
  const [errors, setErrors] = useState({});
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));
  const { name, flags, countryCallingCode } = sortedCountries[selectedCountryIndex];
  const [country, setCountry] = React.useState(0);
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [selectedGender, setSelectedGender] = useState("");
  const [data, setData] = useState({
    username: "",
    nama_user: "",
    password: "",
    email: "",
    nomor_telepon: "",
    tanggal_lahir: "",
    gender: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


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
    console.log("Masuuk");
    const parsedUser = userRegister.safeParse(formData);
    if (!parsedUser.success) {
      const error = parsedUser.error;
      let newErrors = {};
      for (const issue of error.issues) {
        newErrors = {
          ...newErrors,
          [issue.path[0]]: issue.message,
        };
      }
      return setErrors(newErrors);
    }
    console.log("formData", formData);
    setErrors({});
    setLoading(true);
    RegisterUser(formData)
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        console.log("Masuk");
        setOpen(true);
        setLoading(false);
      }).catch((err) => {
        console.log("Error", err); // Tampilkan objek error untuk mengecek strukturnya
        setErrors({ email: err.message });
        setLoading(false);
        console.log("Masuuk Err");
      });

  };

  return (
    <div className="font-poppins bg-cover bg-black">
      <NavbarLogin />

      <div className=" bg-cover " style={{ backgroundImage: `url(${imgRegister})` }}>
        <div className='min-h-screen'>
          <div className=" p-5 flex justify-center">
            <Alert
              className="max-w-md w-auto"
              color="green"
              open={open}
              onClose={() => setOpen(false)}
              animate={{
                mount: { y: 0 },
                unmount: { y: 100 },
              }}
              icon={<FontAwesomeIcon icon={faInfoCircle} />}
            >
              Kode Verifikasi akan dikirim lewat email!
            </Alert>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg flex items-center justify-center">
              <div className="w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register at Atma Kitchen</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="mb-2">
                      <label htmlFor="username" className=" block mb-2 text-sm font-medium text-gray-900">Username</label>
                      <Input
                        error={!!errors.username}
                        type='text'
                        name='username'
                        size="lg"
                        label="Username"
                        className='w-sm'
                        placeholder='Joexx01'
                        onChange={setFormData}
                      />
                      {errors.username && (
                        <motion.span
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="font-poppins mt-2 flex items-center text-red-500 text-sm"
                        >
                          {errors.username}
                        </motion.span>
                      )}
                    </div>
                    <div className="mb-2 lg:col-span-2">
                      <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">Nama Lengkap</label>
                      <Input
                        error={!!errors.nama_user}
                        type='text'
                        size="lg"
                        name="nama_user"
                        label="Nama Lengkap"
                        className=''
                        placeholder='Joe Biden Kece'
                        onChange={setFormData}
                      />
                      {errors.nama_user && (
                        <motion.span
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="font-poppins mt-2 flex items-center text-sm text-red-500"
                        >
                          {errors.nama_user}
                        </motion.span>
                      )}
                    </div>
                    <div className="mb-2">
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                      <div className="relative flex w-full max-w-[24rem]">
                        <Input
                          error={!!errors.password}
                          type={showPassword ? "text" : "password"}
                          label="Password"
                          name='password'
                          placeholder="•••••••••"
                          onChange={(e) => {
                            setFormData({ target: { name: 'password', value: e.target.value } });
                            handlePasswordChange(e);
                          }}

                        />
                        <IconButton
                          size="sm"
                          className="!absolute right-1 top-1 rounded "
                          onClick={toggleShowPassword}
                        >
                          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </IconButton>
                      </div>
                      <Typography
                        variant="small"
                        color="gray"
                        className="mt-2 flex items-center gap-1 font-normal text-xs"
                      >
                        <div className="flex">
                          <FontAwesomeIcon icon={faInfoCircle} className='mr-2 flex justify-center items-center' />
                          {password ? (
                            <>
                              {passwordStrength === 'low' && (
                                <motion.span
                                  className="text-red-500 text-sm"
                                  initial={{ y: 20 }}
                                  animate={{ y: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  Password must contain at least one uppercase letter, one lowercase letter, and one number.
                                </motion.span>
                              )}
                              {passwordStrength === 'middle' && (
                                <motion.span
                                  className="text-yellow-800 text-sm"
                                  initial={{ y: 20 }}
                                  animate={{ y: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  Password must contain at least one uppercase letter, one lowercase letter, and one number.
                                </motion.span>
                              )}
                              {passwordStrength === 'strong' && (
                                <motion.span
                                  className="text-green-500 text-sm"
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
                              initial={{ y: errors.password ? 20 : 0 }}
                              animate={{ y: errors.password ? 0 : 0 }} // Tetapkan nilai y: 0 untuk animasi yang tidak terjadi
                              exit={{ y: errors.password ? -20 : 0, opacity: errors.password ? 0 : 1 }} // Tetapkan nilai opacity: 1 untuk animasi yang tidak terjadi
                              transition={{ duration: 0.3 }}
                              className={`font-poppins flex items-center text-sm ${errors.password ? 'text-red-500' : 'text-gray-500'}`}
                            >
                              {errors.password ? errors.password : " Use at least 8 characters, one uppercase, one lowercase and one number."}
                            </motion.span>

                          )}
                        </div>
                      </Typography>
                    </div>
                    <div className="mb-2 lg:col-span-2">
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                      <Input
                        error={!!errors.email}
                        type='email'
                        name='email'
                        size="lg"
                        label="Email"
                        className=''
                        placeholder='Joe.Hoe@gmail.com'
                        onChange={setFormData}

                      />
                      {errors.email && (
                        <motion.span
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="font-poppins mt-2 flex items-center text-sm text-red-500"
                        >
                          {errors.email}
                        </motion.span>
                      )}
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
                            error={!!errors.nomor_telepon}
                            type="tel"
                            placeholder="Mobile Number"
                            name='nomor_telepon'
                            className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900 "
                            labelProps={{
                              className: "before:content-none after:content-none",
                            }}
                            containerProps={{
                              className: "min-w-0",
                            }}
                            size='lg'
                            onChange={(e) => setFormData({ target: { name: 'nomor_telepon', value: e.target.value } })}

                          />

                        </div>

                      </div>
                      {errors.nomor_telepon && (
                        <motion.span
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          variant="small"
                          color="gray"
                          className="font-poppins text-sm mt-2 flex items-center  text-red-500"
                        >
                          {errors.nomor_telepon}
                        </motion.span>
                      )}
                    </div>
                    <div className="mb-2">
                      <label htmlFor="dateBorn" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                      <div className="">
                        <Popover placement="bottom">
                          <PopoverHandler>
                            <Input
                              label="Select a Date"
                              name='tanggal_lahir'
                              onChange={() => null}
                              value={date ? format(date, "PPP") : ""}
                              error={!!errors.tanggal_lahir}
                            />
                          </PopoverHandler>
                          <PopoverContent>
                            <DayPicker
                              mode="single"
                              selected={date}
                              onSelect={(selectedDate) => {
                                setFormData({ target: { name: 'tanggal_lahir', value: format(selectedDate, "yyyy-MM-dd") } });
                                setDate(selectedDate);
                              }}
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
                      {errors.tanggal_lahir && (
                        <motion.span
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          variant="small"
                          color="gray"
                          className="font-poppins text-sm mt-2 flex items-center text-red-500"
                        >
                          {errors.tanggal_lahir}
                        </motion.span>
                      )}
                    </div>
                    <div className="mb-2">
                      <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
                      <Select
                        error={!!errors.gender}
                        label="Pilih Gender"
                        name="gender"
                        value={selectedGender}
                        onChange={(newValue) => {
                          setSelectedGender(newValue);
                          setFormData({ target: { name: 'gender', value: newValue } });
                        }}
                      >
                        <Option value="laki-laki">Laki-Laki</Option>
                        <Option value="perempuan">Perempuan</Option>
                      </Select>
                      {errors.gender && (
                        <motion.span
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          variant="small"
                          color="gray"
                          className="font-poppins mt-2 flex items-center text-sm text-red-500"
                        >
                          {errors.gender}
                        </motion.span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      loading={loading}
                      className=" flex items-center justify-center bg-black rounded-none bg-opacity-70 text-white font-bold w-1/2 py-2 px-4 transition-colors duration-300 hover:bg-black hover:text-yellow-300 mt-4"
                    >
                      Register
                    </Button>
                  </div>
                </form>
              </div>
            </div >
          </div>
        </div >
        <FooterUser />
      </div >
    </div>
  );
}

export default Register;
