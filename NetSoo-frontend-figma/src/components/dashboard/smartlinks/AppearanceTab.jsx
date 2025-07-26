import { useState } from "react";

const themes = [
  { id: "dark", name: "Dark", primaryColor: "#1a1a1a" },
  { id: "blue", name: "Blue", primaryColor: "#1e3a5f" },
  { id: "brown", name: "Brown", primaryColor: "#3d2c1f" },
  { id: "purple", name: "Purple", primaryColor: "#3d1a45" },
  { id: "green", name: "Green", primaryColor: "#1e3b2c" },
];

const initialColors = [
  "#1a1a1a", "#2d2d2d", "#3a3a3a", "#4a4a4a", "#5a5a5a", "#6a6a6a",
  "#1e3a5f", "#2c4a7c", "#3d5a8c", "#4d6a9c", "#5d7aac", "#6d8abc",
  "#3d2c1f", "#4d3c2f", "#5d4c3f", "#6d5c4f", "#7d6c5f", "#8d7c6f",
  "#3d1a45", "#4d2a55", "#5d3a65", "#6d4a75", "#7d5a85", "#8d6a95",
  "#1e3b2c", "#2e4b3c", "#3e5b4c", "#4e6b5c", "#5e7b6c", "#6e8b7c",
];

const AppearanceTab = ({ userData, setUserData }) => {
  const [selectedTheme, setSelectedTheme] = useState(userData?.theme || "dark");
  const [backgroundColorEnabled, setBackgroundColorEnabled] = useState(userData?.customBackgroundEnabled || false);
  const [selectedColor, setSelectedColor] = useState(userData?.backgroundColor || "#1a1a1a");
  const [colorOptions, setColorOptions] = useState(initialColors);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newColor, setNewColor] = useState("#ffffff");

  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
    setUserData({ ...userData, theme: themeId });
  };

  const handleBackgroundToggle = () => {
    const newState = !backgroundColorEnabled;
    setBackgroundColorEnabled(newState);
    setUserData({ ...userData, customBackgroundEnabled: newState });
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setUserData({ ...userData, backgroundColor: color });
  };

  const handleAddColor = () => {
    if (!colorOptions.includes(newColor)) {
      const updatedColors = [...colorOptions, newColor];
      setColorOptions(updatedColors);
      setSelectedColor(newColor);
      setUserData({ ...userData, backgroundColor: newColor });
    }
    setShowColorPicker(false);
  };

  return (
    <div className="text-white px-5 py-6 space-y-6">
      {/* Theme */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Theme</h2>
        <div className="flex gap-4 flex-wrap">
          {themes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`w-[125px] h-[200px] rounded-lg p-3 flex flex-col gap-3 cursor-pointer border transition-all duration-200 ${
                selectedTheme === theme.id
                  ? "border-white"
                  : "border-transparent hover:border-zinc-500"
              }`}
              style={{ backgroundColor: theme.primaryColor }}
            >
              <div className="w-10 h-10 rounded-full bg-white/10 mb-2" />
              <div className="flex flex-col gap-2">
                {[100, 80, 90, 70, 60].map((w, i) => (
                  <div
                    key={i}
                    className="h-2 bg-white/10 rounded"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Color */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold mb-4">Background Color</h2>
          <div
            onClick={handleBackgroundToggle}
            className={`w-10 h-5 rounded-full cursor-pointer transition relative ${
              backgroundColorEnabled ? "bg-[#3570BC]" : "bg-zinc-700"
            }`}
          >
            <div
              className={`absolute top-[2px] w-4 h-4 rounded-full transition-all ${
                backgroundColorEnabled
                  ? "left-[22px] bg-white"
                  : "left-[2px] bg-zinc-500"
              }`}
            />
          </div>
        </div>

        {backgroundColorEnabled && (
          <>
            <div className="flex gap-3 flex-wrap">
              {colorOptions.map((color, index) => (
                <div
                  key={index}
                  onClick={() => handleColorSelect(color)}
                  className={`w-10 h-10 rounded-[7px] cursor-pointer`}
                  style={{
                    backgroundColor: color,
                    border: selectedColor === color ? "2px solid #fff" : "none",
                  }}
                />
              ))}
              <div
                className="w-10 h-10 rounded border border-dashed border-zinc-500 text-zinc-500 flex items-center justify-center text-xl cursor-pointer"
                onClick={() => setShowColorPicker(true)}
              >
                +
              </div>
            </div>

            {showColorPicker && (
              <div className="mt-4 flex items-center gap-4">
                <input
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-10 h-10 p-0 border-none rounded"
                />
                <button
                  onClick={handleAddColor}
                  className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-sm"
                >
                  Add Color
                </button>
                <button
                  onClick={() => setShowColorPicker(false)}
                  className="text-sm text-gray-400 hover:text-gray-200"
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AppearanceTab;
