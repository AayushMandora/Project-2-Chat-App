"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ChatNavbar = () => {
  const [add, setadd] = useState(true);
  const [search, setsearch] = useState("");
  const [Users, setUsers] = useState([]);
  const [selectedusers, setselectedusers] = useState([]);
  const [groupname, setgroupname] = useState("");
  const router = useRouter();

  return (
    <div className="rounded-full bg-white/15">
      <div className="flex justify-between items-center p-3">
        <Image
          src="/Profile.webp"
          width={40}
          height={40}
          alt="Picture of the author"
          className="rounded-full cursor-pointer"
        />
        <div className="flex items-center gap-4 cursor-pointer">
          <span
            className="material-symbols-outlined"
            onClick={() => {
              setadd(!add);
            }}
          >
            add_comment
          </span>
          <span className="material-symbols-outlined">groups</span>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/");
            }}
          >
            logout
          </span>
        </div>
      </div>

      <div
        hidden={add}
        className="w-[35%] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <div className="bg-black p-5 rounded-2xl flex flex-col gap-5 items-center">
          <div className="flex w-full justify-between">
            <h1 className=" font-black text-xl">Create Group Chat</h1>
            <span
              className="material-symbols-outlined invert-0 cursor-pointer"
              onClick={() => {
                setadd(true);
              }}
            >
              cancel
            </span>
          </div>
          <div className=" w-full">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="group_name"
                value={groupname}
                id="floating_Group_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                required
                onChange={(e) => {
                  setgroupname(e.target.value);
                }}
              />
              <label
                htmlFor="floating_Group_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Group Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="add_user"
                value={search}
                id="floating_add"
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
                }}
              />
              <label
                htmlFor="floating_add"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Add users
              </label>
            </div>
            <ul className="flex gap-1 flex-wrap mb-3">
              {Object.keys(selectedusers).map((key) => (
                <li
                  key={key}
                  className=" rounded bg-white/15 p-1 text-sm flex gap-1 items-center cursor-pointer"
                >
                  {" "}
                  <div className="flex items-center">
                    <Image
                      src="/Profile.webp"
                      width={15}
                      height={15}
                      alt="Picture of the author"
                      className="rounded-full"
                    />
                  </div>
                  {selectedusers[key].username}
                </li>
              ))}
            </ul>
            {search.length > 0 &&
              Users.map((user) => {
                return (
                  <div
                    key={user._id}
                    className="rounded-full p-3 flex gap-5 hover:cursor-pointer hover:bg-white/15"
                    onClick={() => {
                      setselectedusers({ ...selectedusers, [user._id]: user });
                      console.log(selectedusers);
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
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </div>
                );
              })}
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={async () => {
              let token = localStorage.getItem("token");
              const res = await fetch(`http://127.0.0.1:5000/groupchat`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  users: Object.values(selectedusers),
                  chatname: groupname ,
                }),
              });
            }}
          >
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatNavbar;
