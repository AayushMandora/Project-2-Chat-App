import React from "react";
import Image from "next/image";

const ChatNavbar = () => {
  return (
    <div className="rounded-full bg-white/15">
      <div className="flex justify-between items-center p-3">
        <Image
          src="/Profile.webp"
          width={40}
          height={40}
          alt="Picture of the author"
          className="rounded-full"
        />
        <div className="flex items-center gap-4 cursor-pointer">
          <span class="material-symbols-outlined">add_comment</span>
          <span class="material-symbols-outlined">groups</span>
          <span class="material-symbols-outlined">logout</span>
        </div>
      </div>
    </div>
  );
};

export default ChatNavbar;
