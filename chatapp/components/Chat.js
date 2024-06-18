import React from "react";
import Image from "next/image";
import { useState } from "react";

const Chat = ({ chat, messages }) => {
  const [message, setmessage] = useState("");
  const loggeduser = JSON.parse(localStorage.getItem("userdata"));
  const [details, setdetails] = useState(true);
  const [adduser, setadduser] = useState(false);
  const [search, setsearch] = useState("");
  const [Users, setUsers] = useState([]);

  const sendmessage = async () => {
    let token = localStorage.getItem("token");
    setmessage("");
    const res = await fetch(`http://127.0.0.1:5000/sendmessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ chatID: chat._id, content: message }),
    });
    console.log(await res.json());
  };

  return (
    <>
      <div className="flex flex-col gap-2 p-3 bg-white/15 w-[70vw] rounded-3xl">
        <div
          className="rounded-full p-3 flex gap-5 bg-black/25 hover:cursor-pointer"
          onClick={() => {
            setdetails(!details);
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
            <span>
              {!chat.groupchat
                ? chat.users[0].email == loggeduser.email
                  ? chat.users[1].username
                  : chat.users[0].username
                : chat.chatname}
            </span>
            <span className=" text-sm text-white/25">
              Click here for contact info
            </span>
          </div>
        </div>
        <div className="bg-black/25 h-[28rem] rounded-3xl p-3 overflow-auto no-scrollbar">
          {messages.map((message) => {
            return (
              <>
                {message.sender.email !== loggeduser.email ? (
                  <div className="flex gap-2 mt-3">
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
                      <div className="p-1">{message.content}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-3 static flex-row-reverse">
                    <div className="bg-white/15 max-w-[60%] rounded-xl p-1 flex gap-1">
                      <div className="p-1">{message.content}</div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
        <div className="flex items-center bg-black/25 p-3 rounded-full gap-2">
          <span class="material-symbols-outlined hover:bg-white/15 rounded-full p-2 hover:cursor-pointer">
            mood
          </span>
          <input
            className=" text-lg w-[90%] bg-white/10 rounded-full p-1 px-2 outline-none"
            placeholder="Type a Message"
            type="text"
            value={message}
            onChange={(e) => {
              setmessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendmessage();
              }
            }}
          />
          <span class="material-symbols-outlined hover:bg-white/15 rounded-full p-2 hover:cursor-pointer">
            add
          </span>
          <span
            class="material-symbols-outlined hover:bg-white/15 rounded-full p-2 hover:cursor-pointer"
            onClick={() => {
              sendmessage();
            }}
          >
            Send
          </span>
        </div>
      </div>
      {/* Details Div */}
      <div
        hidden={details}
        className="w-[30%] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-black p-3 rounded-xl"
      >
        <div className="flex flex-col w-full">
          <span
            className="material-symbols-outlined invert-0 cursor-pointer self-end"
            onClick={() => {
              setdetails(true);
            }}
          >
            cancel
          </span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center">
            <Image
              src="/Profile.webp"
              width={80}
              height={80}
              alt="Picture of the author"
              className="rounded-full"
            />
          </div>
          <span className=" font-bold">
            {!chat.groupchat
              ? chat.users[0].email == loggeduser.email
                ? chat.users[1].username
                : chat.users[0].username
              : chat.chatname}
          </span>

          {chat.groupchat && (
            <div className=" w-full flex justify-between">
              <div className="w-full text-xl font-bold flex">
                {chat.users.length} Members
              </div>
              <span
                className="material-symbols-outlined invert-0 cursor-pointer"
                onClick={() => {
                  setadduser(!adduser);
                }}
              >
                add
              </span>
            </div>
          )}
          {adduser && (
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
                }}
              />
              <label
                htmlFor="floating_Search"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Search user
              </label>
            </div>
          )}

          <div className="w-full flex justify-center">
            {!chat.groupchat ? (
              chat.users[0].email == loggeduser.email ? (
                chat.users[1].email
              ) : (
                chat.users[0].email
              )
            ) : (
              <div className=" w-full h-[10rem] overflow-auto no-scrollbar">
                {" "}
                {search.length == 0
                  ? chat.users.map((user) => {
                      return (
                        <div
                          key={user._id}
                          className="rounded-full p-3 flex items-center gap-5 hover:bg-black/25 hover:cursor-pointer"
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
                            <span className=" text-sm text-white/25">
                              {user.email}
                            </span>
                          </div>
                          <span
                            className="material-symbols-outlined invert-0 cursor-pointer w-full flex flex-row-reverse"
                            onClick={async () => {
                              let token = localStorage.getItem("token");
                              const res = await fetch(
                                `http://127.0.0.1:5000/removeuser`,
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                    authorization: `Bearer ${token}`,
                                  },
                                  body: JSON.stringify({
                                    userID: user._id,
                                    chatid: chat._id,
                                  }),
                                }
                              );
                            }}
                          >
                            cancel
                          </span>
                        </div>
                      );
                    })
                  : Users.map((user) => {
                      return (
                        <div
                          key={user._id}
                          className="rounded-full p-3 flex gap-5 hover:bg-black/25 hover:cursor-pointer"
                          onClick={async () => {
                            let token = localStorage.getItem("token");
                            const res = await fetch(
                              `http://127.0.0.1:5000/adduser`,
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                  authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({
                                  userID: user._id,
                                  chatid: chat._id,
                                }),
                              }
                            );
                            setsearch("");
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
                            <span className=" text-sm text-white/25">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      );
                    })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
