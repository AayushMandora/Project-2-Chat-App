import React from "react";
import Image from "next/image";
import { useState } from "react";

const Chat = ({ chat, messages }) => {
  const [message, setmessage] = useState("");
  const loggeduser = JSON.parse(localStorage.getItem("userdata"));

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
      <div className="bg-black/25 h-[90%] rounded-3xl p-3">
        {/* <div className="flex gap-2">
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
            <div className="p-1">Hello</div>
            <span className=" text-white/30 text-[12px] self-end">10:34</span>
          </div>
        </div> */}
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
                    {/* {console.log(chat)} */}
                  </div>
                  <div className="bg-white/15 max-w-[60%] rounded-xl p-1 flex gap-1">
                    <div className="p-1">{message.content}</div>
                    {/* <span className=" text-white/30 text-[12px] self-end">
                  10:34
                </span> */}
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 mt-3 static flex-row-reverse">
                  <div className="bg-white/15 max-w-[60%] rounded-xl p-1 flex gap-1">
                    <div className="p-1">{message.content}</div>
                    {/* <span className=" text-white/30 text-[12px] self-end">
                          10:34
                        </span> */}
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
  );
};

export default Chat;
