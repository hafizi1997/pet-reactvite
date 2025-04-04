export const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg transition-colors";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-green-500 text-white hover:bg-green-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    delete: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
