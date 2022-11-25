import React from 'react';

const Loading = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <div className="w-20 h-20 border-l-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    </>
  );
};

export default Loading;