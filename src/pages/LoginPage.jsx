import { useState, useEffect, useReducer } from "react";
import React from "react";
import imgBg from "../assets/images/background.jpg";
import NavbarLogin from "../components/NavbarLogin";
import { Button, Switch, Typography, Alert } from "@material-tailwind/react";
import { FooterUser } from "../components/Footer";
import { Login } from "../api/AuthApi";
import { Navigate, useNavigate } from "react-router-dom";
import { userLogin } from "../validation/Validasi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value,
    };
};

const LoginPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useReducer(formReducer, {});
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const parsedUser = userLogin.safeParse(formData);
        if (!parsedUser.success) {
            console.log("hello");
            const error = parsedUser.error;
            let newErrors = {};
            for (const issue of error.issues) {
                newErrors = {
                    ...newErrors,
                    [issue.path[0]]: issue.message,
                };
            }
            return setFormErrors(newErrors);
        }

        setFormErrors({});
        setLoading(true);
        setData(formData);
        console.log("form Data", formData);
        Login(formData)
            .then((res) => {
                sessionStorage.setItem("token", res.access_token);
                sessionStorage.setItem("isLogin", true);
                sessionStorage.setItem("user", JSON.stringify(res.data));
                setIsLoggedIn(true);
                if (res.user.role === "Pelanggan") {
                    console.log("Masuk Sebagai Pelanggan");
                    navigate("/customer/profile");
                } else if (res.user.role === "Pegawai"){
                    if(res.user.pegawai.jabatan === "Manajer Operasional"){
                        navigate("/mo/home");
                        console.log("Masuk MO");
                    }else if(res.user.pegawai.jabatan === "Admin"){
                        navigate("/admin/home");
                        console.log("Masuk ADMin");
                    }else if(res.user.pegawai.jabatan === "Owner"){
                        navigate("/owner/home");
                        console.log("Masuk Owner");
                    }
                    
                }else {
                    console.log("Tidak Masuk Kemana mana");
                }
            })
            .catch((err) => {
                console.log("Error", err);
                setFormErrors(err.message);
                setLoading(false);

                setOpen(true);
            });
    };
    return (
        <div className=" font-poppins bg-cover bg-black">
            <NavbarLogin />

            <div className="bg-cover" style={{ backgroundImage: `url(${imgBg})`, backgroundSize: 'cover' }}>
                <div className="">
                    <div className=" p-5 flex justify-center">
                        <Alert
                            className="max-w-md w-auto"
                            color="red"
                            open={open}
                            onClose={() => setOpen(false)}
                            animate={{
                                mount: { y: 0 },
                                unmount: { y: 100 },
                            }}
                            icon={<FontAwesomeIcon icon={faInfoCircle} />}
                        >
                            {formErrors ? formErrors : "Email dan Password Anda salah!"}
                        </Alert>
                    </div>
                    <div className="justify-center items-center flex">
                        <div className="border w-full md:w-2/3 m-10 p-10 rounded-lg bg-white bg-opacity-30 shadow-lg ">
                            <div className=" m-0 p-0 grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* Column 1: Form */}
                                <form onSubmit={handleLogin} className=" p-5 rounded-lg shadow-lg md:flex md:flex-col order-2 md:order-1 bg-white bg-opacity-30">
                                    <h1 className="text-4xl font-bold mb-4">Login</h1>
                                    <p className="text-sm pt-5 pb-5 capitalize">Spread Some Joy With Our Delicious Cake. Lapis Legit, Lapis Surabaya and Milk Bun</p>
                                    <div className="mb-6">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="john.doe@company.com"
                                            onChange={setFormData}

                                        />
                                        {formErrors.email && (
                                            <Typography
                                                variant="small"
                                                color="gray"
                                                className="font-poppins mt-3 flex items-center font-medium text-sm text-red-500"
                                            >
                                                {formErrors.email}
                                            </Typography>
                                        )}
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="•••••••••"
                                            name="password"
                                            onChange={setFormData}
                                        />
                                        <div className="flex justify-between">

                                            {formErrors.password && (
                                                <Typography
                                                    variant="small"
                                                    color="gray"
                                                    className="font-poppins flex items-center font-medium text-sm text-red-500"
                                                >
                                                    {formErrors.password}
                                                </Typography>
                                            )}
                                            <Switch label="Show Password" checked={showPassword} onChange={toggleShowPassword} />
                                        </div>

                                    </div>
                                    <Link to="/forgot/password" className="text-center">Forget Password?</Link>
                                    <Button
                                        type="submit"
                                        loading={loading}
                                        className="bg-black bg-opacity-70 text-white flex items-center justify-center font-bold transition-colors rounded-none duration-300 hover:bg-black hover:text-yellow-300 mt-4"
                                    >
                                        Login
                                    </Button>

                                </form>
                                {/* Column 2: Additional Content */}
                                <div className="bg-white bg-opacity-30 p-5 rounded-lg shadow-lg order-1 md:order-2">
                                    <h1 className="text-sm md:text-4xl lg:text-5xl font-bold mb-4 text-center">Welcome Back Dears!</h1>
                                    <p className="text-sm md:text-base lg:text-lg text-center">
                                        Selamat datang di Atma Kitchen! Nikmati kelezatan dari kue, roti, dan minuman kami yang istimewa. Setiap sajian kami dipenuhi dengan rasa dan kreativitas, menciptakan pengalaman tak terlupakan setiap kali Anda merasakannya.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterUser />
        </div>

    );
};

export default LoginPage;
