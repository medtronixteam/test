"use client";

import React from "react";

export const CustomButton = React.forwardRef(
  (
    {
      className = "",
      variant = "primary",
      size = "lg",
      isLoading = false,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      "cursor-pointer inline-flex items-center text-[18px] justify-center rounded-[138px] font-[600] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    // Variant styles
    const variantStyles = {
      primary:
        "bg-[#3570BC] text-white hover:bg-blue-600 focus-visible:ring-[#3570BC]",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
      outline:
        "border-2 border-[#524E5C] text-white bg-transparent  hover:border-white",
      outlineDark:
        "border-2 border-primary text-primary bg-transparent hover:bg-[#F0F0F0] focus-visible:ring-gray-500",
    };

    // Size styles
    const sizeStyles = {
      sm: "text-sm px-3 py-1.5 h-8",
      md: "text-sm px-4 py-2 h-10",
      lg: "text-base px-5 py-2.5 h-[64px]",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

CustomButton.displayName = "Button";
