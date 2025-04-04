import React from "react";

export const Badge = ({ children, variant = "info", size = "sm" }) => {
  const variants = {
    info: "bg-blue-50 text-blue-700 border-blue-100",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-100",
    urgent: "bg-red-50 text-red-700 border-red-100",
    success: "bg-green-50 text-green-700 border-green-100",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
};
