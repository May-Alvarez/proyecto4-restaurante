import React from "react";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";

function FooterContainer() {
    return (
        <footer className="bottom-0 left-0 w-screen p-4 bg-white border-t border-gray-200 shadow
        md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
            <div className="w-full max-w-screen-xl mx-auto md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link to={"/"} className="flex items-center gap-2">
                        <img src={Logo} className="w-10 object-coven" alt="logo" />
                        <p className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Brujo</p>
                    </Link>

                    <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Sobre Nosotros</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Menu</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contacto</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023
                    <a href="https://flowbite.com/" className="hover:underline">. UCamp</a>. Todos los derechos reservados.
                    Esta es una aplicación ficticia para fines académicos.</span>
            </div>
        </footer>
    );
};

export default FooterContainer;