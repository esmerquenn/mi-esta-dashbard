import React from "react";

function Loading() {
  return (
    <div className="flex space-x-2 justify-center items-center h-screen">
      <span className="sr-only">Loading...</span>
      <div className="h-6 w-6 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-6 w-6 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-6 w-6  bg-gray-900 rounded-full animate-bounce"></div>
    </div>
  );
}

export default Loading;
