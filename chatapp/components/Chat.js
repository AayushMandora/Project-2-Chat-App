import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Chat = ({ chat, allmessage, setselecteduser, socket, setallmessage }) => {
  const [message, setmessage] = useState("");
  const loggeduser = JSON.parse(localStorage.getItem("userdata"));
  const [details, setdetails] = useState(true);
  const [adduser, setadduser] = useState(false);
  const [search, setsearch] = useState("");
  const [Users, setUsers] = useState([]);

  const scrollend = () => {
    let div = document.getElementById("scrolldiv");
    div.scrollTop = div.scrollHeight;
  };
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
    let data = await res.json();
    socket.emit("new message", data);
    setallmessage([...allmessage, data]);
  };

  useEffect(() => {
    if (details === false) {
      setdetails(true);
    }
  }, [chat]);

  useEffect(() => {
    scrollend();
  }, [allmessage]);

  return (
    <>
      <div className="flex flex-col h-[95%] md:h-[100%] gap-2 p-3 bg-white/15 md:w-[70%] w-[91%] rounded-3xl absolute md:static">
        <div
          className="rounded-full p-3 flex gap-5 bg-black/25 hover:cursor-pointer"
          onClick={() => {
            setdetails(!details);
          }}
        >
          <div className="flex items-center">
            {window.innerWidth <= 768 && (
              <span
                className="material-symbols-outlined rounded-full p-2"
                onClick={() => {
                  setselecteduser(null);
                }}
              >
                arrow_back
              </span>
            )}
            <Image
              src={`/uploads/${
                !chat.groupchat
                  ? chat.users[0].email == loggeduser.email
                    ? chat.users[1].ProfilePic
                    : chat.users[0].ProfilePic
                  : chat.ProfilePic
              }`}
              width={40}
              height={40}
              alt="Picture of the author"
              className="rounded-full h-[40px] w-[40px] object-cover"
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

        <div
          id="scrolldiv"
          className="bg-black/25 h-[90%] rounded-3xl p-3 overflow-auto scroll-smooth no-scrollbar"
        >
          {allmessage.map((message) => {
            return (
              <>
                {message.sender._id !== loggeduser.userId ? (
                  <div className="flex gap-2 mt-3">
                    <div className="flex items-center">
                      <Image
                        src={`/uploads/${message.sender.ProfilePic}`}
                        width={25}
                        height={25}
                        alt="Picture of the author"
                        className="rounded-full h-[25px] w-[25px] object-cover"
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
        <div className="flex items-center bg-black/25 p-3 rounded-full gap-2 relative">
          <input
            className=" text-lg w-[95%] bg-white/10 rounded-full p-1 px-2 outline-none"
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
          <span
            className="material-symbols-outlined hover:bg-white/15 rounded-full p-2 hover:cursor-pointer"
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
        className="md:w-[35%] w-[90%] z-10 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-black p-3 rounded-xl"
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
              src={`/uploads/${
                !chat.groupchat
                  ? chat.users[0].email == loggeduser.email
                    ? chat.users[1].ProfilePic
                    : chat.users[0].ProfilePic
                  : chat.ProfilePic
              }`}
              width={80}
              height={80}
              alt="Picture of the author"
              className="rounded-full h-[80px] w-[80px] object-cover"
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
          {(adduser && chat.groupchat) && (
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
                              src={`/uploads/${user.ProfilePic}`}
                              width={40}
                              height={40}
                              alt="Picture of the author"
                              className="rounded-full h-[40px] w-[80px] object-cover"
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
                              let updatechat = await res.json();
                              setselecteduser(updatechat);
                              if (res.ok) {
                                toast.success("User Removed Successfully!", {
                                  position: "top-center",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "dark",
                                });
                              }
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
                            let updatechat = await res.json();
                            setselecteduser(updatechat);
                            setsearch("");
                            if (res.ok) {
                              toast.success("User Added Successfully!", {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                              });
                            }
                          }}
                        >
                          <div className="flex items-center">
                            <Image
                              src={`/uploads/${user.ProfilePic}`}
                              width={40}
                              height={40}
                              alt="Picture of the author"
                              className="rounded-full h-[40px] w-[40px] object-cover"
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
