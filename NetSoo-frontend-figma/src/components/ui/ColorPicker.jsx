"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

export default function ColorPicker({
  title = "Text Color",
  initialColor = "#3C3C3C",
  onColorSelect,
  onClose,
}) {
  const [color, setColor] = useState(initialColor);
  const [isDraggingGradient, setIsDraggingGradient] = useState(false);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [gradientPosition, setGradientPosition] = useState({ x: 0, y: 0 });
  const [hue, setHue] = useState(240);

  const gradientRef = useRef(null);
  const sliderRef = useRef(null);

  const predefinedColors = [
    "#000000",
    "#FFFFFF",
    "#E8E8E8",
    "#4CAF50",
    "#5DADE2",
    "#5B5EA6",
    "#C0392B",
    "#2E4053",
    "#A9CCE3",
    "#1ABC9C",
    "#9B59B6",
    "#3498DB",
    "#2ECC71",
    "#F1C40F",
    "#E74C3C",
    "#7D3C98",
    "#FADBD8",
    "#82E0AA",
    "#85C1E9",
    "#F8C471",
    "#73C6B6",
    "#7FB3D5",
    "#E59866",
    "#BB8FCE",
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onColorSelect) {
        onColorSelect(color);
      }
    }, 100); // delay to reduce spam
  
    return () => clearTimeout(timeout);
  }, [color, onColorSelect]);
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingGradient && gradientRef.current) {
        const rect = gradientRef.current.getBoundingClientRect();
        const x = Math.max(
          0,
          Math.min(1, (e.clientX - rect.left) / rect.width)
        );
        const y = Math.max(
          0,
          Math.min(1, (e.clientY - rect.top) / rect.height)
        );

        setGradientPosition({ x, y });
        updateColorFromPosition(x, y, hue);
      } else if (isDraggingSlider && sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = Math.max(
          0,
          Math.min(1, (e.clientX - rect.left) / rect.width)
        );
        setHue(x * 360);
        updateColorFromPosition(
          gradientPosition.x,
          gradientPosition.y,
          x * 360
        );
      }
    };

    const handleMouseUp = () => {
        setIsDraggingGradient(false);
        setIsDraggingSlider(false);
      
        if (onColorSelect) {
          onColorSelect(color);
        }
      };

    if (isDraggingGradient || isDraggingSlider) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingGradient, isDraggingSlider, hue, gradientPosition]);

  const updateColorFromPosition = (x, y, hue) => {
    // Convert HSV to RGB
    const s = x;
    const v = 1 - y;
    const h = hue / 360;

    let r, g, b;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
      default:
        r = 0;
        g = 0;
        b = 0;
    }

    const hexColor = `#${Math.round(r * 255)
      .toString(16)
      .padStart(2, "0")}${Math.round(g * 255)
      .toString(16)
      .padStart(2, "0")}${Math.round(b * 255)
      .toString(16)
      .padStart(2, "0")}`.toUpperCase();
    setColor(hexColor);
  };

  const handleGradientMouseDown = (e) => {
    if (gradientRef.current) {
      const rect = gradientRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setGradientPosition({ x, y });
      updateColorFromPosition(x, y, hue);
      setIsDraggingGradient(true);
    }
  };

  const handleSliderMouseDown = (e) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      setHue(x * 360);
      updateColorFromPosition(gradientPosition.x, gradientPosition.y, x * 360);
      setIsDraggingSlider(true);
    }
  };

  const handlePredefinedColorClick = (predefinedColor) => {
    setColor(predefinedColor);
  };

  return (
    <div className="absolute top-10  z-50">
      <div className=" w-64 bg-[#2B2B2B] text-white rounded-lg shadow-lg p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Color gradient */}
        <div
          ref={gradientRef}
          className="relative w-full h-56 rounded cursor-pointer"
          style={{
            background: `linear-gradient(to right, white, hsl(${hue}, 100%, 50%))`,
            backgroundImage: `
            linear-gradient(to right, white, hsl(${hue}, 100%, 50%)),
            linear-gradient(to bottom, transparent, black)
          `,
            backgroundBlendMode: "multiply",
          }}
          onMouseDown={handleGradientMouseDown}
        >
          <div
            className="absolute w-3 h-3 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${gradientPosition.x * 100}%`,
              top: `${gradientPosition.y * 100}%`,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
            }}
          />
        </div>

        {/* Hue slider */}
        <div
          ref={sliderRef}
          className="relative w-full h-5 rounded cursor-pointer"
          style={{
            background:
              "linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)",
          }}
          onMouseDown={handleSliderMouseDown}
        >
          <div
            className="absolute w-4 h-5 rounded-sm border-2 border-white transform -translate-x-1/2 top-0 pointer-events-none"
            style={{
              left: `${(hue / 360) * 100}%`,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
            }}
          />
        </div>

        {/* Hex value */}
        <div className="flex justify-between items-center">
          <span className="text-sm">Hex</span>
          <div className="bg-zinc-800 rounded px-2 py-1 text-sm">
            {color.toUpperCase()}
          </div>
        </div>

        {/* Predefined colors */}
        <div>
          <h4 className="text-sm mb-2">Predefined Colors</h4>
          <div className="grid grid-cols-8 gap-1">
            {predefinedColors.map((predefinedColor, index) => (
              <button
                key={index}
                className="w-6 h-6 rounded-sm border border-zinc-700 cursor-pointer"
                style={{ backgroundColor: predefinedColor }}
                onClick={() => handlePredefinedColorClick(predefinedColor)}
                aria-label={`Color ${predefinedColor}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
