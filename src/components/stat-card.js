import * as React from "react";

const StatCard = ({ title, invert = false, addendum, number, ...props }) => {
  return (
    <div
      className={`${props.className} shadow-sm rounded-lg bg-white sm:p-6 p-3`}
    >
      <h3 className="font-semibold text-sm text-blueGray-500">{title}</h3>
      {invert && (
        <p className="font-bold text-3xl text-red-300">
          {number}
          <span className="text-sm">{title.includes(`%`) && `%`}</span>
        </p>
      )}
      {!invert && (
        <p className="font-bold text-3xl text-lime-600">
          {number}
          {addendum && <span className="text-sm">{addendum}</span>}
        </p>
      )}
    </div>
  );
};

export default StatCard;
