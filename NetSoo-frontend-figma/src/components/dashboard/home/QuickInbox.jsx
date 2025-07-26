import { getPlatformIcon } from "@/utils/getPlatformIcon";
import Image from "next/image";

export const QuickInbox = ({ messages }) => {
  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <div key={message.id} className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative mr-3">
              <Image
                src={message.avatar || "/placeholder.svg"}
                alt={message.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className={`absolute -bottom-1 -right-2`}>
                <img
                  src={getPlatformIcon(message.platform)}
                  alt={message.platform}
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div>
              <h4 className="text-white text-md font-medium">{message.name}</h4>
              <p className="text-[#FFFFFF99] text-sm truncate w-48 mt-1">
                {message.message}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#FFFFFF99] text-sm">{message.time}</p>
            <div className="bg-[#3570BC] text-white text-sm rounded-full w-6 h-6 flex items-center justify-center ml-auto mt-1">
              {message.unread}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
