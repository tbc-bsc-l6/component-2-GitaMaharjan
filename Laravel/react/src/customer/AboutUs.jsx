import React from "react";
import about1 from "../assets/aboutus/aboutus1.jpeg"
import about2 from "../assets/aboutus/aboutus2.jpeg"
import about3 from "../assets/aboutus/aboutus3.jpeg"


const AboutUs= () => {
  return (
    <>
      <section className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] bg-white dark:bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex items-center -mx-3 sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="py-3 sm:py-4">
                    <img
                      src={about1}
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                  <div className="py-3 sm:py-4">
                    <img
                      src={about2}
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative z-10 my-4">
                    <img
                      src={about3}
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>


            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
            <div className="mt-10 lg:mt-0">
                <span className="block mb-4 text-lg font-semibold text-primary">
                Why Choose goasis
                </span>
                <h2 className="mb-5 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
                Welcome to Goasis - Your Furniture Oasis
                </h2>
                <p className="mb-5 text-base text-body-color dark:text-dark-6">
                At Goasis, we believe that your home is a reflection of your unique
                style and personality. Thats why we are dedicated to providing you
                with an extensive selection of high-quality furniture that transforms
                your space into an oasis of comfort and elegance.
                </p>
                <p className="mb-8 text-base text-body-color dark:text-dark-6">
                Our passion for beautiful interiors and functional design is evident
                in every piece we offer. From modern and contemporary to classic and
                timeless, our curated collection caters to diverse tastes and
                preferences. We source our furniture from top-notch manufacturers to
                ensure durability, craftsmanship, and, most importantly, your
                satisfaction.
                </p>
                <a
                href="javascript:void(0)"
                className="inline-flex items-center justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-primary hover:bg-opacity-90"
                >
                Get Started
                </a>
            </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
