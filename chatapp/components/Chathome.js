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
      <Chat/>
    </div>
  );
};

export default Chathome;
