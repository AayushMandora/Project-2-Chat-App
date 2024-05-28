import React from "react";
import Image from "next/image";

const Chat = () => {
  return (
    <div className="flex flex-col gap-2 p-3 bg-white/15 w-[70vw] rounded-3xl">
      <div className="rounded-full p-3 flex gap-5 bg-black/25 hover:cursor-pointer">
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
          <span className=" text-sm text-white/25">
            Click here for contact info
          </span>
        </div>
      </div>
      <div className="bg-black/25 h-[90%] rounded-3xl p-3">
        <div className="flex gap-2">
          <div className="flex items-center">
            <Image
              src="/Profile.webp"
              width={25}
              height={25}
              alt="Picture of the author"
              className="rounded-full"
            />
          </div>
          <div className="bg-white/15 max-w-[60%] rounded-xl p-1 flex gap-1">
            <div className="p-1">
              Hello
            </div>
            <span className=" text-white/30 text-[12px] self-end">10:34</span>
          </div>
        </div>
      </div>
      <div className="flex items-center bg-black/25 p-3 rounded-full gap-2">
        <span class="material-symbols-outlined hover:bg-white/15 rounded-full p-2 hover:cursor-pointer">
          mood
        </span>
        <input
          className=" text-lg w-[90%] bg-white/10 rounded-full p-1 px-2 outline-none"
          placeholder="Type a Message"
          type="text"
        />
        <span class="material-symbols-outlined hover:bg-white/15 rounded-full p-2 hover:cursor-pointer">
          add
        </span>
      </div>
    </div>
  );
};

export default Chat;
