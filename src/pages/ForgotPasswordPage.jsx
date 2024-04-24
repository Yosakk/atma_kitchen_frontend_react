import NavbarLogin from "../components/NavbarLogin"
import FooterUser from "../components/Footer"
import backgroundLogin from "../assets/images/backgroundLogin.jpg"
import backgroundCard from "../assets/images/test1.jpg"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";

const ForgotPasswordPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-cover" style={{ backgroundImage: `url(${backgroundLogin})` }}>
            <NavbarLogin />
            <div className="flex-grow flex justify-center">
                <div className="justify-center items-center flex mt-10 mb-10">
                    <div className="bg-white rounded-lg shadow-lg max-w-screen-lg bg-cover w-full h-full " style={{ backgroundImage: `url(${backgroundCard})`, backgroundSize: 'cover' }}>
                        <div className="p-20 grid grid-cols-2">
                            <div>
                                <Typography variant="h2" color="blue-gray" className="mb-2 font-bold">
                                    Forgot Password
                                </Typography>
                                <Typography>
                                    Kirimkan email Anda untuk melanjutkan reset password
                                </Typography>
                                <div className="mt-5 mb-5">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                                    <Input type='email' size="lg" label="Email" className='' placeholder='Joe.Hoe@gmail.com' required />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-black bg-opacity-70 text-white font-bold w-full py-2 px-4 transition-colors duration-300 hover:bg-black hover:text-yellow-300 mt-4"
                                >
                                    Kirim
                                </button>
                            </div>
                            <div className="hidden lg:block"></div>
                        </ div>
                    </ div>
                </ div>
            </div>
            <FooterUser />
        </div>
    )
}

export default ForgotPasswordPage