import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function Home() {
  return (
   <>
      <Navbar/>
      <main>
        <div className="w-[90%] m-auto mt-[2%] h-[70vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <h1 className=" text-7xl font-bold bg-gradient-to-r from-blue-600 to-pink-400 inline-block text-transparent bg-clip-text">CHAT FUN</h1>
            <p className=" font-medium text-lg">Stay close to your favorite people ...</p>
            <p className=" font-medium text-lg">Start fun chats with your friends ...</p>
            <button className=" rounded-full px-5 p-2 font-black bg-gradient-to-r from-blue-600 to-pink-400 text-black">Start Chat</button>
          </div>
        </div>
      </main>
      <Footer/>
   </>
  );
}