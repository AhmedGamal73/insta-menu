import React from "react";

const LoadingFullScreen = () => {
  return (
    <div className="flex items-center fixed inset-0 justify-center z-50 bg-black bg-opacity-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
  );
};

export default LoadingFullScreen;
