import React, { useState } from "react";
import { motion } from "framer-motion";

import { storage } from "../firebase.config";


import { getAllReserveItems, saverReserve } from "../utils/firebaseFunctions";

import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

function ReserveContainer() {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [message, setMessage] = useState("");

    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState("danger");
    const [msg, setMsg] = useState(null);
    const [{ reserveItems }, dispatch] = useStateValue();

    const saveDetails = () => {
        try {
            if (!name || !lastName || !email || !telephone || !message) {
                setFields(true);
                setMsg("Todos los campos deben ser llenados");
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false);
                }, 4000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    name: name,
                    lastName: lastName,
                    email: email,
                    telephone: telephone,
                    message: message,
                }
                saverReserve(data);
                setFields(true);
                setMsg("Datos enviados correctamente");
                clearData();
                setAlertStatus("success");
                setTimeout(() => {
                    setFields(false);
                }, 4000);
            }
        } catch (error) {
            console.log(error);
            setFields(true);
            setMsg("Error al actualizar: Intente de nuevo");
            setAlertStatus("danger");
            setTimeout(() => {
                setFields(false);
            }, 4000);
        }
        fetchData();
    };

    const clearData = () => {
        setName("");
        setLastName("");
        setEmail("");
        setTelephone("");
        setMessage("")
    }

    const fetchData = async () => {
        await getAllReserveItems().then((data) => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data,
            });
        });
    };

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full py-2" id="reserve">
            <div className="py-2 flex-1 flex flex-col items-start justify-start gap-6 ">
                {fields && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`w-full p-2 rounded-lg text-center text-lg font-semibold
                    ${alertStatus === "danger"
                                ? "bg-red-400 text-red-800"
                                : "bg-emerald-400 text-emerald-800"
                            }`}>
                        {msg}
                    </motion.p>
                )}

                <form className="max-w-md mx-auto">

                    {/* Email */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            name="floating_email"
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
                        border-gray-500 appearance-none dark:text-headingColor dark:border-gray-600
                        dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                            placeholder=" "
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <label
                            for="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300
                        transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                        rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                        peer-focus:-translate-y-6">
                            Email
                        </label>
                    </div>

                    {/* Nombre y Apellido */}
                    <div className="grid md:grid-cols-2 md:gap-6">

                        {/* Nombre */}
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="floating_first_name"
                                id="floating_first_name"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
                                border-gray-500 appearance-none dark:text-headingColor dark:border-gray-600
                                dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                                placeholder=" "
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                            <label
                                for="floating_first_name"
                                className="peer-focus:font-medium absolute text-sm
                            text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3
                            -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                            peer-focus:text-orange-600 peer-focus:dark:text-orange-500
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                            peer-focus:-translate-y-6">Nombre</label>
                        </div>

                        {/* Apellido */}
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="floating_last_name"
                                id="floating_last_name"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
                                border-gray-500 appearance-none dark:text-headingColor dark:border-gray-600
                                dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                                placeholder=" "
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)} />

                            <label
                                for="floating_last_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500
                            dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3
                            -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                            peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Apellido
                            </label>
                        </div>
                    </div>

                    {/* Telefono */}
                    <div className="relative z-0 w-full mb-5 group">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="tel"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                name="floating_phone"
                                id="floating_phone"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
                                border-gray-500 appearance-none dark:text-headingColor dark:border-gray-600
                                dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                                placeholder=" "
                                required
                                value={telephone}
                                onChange={(e) => setTelephone(e.target.value)} />
                            <label
                                for="floating_phone"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300
                            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                            peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Telefono (123-456-7890)
                            </label>
                        </div>
                    </div>

                    {/* Mensaje */}
                    <div className="relative z-0 w-full mb-5 group">
                        <textarea id="message"
                            rows="4"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
                            border-gray-500 appearance-none dark:text-headingColor dark:border-gray-600
                            dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                            placeholder=" "
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}>

                        </textarea>
                        <label for="message"
                            className="peer-focus:font-medium absolute text-sm text-gray-500
                            dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3
                            -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                            peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Mensaje y comentarios
                        </label>
                    </div>

                </form>

            </div>

            <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">

                <p className="text-base text-textColor text-center md:text-left md:-[80%]">
                    A partir de tu contacto, nos comunicaremos contigo para revisar fechas y disponibilidad de horarios.
                </p>

                <p className="text-base text-textColor text-center md:text-left md:-[80%]">
                    Centro Histórico
                    <br />
                    Ciudad de México, MX 12345
                </p>

                <button
                    type="button"
                    className="bg-gradient-to-br from-orange-400 to-orange-500 w-full
                md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out
                duration-100"
                    onClick={saveDetails}> Reserva ahora
                </button>
            </div>

        </section>
    );
};

export default ReserveContainer;
