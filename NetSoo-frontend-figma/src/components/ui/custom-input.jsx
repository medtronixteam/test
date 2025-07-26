"use client";

import React, { useState, useEffect } from "react";

export const Input = React.forwardRef(
  (
    {
      className = "",
      label,
      error,
      icon,
      showPasswordToggle = false,
      type = "text",
      validateEmail = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const isPasswordInput = type === "password";
    const inputType = isPasswordInput && showPassword ? "text" : type;

    // Validate email if the type is "email"
    useEffect(() => {
      if (validateEmail && type === "email" && props.value) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(props.value)) {
          setEmailError("Please enter a valid email address.");
        } else {
          setEmailError("");
        }
      }
    }, [props.value, type, validateEmail]);

    return (
      <div className="w-full space-y-3">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-[15px] font-medium text-[#A8A8AA] uppercase tracking-wide"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full rounded-[8px]  p-5 text-md font-[600] text-[#D5D4D6] bg-transparent border-2 border-[#524E5C]
              placeholder:text-[#D5D4D6] focus:outline-none focus:ring-1 focus:ring-[#D5D4D6] focus:border-[#D5D4D6]
              disabled:opacity-50 disabled:bg-gray-100
              ${icon ? "pl-14" : ""}
              ${showPasswordToggle ? "pr-10" : ""}
              ${
                error || emailError
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : ""
              }
              ${className}
            `}
            type={inputType}
            {...props}
          />

          {isPasswordInput && showPasswordToggle && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center  text-[#A8A8AA] hover:text-[#D5D4D6]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {(error || emailError) && (
          <p className="text-sm text-red-600 mt-1">{error || emailError}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
