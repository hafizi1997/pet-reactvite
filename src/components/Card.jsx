export const Card = ({ children, className = "" }) => {
  return (
    <div className={`p-5 rounded-xl shadow-sm ${className}`}>
      {children}
    </div>
  );
};
