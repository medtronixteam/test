import React, { useState } from "react";
import { getPlatformIcon } from "@/utils/getPlatformIcon";
import { ChevronDown, Copy, GripHorizontal, XIcon } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ColorPicker from "@/components/ui/ColorPicker";

const ButtonsTab = ({ links, setLinks }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Function to toggle disable state
  const toggleDisable = (id) => {
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, disabled: !link.disabled } : link
      )
    );
  };

  // Function to update link URL
  const updateLinkUrl = (id, newUrl) => {
    setLinks(
      links.map((link) => (link.id === id ? { ...link, url: newUrl } : link))
    );
  };

  // Function to update custom button text
  const updateButtonText = (id, text) => {
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, buttonText: text } : link
      )
    );
  };

  // Function to remove a link
  const removeLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  // Function to clone a link
  const cloneLink = (id) => {
    const linkToClone = links.find((link) => link.id === id);
    if (linkToClone) {
      const newLink = {
        ...linkToClone,
        id: Math.max(...links.map((l) => l.id)) + 1,
      };
      setLinks([...links, newLink]);
    }
  };

  // Function to add a new button
  const addButton = () => {
    const newId = Math.max(...links.map((l) => l.id)) + 1;
    setLinks([
      ...links,
      {
        id: newId,
        type: "link",
        label: "New Link",
        icon: null,
        url: "",
        disabled: false,
        textColor: "#FFFFFF",
        bgColor: "transparent",
        borderColor: "#FFFFFF30",
      },
    ]);
  };

  // Function to add a new section
  const addSection = () => {
    const newId = Math.max(...links.map((l) => l.id)) + 1;
    setLinks([
      ...links,
      {
        id: newId,
        type: "header",
        label: "New Section",
        icon: null,
        url: "",
        disabled: false,
        textColor: "#FFFFFF",
        bgColor: "transparent",
        borderColor: "#FFFFFF30",
      },
    ]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newLinks = Array.from(links);
    const [reorderedItem] = newLinks.splice(result.source.index, 1);
    newLinks.splice(result.destination.index, 0, reorderedItem);
    setLinks(newLinks);
  };

  const handleColorChange = (linkId, colorType, color) => {
    setLinks(
      links.map((link) =>
        link.id === linkId ? { ...link, [colorType]: color } : link
      )
    );
  };
  return (
    <div>
      <div className="p-5">
        <div className=" flex justify-center gap-4">
          <button
            onClick={addButton}
            className="border border-[#FFFFFF30]  hover:bg-zinc-700 text-zinc-300 w-full px-4 py-3 rounded-[8px] text-md flex justify-center items-center gap-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.6" clipPath="url(#clip0_2307_1236)">
                <path
                  d="M10 16V21"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 16V21"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 9H15L14 16H10L9 9Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 11C6.333 9.667 7.667 9 9 9"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 11C17.667 9.667 16.333 9 15 9"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 4C10 4.53043 10.2107 5.03914 10.5858 5.41421C10.9609 5.78929 11.4696 6 12 6C12.5304 6 13.0391 5.78929 13.4142 5.41421C13.7893 5.03914 14 4.53043 14 4C14 3.46957 13.7893 2.96086 13.4142 2.58579C13.0391 2.21071 12.5304 2 12 2C11.4696 2 10.9609 2.21071 10.5858 2.58579C10.2107 2.96086 10 3.46957 10 4Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2307_1236">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Add Button
          </button>
          <button
            onClick={addSection}
            className="border border-[#FFFFFF30]  hover:bg-zinc-700 text-zinc-300 w-full px-4 py-3 rounded-[8px] text-md flex justify-center items-center gap-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.6" clipPath="url(#clip0_2307_1236)">
                <path
                  d="M10 16V21"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 16V21"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 9H15L14 16H10L9 9Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 11C6.333 9.667 7.667 9 9 9"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 11C17.667 9.667 16.333 9 15 9"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 4C10 4.53043 10.2107 5.03914 10.5858 5.41421C10.9609 5.78929 11.4696 6 12 6C12.5304 6 13.0391 5.78929 13.4142 5.41421C13.7893 5.03914 14 4.53043 14 4C14 3.46957 13.7893 2.96086 13.4142 2.58579C13.0391 2.21071 12.5304 2 12 2C11.4696 2 10.9609 2.21071 10.5858 2.58579C10.2107 2.96086 10 3.46957 10 4Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2307_1236">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Add Section
          </button>
        </div>
        <div className="border-t border-[#393939] my-6"></div>
        <div className="">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="socialLinks" isDropDisabled={false}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {links.map((link, index) => (
                    <Draggable
                      draggableId={link.id.toString()}
                      index={index}
                      key={link.id}
                    >
                      {(provided) => (
                        <div
                          className="mb-4"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          {link.type === "header" && (
                            <>
                              <div className="flex items-center gap-2">
                                <div {...provided.dragHandleProps}>
                                  <GripHorizontal className="text-gray-400 cursor-move w-5 h-5" />
                                </div>
                                <input
                                  type="text"
                                  value={link.label}
                                  className="flex-1 px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
                                  onChange={(e) => {
                                    setLinks(
                                      links.map((l) =>
                                        l.id === link.id
                                          ? { ...l, label: e.target.value }
                                          : l
                                      )
                                    );
                                  }}
                                />
                                <button
                                  onClick={() => removeLink(link.id)}
                                  className="text-gray-500"
                                >
                                  <XIcon className="w-5 h-5" />
                                </button>
                              </div>
                              <div className="flex justify-between px-7 mt-3 relative">
                                <div className="flex items-center gap-2 ">
                                  <div className=" flex items-center gap-2 border border-zinc-700 rounded-[6px] px-3 py-1">
                                    <div
                                      onClick={() =>
                                        setShowColorPicker(link.id)
                                      }
                                      className="w-4 h-4 rounded border border-gray-300 "
                                      style={{
                                        backgroundColor: link.textColor,
                                      }}
                                    />
                                    <span className="text-sm">Text</span>
                                    {showColorPicker === link.id && (
                                      <ColorPicker
                                        onClose={() =>
                                          setShowColorPicker(false)
                                        }
                                        onColorSelect={(color) =>
                                          handleColorChange(
                                            link.id,
                                            "textColor",
                                            color
                                          )
                                        }
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {link.type === "link" && (
                            <>
                              <div className="flex items-center mt-4 gap-2">
                                <div {...provided.dragHandleProps}>
                                  <GripHorizontal className="text-gray-400 cursor-move w-5 h-5" />
                                </div>
                                <div className="relative w-48">
                                  <div className="px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] bg-[#1e1e1e]">
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={getPlatformIcon(link.label)}
                                        alt={link.label}
                                        className="w-5 h-5"
                                      />
                                      <span className="text-white">
                                        {link.label}
                                      </span>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                                  </div>
                                </div>

                                <input
                                  type="text"
                                  placeholder={`Paste ${link.label} url here...`}
                                  className="flex-1 px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
                                  value={link.url}
                                  onChange={(e) =>
                                    updateLinkUrl(link.id, e.target.value)
                                  }
                                />
                                <button
                                  onClick={() => removeLink(link.id)}
                                  className="text-gray-500 ml-auto"
                                >
                                  <XIcon className="w-5 h-5" />
                                </button>
                              </div>

                              <div className="flex justify-between px-7 mt-3">
                                <div className="flex items-center gap-2">
                                  {["textColor", "bgColor", "borderColor"].map(
                                    (type) => (
                                      <div
                                        key={type}
                                        className="relative flex items-center gap-2 border border-zinc-700 rounded-[6px] px-3 py-1"
                                      >
                                        <div
                                          onClick={() =>
                                            setShowColorPicker({
                                              id: link.id,
                                              type,
                                            })
                                          }
                                          className="w-4 h-4 rounded border border-gray-300 cursor-pointer"
                                          style={{
                                            backgroundColor: link[type],
                                          }}
                                        />
                                        <span className="text-sm capitalize">
                                          {type === "textColor"
                                            ? "Text"
                                            : type === "bgColor"
                                            ? "Background"
                                            : "Border"}
                                        </span>

                                        {showColorPicker?.id === link.id &&
                                          showColorPicker?.type === type && (
                                            <ColorPicker
                                              title={type}
                                              onClose={() =>
                                                setShowColorPicker(null)
                                              }
                                              onColorSelect={(color) =>
                                                handleColorChange(
                                                  link.id,
                                                  type,
                                                  color
                                                )
                                              }
                                            />
                                          )}
                                      </div>
                                    )
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    className="text-gray-500"
                                    onClick={() => toggleDisable(link.id)}
                                  >
                                    <div
                                      className={`w-10 h-5 rounded-full bg-[#2A2A2A] relative ${
                                        link.disabled ? "" : "bg-gray-600"
                                      }`}
                                    >
                                      <div
                                        className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-all ${
                                          link.disabled
                                            ? "left-0.5"
                                            : "left-[calc(100%-1.1rem)]"
                                        }`}
                                      ></div>
                                    </div>
                                  </button>
                                  <button
                                    className="flex items-center gap-1 border border-zinc-700 rounded-[6px] px-3 py-1 text-sm"
                                    onClick={() => cloneLink(link.id)}
                                  >
                                    <Copy className="w-4 h-4" />
                                    Clone
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default ButtonsTab;
