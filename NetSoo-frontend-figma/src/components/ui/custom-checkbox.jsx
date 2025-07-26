"use client";

import React from "react";

export const Checkbox = React.forwardRef(
  ({ className = "", label, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          type="checkbox"
          className={`
            h-4 w-4  text-[#3570BC] rounded-[1.67px]
            focus:ring-[#3570BC] focus:ring-offset-0
            ${className}
          `}
          {...props}
        />
        {label && (
          <label
            htmlFor={props.id}
            className="ml-3 block text-md text-[#A8A8AA] "
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
