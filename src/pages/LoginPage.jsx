import { useState } from "react";
import imgBg from "../assets/images/background.jpg";
import NavbarLogin from "../components/NavbarLogin";
import { Input } from "@material-tailwind/react";
import { FooterUser } from "../components/Footer";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleLogin = (e) => {
        e.preventDefault();

        // Validasi input
        const errors = {};
        if (!email) {
            errors.email = "Email is required";
        }
        if (!password) {
            errors.password = "Password is required";
        }

        // Jika ada error, set state errors
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        // Proses login jika data valid
        console.log("Login data:", { email, password });
    };

    return (
        <div className=" font-poppins bg-cover bg-black">
            <NavbarLogin />
            <div className="bg-cover" style={{ backgroundImage: `url(${imgBg})`, backgroundSize: 'cover' }}>
                <div className="justify-center items-center flex">
                    <div className="border w-full md:w-2/3 m-10 p-10 rounded-lg bg-white bg-opacity-30 shadow-lg ">
                        <div className=" m-0 p-0 grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Column 1: Form */}
                            <form onSubmit={handleLogin} className=" p-5 rounded-lg shadow-lg md:flex md:flex-col">
                                <h1 className="text-4xl font-bold mb-4">Login</h1>
                                <p className="text-sm pt-5 pb-5 capitalize">Spread Some Joy With Our Delicious Cake. Lapis Legit, Lapis Surabaya and Milk Bun</p>
                                <div className="mb-6">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email && "border-red-500"}`}
                                        placeholder="john.doe@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.password && "border-red-500"}`}
                                        placeholder="•••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
                                </div>
                                <a href="" className="text-center">Forget Password?</a>
                                <button
                                    type="submit"
                                    className="bg-black bg-opacity-70 text-white font-bold w-full py-2 px-4 transition-colors duration-300 hover:bg-black hover:text-yellow-300 mt-4"
                                >
                                    Login
                                </button>
                            </form>
                            {/* Column 2: Additional Content */}
                            <div className="bg-white bg-opacity-30 flex justify-center p-5 rounded-lg shadow-lg md:flex md:flex-col md:items-center md:px-10 lg:px-20">
                                <h1 className="text-sm md:text-4xl lg:text-5xl font-bold mb-4 text-center">Welcome Back Dears!</h1>
                                <p className="text-sm md:text-base lg:text-lg text-center">
                                    Selamat datang di Atma Kitchen! Nikmati kelezatan dari kue, roti, dan minuman kami yang istimewa. Setiap sajian kami dipenuhi dengan rasa dan kreativitas, menciptakan pengalaman tak terlupakan setiap kali Anda merasakannya.
                                </p>
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
