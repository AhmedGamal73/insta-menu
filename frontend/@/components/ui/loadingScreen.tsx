import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center z-50 bg-opacity-50 py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-primary"></div>
    </div>
  );
};

export default LoadingScreen;
