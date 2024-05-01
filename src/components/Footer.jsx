import { Typography } from "@material-tailwind/react";

const LINKS = [
    {
        title: "Product",
        items: ["Overview", "Features", "Solutions", "Tutorials"],
    },
    
];

const currentYear = new Date().getFullYear();

export const FooterUser = () => {
    return (
        <footer className="w-full bg-white" style={{ backgroundColor: "#232323" }}>
            <div className="mx-auto w-full max-w-7xl px-8 pt-10">
                <div className="grid grid-cols-1 justify-between gap-10 text-center md:grid-cols-3">
                    <div className="order-1 md:order-1">
                        <Typography variant="h3" className="mb-6 text-white" style={{ fontFamily: "Rufina" }}>
                            Atma Kitchen
                        </Typography>
                        {/* Ubah teks */}
                        <div className="mb-6 text-white">
                            <Typography variant="body1">
                                "Terima kasih telah mengunjungi Atma Kitchen!
                                Kami siap melayani pesanan kue tradisional Anda.
                                Kontak kami untuk pemesanan dan informasi lebih lanjut."
                            </Typography>
                        </div>
                    </div>
                    <div className="order-1 md:order-1">
                        <Typography variant="h3" className="mb-6 text-white" style={{ fontFamily: "Rufina" }}>
                            Kontak Person
                        </Typography>
                        {/* Ubah teks */}
                        <div className="mb-6 text-white">
                            <Typography variant="body1">
                                +62 812 234 6721
                            </Typography>
                            <Typography variant="body2">
                                AtmaKitchen@gmail.com
                            </Typography>
                            <Typography variant="body3" className="mt-3">
                                Jl. Centralpark No.10
                            </Typography>
                            <Typography variant="body4">
                                DIY Yogyakarta
                            </Typography>
                        </div>
                    </div>
                    {/* Link items */}
                    <div className="order-1 md:order-1 grid grid-cols-3 justify-between">
                        {LINKS.map(({ title, items }) => (
                            <ul key={title}>
                                <Typography
                                    variant="small"
                                    color="white"
                                    className="mb-3 font-medium opacity-40"
                                >
                                    {title}
                                </Typography>
                                {items.map((link) => (
                                    <li key={link}>
                                        <Typography
                                            as="a"
                                            href="#"
                                            color="white"
                                            className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                                        >
                                            {link}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>

                <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
                    <Typography
                        variant="small"
                        className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0 text-white"
                    >
                        &copy; {currentYear} <a href="">Atma Kitchen</a>. All
                        Rights Reserved.
                    </Typography>
                    <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
                        <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100 text-white">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    fillRule="evenodd"
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Typography>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterUser;
