import * as React from "react";

const StatCard = ({ title, invert = false, number }) => {
  return (
    <div className="shadow-sm rounded-lg bg-white sm:p-6 p-3">
      <h3 className="font-semibold text-sm text-blueGray-500">{title}</h3>
      {invert && (
        <p className="font-bold text-3xl text-red-400">
          {number}
          <span className="text-sm">{title.includes(`%`) && `%`}</span>
        </p>
      )}
      {!invert && (
        <p className="font-bold text-3xl text-lime-600">
          {number}
          <span className="text-sm">{title.includes(`%`) && `%`}</span>
        </p>
      )}
    </div>
  );
};

export default StatCard;
