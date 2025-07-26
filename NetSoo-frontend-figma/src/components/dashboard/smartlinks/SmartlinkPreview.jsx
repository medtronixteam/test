import { getPlatformIcon } from "@/utils/getPlatformIcon";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const SmartlinkPreview = ({ links, userData }) => {
  return (
    <div className="border border-[#FFFFFF30] rounded-[8px] w-full mt-12 p-5">
      <div className="mb-4 mx-auto flex justify-center items-center flex-col mt-8">
        <Image
          src="/dashboard/dummy-image.jpg"
          alt="Profile"
          width={150}
          height={150}
          className="rounded-full border-2 border-zinc-700"
        />
        <h2 className="text-2xl font-bold my-6">
          {links.find((l) => l.id === 1)?.label || "Shoei Baro"}
        </h2>
      </div>

      <div className="w-full space-y-3 mb-12">
        {links
          .filter((link) => !link.disabled)
          .map((link) => {
            if (link.type === "header" && link.id !== 1) {
              return (
                <div
                  key={link.id}
                  className="text-center text-sm text-zinc-400 py-2"
                >
                  {link.label}
                </div>
              );
            }

            if (link.type === "link") {
              const buttonText = link.buttonText?.trim()
                ? link.buttonText
                : link.label === "Website"
                ? "Visit our website"
                : `Follow us on ${link.label}`;

              const style = {
                color: link.textColor || "#FFFFFF",
                backgroundColor: link.bgColor || "transparent",
                border: `1px solid ${link.borderColor || "#FFFFFF30"}`,
              };

              return (
                <a
                  key={link.id}
                  href={link.url || "#"}
                  className="flex items-center justify-between px-4 py-3 rounded-[88px] w-full backdrop-blur-[101.51px] hover:opacity-80 transition"
                  style={style}
                >
                  {link.icon && (
                    <img
                      src={getPlatformIcon(link.label)}
                      alt={link.label}
                      className="w-6 h-6"
                    />
                  )}
                  <span>{buttonText}</span>

                  <ArrowUpRight className="w-4 h-4" />
                </a>
              );
            }

            return null;
          })}

        <a
          href="#"
          className="flex items-center justify-center backdrop-blur-[101.51px] hover:bg-zinc-700 text-white px-4 py-3 rounded-[88px] w-full border border-[#FFFFFF30]"
        >
          <span>Send us an email</span>
        </a>
      </div>
    </div>
  );
};

export default SmartlinkPreview;
