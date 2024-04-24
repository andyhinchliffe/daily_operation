import React from 'react';

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="flex bg-cover bg-center items-center justify-center w-full"
        style={{ backgroundImage: "url('/background2.jpeg')" }}
      >
        <h1 className="text-center w-full mix-blend-lighten font-bold text-black bg-white text-9xl">DAILY OPERATION</h1>
      </div>
    </div>
  );
};

export default Page;
