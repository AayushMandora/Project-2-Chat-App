import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <header>
      <div className="flex justify-between w-[90%] px-4 m-auto mt-[2%] bg-white/20 rounded-full items-center p-2">
        <div className="flex items-center gap-3">
          <span class="material-symbols-outlined">forum</span>
          <span className=" font-black text-lg">CHAT FUN</span>
        </div>
        <button className=" rounded-full px-5 p-2 font-black bg-gradient-to-r from-blue-600 to-pink-400 text-black">
          Login
        </button>
      </div>
    </header>
  );
};

export default Navbar;