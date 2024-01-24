import React from "react";
import Sandwich from "../img/sandwich/s1.jpeg";

function AboutContainer() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="about">
            <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
                <p className="text-2xl font-semibold capitalize text-headingColor relative
                    before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2
                    before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all
                    ease-in-out duration-100">
                    Sobre Nosotros
                </p>

                <p className="text-[1.5rem] lg:text-[3.5rem] font-bold tracking-wide text-headingColor">
                    ¿Qué hace especial
                    <span className="text-orange-600 text-[2rem] lg:text-[4rem]"> nuestra comida</span>
                    ?
                </p>

                <p className="text-base text-textColor text-center md:text-left md:-[80%]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Incidunt fugit eius ut commodi ratione dignissimos suscipit aliquam ullam,
                    velit itaque dolorum ipsum perferendis deserunt voluptates et accusamus debitis.
                    Obcaecati, maxime!
                </p>
            </div>

            <div className="py-2 flex-1 flex items-center ">
                <div className=" ml-auto h-420 w-full lg:w-auto lg:h-450 bg-white rounded-full drop-shadow-xl">
                    <img src={Sandwich}
                        className="w-full h-full rounded-full object-contain"
                        alt="Sandwich" />
                </div>
            </div>

        </section>
    );
};

export default AboutContainer;