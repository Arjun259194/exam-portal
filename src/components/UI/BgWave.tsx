import React from "react";

const BlueGreenWavesComponent: React.FC = () => {
  return (
    <div className="bg-blue-500 h-screen relative overflow-hidden">
      {/* Green waves */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current text-green-500"
        >
          <path
            fillOpacity="1"
            d="M0,224L34.3,192C68.6,160,137,96,206,85.3C274.3,75,343,117,411,122.7C480,128,549,96,617,96C685.7,96,754,128,823,122.7C891.4,117,960,75,1029,74.7C1097.1,75,1166,117,1234,128C1302.9,139,1371,117,1406,106.7L1440,96L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,685,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,68,0,34,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="flex items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold">Blue Background with Green Waves</h1>
      </div>
    </div>
  );
};

export default BlueGreenWavesComponent;
