import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace} from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import emptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";

const CartContainer = () => {

    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
    const [flag, setFlag] = useState(1);
    const [tot, setTot] = useState(0);
    

    const showCart = () => {
        dispatch({
            type : actionType.SET_CART_SHOW,
            cartShow : !cartShow,
        });
    };

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item){
            return accumulator + item.qty * item.price;
        }, 0);
        setTot(totalPrice);
        console.log(tot);
    }, [tot, flag]);

    const clearCardt = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: [],
        });
        localStorage.setItem("cartItems", JSON.stringify([]));
    }

    return (
        <motion.div
        initial={{ opacity: 0, x: 200}}
        animate={{ opacity: 1, x: 0}}
        exit={{ opacity: 0, x: 200}}
        className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-sm flex
        flex-col z-[101]">
            <div className="w-full flex items-center justify-between p-4 cursor-pointer">
                <motion.div
                whileTap={{ scale: 0.75}}
                onClick={showCart}>
                    <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
                </motion.div>
                <p className="text-textColor text-lg font-semibold"> Carrito </p>

                <motion.p
                whileTap={{ scale: 0.75}}
                className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md
                cursor-pointer text-textColor text-base"
                onClick={clearCardt}>
                    Limpiar <RiRefreshFill /> {" "}
                </motion.p>
            </div>
            {/* Boton - Seccion */}
            {cartItems && cartItems.length > 0 ? (
                <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
                    {/* Carrito Seccion - Items */}
                    <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll
                    scrollbar-none">
                        {/* Carrito */}
                        {cartItems &&
                        cartItems.length > 0 &&
                        cartItems.map((item) => (
                            <CartItem
                            key={item.id}
                            item={item}
                            flag={flag}
                            setFlag={setFlag}
                            />
                        ))}
                    </div>

                    {/* Carrito Seccion - Total*/}
                    <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center
                    justify-evenly px-8 py-2">
                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-400 text-lg">Sub Total</p>
                            <p className="text-gray-400 text-lg">$ {tot} </p>
                        </div>

                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-400 text-lg">Envio</p>
                            <p className="text-gray-400 text-lg">$15 MXN</p>
                        </div>

                        <div className="w-full border-b border-gray-600 my-2"></div>

                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-200 text-xl font-semibold">Total</p>
                            <p className="text-gray-200 text-xl font-semibold">
                            ${tot + 15} MXN</p>
                        </div>

                        {user ? (
                            <motion.button
                            whileTap={{ scale: 0.8}}
                            type="button"
                            className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600
                            text-gray-50 text-lg my-2 hover:shadow-lg">
                                Comprar
                            </motion.button>
                        ) : (
                            <motion.button
                            whileTap={{ scale: 0.8}}
                            type="button"
                            className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600
                            text-gray-50 text-lg my-2 hover:shadow-lg">
                                Intresa para comprar
                            </motion.button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                    <img src={emptyCart} alt="emptyCart" className="w-300" />
                    <p className="text-xl text-textColor font-semibold">
                        Agrege compras a su carrito
                    </p>
                </div>
            )}
            
        </motion.div>
    );
};

export default CartContainer;