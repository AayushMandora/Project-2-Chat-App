import React from "react";
import ChatNavbar from "./ChatNavbar";
import Image from "next/image";
import Chat from "./Chat";

const Chathome = () => {
  return (
    <div className="flex p-4 gap-5">
      <div className="w-1/3 flex flex-col gap-4">
        <ChatNavbar />
        <div className="rounded-3xl h-[83vh] p-5 bg-white/15">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="Search"
              id="floating_Search"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="floating_Search"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Search user
            </label>
          </div>
          <div className="rounded-full p-3 flex gap-5 hover:bg-black/25 hover:cursor-pointer">
            <div className="flex items-center">
              <Image
                src="/Profile.webp"
                width={40}
                height={40}
                alt="Picture of the author"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span>UserName</span>
              <span className=" text-sm text-white/25">Last Message</span>
            </div>
          </div>
          <div className="rounded-full p-3 flex gap-5 hover:bg-black/25 hover:cursor-pointer">
            <div className="flex items-center">
              <Image
                src="/Profile.webp"
                width={40}
                height={40}
                alt="Picture of the author"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span>UserName</span>
              <span className=" text-sm text-white/25">Last Message</span>
            </div>
          </div>
          <div className="rounded-full p-3 flex gap-5 hover:bg-black/25 hover:cursor-pointer">
            <div className="flex items-center">
              <Image
                src="/Profile.webp"
                width={40}
                height={40}
                alt="Picture of the author"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span>UserName</span>
              <span className=" text-sm text-white/25">Last Message</span>
            </div>
          </div>
          <div className="rounded-full p-3 flex gap-5 hover:bg-black/25 hover:cursor-pointer">
            <div className="flex items-center">
              <Image
                src="/Profile.webp"
                width={40}
                height={40}
                alt="Picture of the author"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span>UserName</span>
              <span className=" text-sm text-white/25">Last Message</span>
            </div>
          </div>
        </div>
      </div>
      <Chat />
    </div>
  );
};

export default Chathome;
