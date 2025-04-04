export const ChatBubble = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
        }`}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};
