"use client";

import { useState, useEffect } from "react";
import {
  Search,
  MoreVertical,
  Smile,
  Paperclip,
  Send,
  CheckCheck,
  Check,
  Mic,
  Plus,
} from "lucide-react";
import Layout from "@/components/dashboard/Layout";
import { getPlatformIcon } from "@/utils/getPlatformIcon";
import SearchBar from "@/components/dashboard/SearchBar";
import { CustomButton } from "@/components/ui/custom-button";
import Link from "next/link";
import { useConversations } from "@/context/ConversationsContext";
import { useUserConnections } from "@/context/UserConnectionsContext";
import { getAllConversationMessages, sendMessage } from "@/api/inbox";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const InboxPage = () => {
  const { userConnections, userConnectionsLoading, userConnectionsError, userConnectionsChecked } = useUserConnections();
  const { userConversations, conversationsLoading, conversationsError } = useConversations();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  const [activeTab, setActiveTab] = useState("all");
  const [activeConversation, setActiveConversation] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  const { user, fetchUser,  isAuthenticated, isAuthChecked, setUser } = useUser(); 
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);


  if (!isAuthenticated) { return null}



  useEffect(() =>{
    console.log(userConversations);
    let newConversations = []
    for (const conversation of userConversations)
    {
      const dateObj = new Date(conversation.updated_at);

      const formattedConversationTime = `${String(dateObj.getDate()).padStart(2, '0')}/${
        String(dateObj.getMonth() + 1).padStart(2, '0')
      } ${String(dateObj.getHours()).padStart(2, '0')}:${
        String(dateObj.getMinutes()).padStart(2, '0')
      }`;
      newConversations.push({
        id : conversation.conversation_id,
        user: {
          name : conversation.participant_name,
          avatar: "/dashboard/dummy-image.jpg",
          isOnline: false,
          isPlatformVerified: true,
          platform: "facebook"
        },
        lastMessage : {
          content :  conversation.last_message,
          time : formattedConversationTime,
          isRead : false,
        },
        unreadCount : 0,
      });
    }
    setConversations(newConversations);
  }, [userConversations])

  const activeUser = conversations.find(
    (conv) => conv.id === activeConversation
  )?.user;

  const handleConversationSelect = async (conversation_id) => {
    // {
    //   id: 2,
    //   sender: "Me",
    //   content:
    //     "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit laborum.",
    //   time: "11:00 PM",
    //   isRead: true,
    //   avatar: "/dashboard/user2.png",
    //   isOnline: false,
    // },
    let allMessages = await getAllConversationMessages(localStorage.getItem("accessToken"), conversation_id)
    setActiveConversation(conversation_id);
    let newMessages = [];
    setMessageInput("");

    for (const message of allMessages)
    {

      const dateObj = new Date(message.timestamp);

      const formattedMessageTime = `${String(dateObj.getDate()).padStart(2, '0')}/${
        String(dateObj.getMonth() + 1).padStart(2, '0')
      } ${String(dateObj.getHours()).padStart(2, '0')}:${
        String(dateObj.getMinutes()).padStart(2, '0')
      }`;


      let messageSender;
      console.log(message);
      if (message.direction === "inbound" )
      {
        messageSender = "Other";
      }
      else{
        messageSender = "Me";
      }
      
      newMessages.push(
        {
          id: message.message_id,
          sender: messageSender,
          content: message.message_text,
          time: formattedMessageTime,
          isRead: true,
          avatar: "/dashboard/dummy-image.jpg",
          isOnline: false,
        }
      )
    }

    setMessages(newMessages)
    console.log(allMessages);
  };

  const handleSendMessage = async () => {
    if (activeConversation){
      if (messageInput.trim()) {
        console.log("Sending message:", messageInput);
        const currentConversation = userConversations.find(item => item.conversation_id === activeConversation);
        console.log(currentConversation);
        let resp = await sendMessage(localStorage.getItem("accessToken"), currentConversation.participant_id, messageInput);
        setMessageInput("");
        console.log(resp);

        const dateObj = new Date();

        const formattedMessageTime = `${String(dateObj.getDate()).padStart(2, '0')}/${
          String(dateObj.getMonth() + 1).padStart(2, '0')
        } ${String(dateObj.getHours()).padStart(2, '0')}:${
          String(dateObj.getMinutes()).padStart(2, '0')
        }`;

        let new_message = {
          id : resp.message_id,
          sender: "Me",
          content: messageInput,
          time: formattedMessageTime,
          isRead: true,
          avatar: "/dashboard/dummy-image.jpg",
          isOnline: false,
        }

        setMessages([...messages, new_message]);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const selectedPlatforms = ["facebook", "youtube", "tiktok", "linkedin"];


  if (userConnectionsChecked && userConnections.length === 0) 
    {
      return (
        <Layout>
          <div className="flex h-full justify-center items-center flex-col space-y-4  ">
          <img src={"/dashboard/NoAnalyticsYet.svg"} alt="" />
          <h2 className="text-3xl font-bold text-white">No Inbox Conversations Yet</h2>
          <p className="text-white/80 text-center">
            You haven't connected any social accounts. Once you
            <br /> connect your accounts, we'll have all your conversations right here.
          </p>
          <div>
            <Link href={"/dashboard/connections"} className="">
              <CustomButton className="w-full px-12">
                Connect Social Accounts
              </CustomButton>
            </Link>
          </div>
  
          </div> 
        </Layout>
     )
    }

  return (
    <Layout>
      {conversations?.length > 0 ? (
        <div className="flex h-screen  gap-5 text-white">
          {/* Left Sidebar */}
          <div className="w-[320px]  flex flex-col">
            {/* Social Media Icons */}
            <div className="flex items-center p-4 gap-3">
              {selectedPlatforms.slice(0, 4).map((platform, index) => (
                <div key={index} className="">
                  <img
                    src={getPlatformIcon(platform)}
                    alt={platform}
                    className="w-7 h-7 object-contain"
                  />
                </div>
              ))}

              <div className="cursor-pointer">
                <Plus size={20} />
              </div>
              <button className="ml-auto p-2 border border-[#4A4A4A] rounded-[8px] text-white  hover:bg-gray-800">
                <MoreVertical size={20} className="" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-4 mb-4">
              <SearchBar placeholder="Search here..." />
            </div>

            {/* Tabs */}
            <div className="flex px-4 gap-2 mb-4">
              <button
                className={`px-5 py-2.5 rounded-full text-sm ${
                  activeTab === "all"
                    ? "bg-[#3570BC] text-white"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All
              </button>
              <button
                className={`px-5 py-2.5 rounded-full text-sm flex items-center  border border-[#4A4A4A] ${
                  activeTab === "unread"
                    ? "bg-[#1e1e1e] text-white"
                    : "text-gray-400 "
                }`}
                onClick={() => setActiveTab("unread")}
              >
                Unread Messages
                <span className="ml-1.5 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  12
                </span>
              </button>
            </div>

            {/* Messages Count */}
            <div className="px-4 py-2 text-sm font-medium">
              All Messages (12)
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center p-3 mb-2 hover:bg-[#3570BC]/10 backdrop-blur-[4px] cursor-pointer rounded-[10px] ${
                    activeConversation === conversation.id
                      ? "bg-[#3570BC]/10 border border-[#3570BC]/10 "
                      : ""
                  }`}
                  onClick={() => handleConversationSelect(conversation.id)}
                >
                  <div className="relative">
                    <img
                      src={conversation.user.avatar || "/dummy-image.png"}
                      alt={conversation.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full "></div>
                    )}
                    {conversation.user.isPlatformVerified && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 rounded-full  flex items-center justify-center">
                        <img
                          src={getPlatformIcon(conversation.user.platform)}
                          alt={conversation.user.platform}
                          className="w-7 h-7 object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">
                        {conversation.user.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {conversation.lastMessage.time}
                      </span>
                    </div>
                    <div className=" flex justify-between gap-6 items-center">
                      <div className="w-full max-w-[180px] overflow-hidden">
                        <p className="text-sm text-gray-400 truncate mt-2">
                          {conversation.lastMessage.content}
                        </p>
                      </div>
                      {conversation.unreadCount > 0 ? (
                        <span className="mt-2 bg-[#3570BC] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      ) : conversation.lastMessage.isRead ? (
                        <CheckCheck size={20} className=" mt-2" />
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col border border-[#4A4A4A]  rounded-[16px] ">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4  rounded-t-[16px]  bg-gradient-to-r from-[#282828] ">
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={
                      activeUser?.avatar ||
                      "/placeholder.svg?height=40&width=40"
                    }
                    alt={activeUser?.name || "User"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {activeUser?.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#121212]"></div>
                  )}
                </div>
                <div className="ml-3">
                  <div className="font-medium">
                    {activeUser?.name || "Select a conversation"}
                  </div>
                  <div className="text-xs text-gray-400">
                    {activeUser?.isOnline ? "Online" : "Offline"}
                  </div>
                </div>
              </div>
              <button className="ml-auto p-2 border border-[#4A4A4A] rounded-[8px] text-white  hover:bg-gray-800">
                <MoreVertical size={20} className="" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 backdrop-blur-[4px]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-6 ${
                    message.sender === "Me" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender !== "Me" && (
                    <div className="relative mr-2">
                      <img
                        src={message.avatar || "/placeholder.svg"}
                        alt={message.sender}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%]  py-4 px-5 ${
                      message.sender === "Me"
                        ? "bg-[#3570BC] text-white rounded-[12px] rounded-tr-none"
                        : " text-white bg-[#232323] border border-[#4A4A4A] rounded-[12px] rounded-tl-none"
                    }`}
                  >
                    <p>{message.content}</p>
                    <div className="flex justify-end items-center mt-1 text-xs">
                      <span className="text-gray-300">{message.time}</span>
                      {message.sender === "Me" && (
                        <span className="ml-1">
                          {message.isRead ? (
                            <CheckCheck size={14} className="text-gray-300" />
                          ) : (
                            <Check size={14} className="text-gray-300" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 ">
              <div className="flex items-center bg-[#232323] rounded-[8px] p-2">
                <textarea
                  placeholder="Type here..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="ml-3 flex-1 bg-transparent border-none focus:outline-none resize-none max-h-20 text-md"
                  rows={1}
                />
                <div className="flex items-center gap-3">
                  <button className="cursor-pointer flex items-center justify-center">
                    <img
                      src="/dashboard/AI.svg"
                      alt="emoji"
                      className="w-6 h-6"
                    />
                  </button>
                  <button className="cursor-pointer flex items-center justify-center">
                    <img
                      src="/dashboard/smile.svg"
                      alt="emoji"
                      className="w-6 h-6"
                    />
                  </button>
                  <button className="cursor-pointer flex items-center justify-center">
                    <img
                      src="/dashboard/file.svg"
                      alt="emoji"
                      className="w-6 h-6"
                    />
                  </button>
                  <button
                    className="p-2 bg-[#3570BC] rounded-lg text-white cursor-pointer flex items-center justify-center"
                    onClick={handleSendMessage}
                  >
                    <img
                      src="/dashboard/submit.svg"
                      alt="emoji"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full justify-center items-center flex-col space-y-4  ">
          <img src={"/dashboard/NoConversationsYet.svg"} alt="" />
          <h2 className="text-3xl font-bold text-white">
            No Conversations Yet
          </h2>
          <p className="text-white/80 text-center">
            Once your accounts are connected and messages start coming in,
            you’ll manage <br /> them all from here — in one place
          </p>
          <div>
            <Link href={"/social-networks"} className="">
              <CustomButton className="w-full px-12">
                Connect Social Accounts
              </CustomButton>
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default InboxPage;
