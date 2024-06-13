"use client";
import React from "react";
import ChatNavbar from "./ChatNavbar";
import Image from "next/image";
import Chat from "./Chat";
import { useState, useEffect } from "react";

const Chathome = () => {
  const [search, setsearch] = useState("");
  const [Users, setUsers] = useState([]);
  const [chats, setchats] = useState([]);
  const [selecteduser, setselecteduser] = useState();
  const [allmessage, setallmessage] = useState([]);

  const fetchchats = async () => {
    let token = localStorage.getItem("token");
    const res = await fetch(`http://127.0.0.1:5000/chats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    let result = await res.json();
    setchats(result);
  };

  const fetchallmessage = async (id)=>{
    let token = localStorage.getItem("token");
    const res = await fetch(`http://127.0.0.1:5000/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    let result = await res.json();
    setallmessage(result);
    console.log(allmessage);
  }

  useEffect(() => {
    fetchchats();
  }, []);

  return (
    <div className="flex p-4 gap-5">
      <div className="w-1/3 flex flex-col gap-4">
        <ChatNavbar />
        <div className="rounded-3xl h-[83vh] p-5 bg-white/15">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="Search"
              value={search}
              id="floating_Search"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              onChange={async (e) => {
                setsearch(e.target.value);
                let token = localStorage.getItem("token");
                const res = await fetch(
                  `http://127.0.0.1:5000/users?search=${search}`,
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      authorization: `Bearer ${token}`,
                    },
                  }
                );
                let users = await res.json();
                setUsers(users);
                console.log(Users);
              }}
            />
            <label
              htmlFor="floating_Search"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Search user
            </label>
          </div>

          {search.length > 0 &&
            Users.map((user) => {
              return (
                <div
                  key={user._id}
                  className="rounded-full p-3 flex gap-5 hover:bg-black/25 hover:cursor-pointer"
                  onClick={async () => {
                    let token = localStorage.getItem("token");
                    const res = await fetch(`http://127.0.0.1:5000/chat`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({ userID: user._id }),
                    });
                    setsearch("");
                    fetchchats();
                  }}
                >
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
                    <span>{user.username}</span>
                    <span className=" text-sm text-white/25">Last Message</span>
                  </div>
                </div>
              );
            })}
          {search.length==0 &&
            chats.map((chat) => {
              return (
                <div
                  key={chat._id}
                  className="rounded-full p-3 flex gap-5 hover:bg-black/25 hover:cursor-pointer"
                  onClick={(e)=>{
                    setselecteduser(chat);
                    fetchallmessage(chat._id);
                  }}
                >
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
                    <span>{chat.chatname}</span>
                    <span className=" text-sm text-white/25">Last Message</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {selecteduser && <Chat chat={selecteduser} messages={allmessage} />}
    </div>
  );
};

export default Chathome;
