export function CustomSwitch({ checked, onCheckedChange, disabled = false }) {
  return (
    <div
      className={`w-12 h-7 rounded-full flex items-center p-1 cursor-pointer transition-all duration-200
        ${checked ? "bg-[#3570BC] justify-end" : "bg-[#414344] justify-start"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={() => {
        if (!disabled) {
          onCheckedChange(!checked);
        }
      }}
    >
      <div
        className={`w-5 h-5 rounded-full transition-all duration-200
          ${checked ? "bg-white" : "bg-[#5A5C5E]"}`}
      />
    </div>
  );
}
