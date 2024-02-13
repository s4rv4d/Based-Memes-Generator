import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Craft Your Humour, Mint Your NFT
            {/* <br className="hidden lg:inline-block">readymade gluten */}
          </h1>
          <p className="mb-8 leading-relaxed text-white">
            Transform Your Wit into Digital Art with Our Playful Crypto Creation
            Platform!
          </p>
          <div className="flex justify-center">
            <Link
              className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
              href={"/create"}
              draggable={false}
            >
              Create
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="https://i.postimg.cc/JnzWGTJY/Group-4.png"
          />
        </div>
      </div>
    </section>
  );
}
