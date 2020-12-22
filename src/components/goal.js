import * as React from "react";
import CalendarHeatmap from "react-calendar-heatmap";

const Goal = ({ name, subtitle, dates }) => {
  return (
    <React.Fragment>
      <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
      <p className="mb-4 text-blueGray-600">{subtitle}</p>
      <div className="max-w-3xl bg-white rounded-lg shadow-sm sm:pt-6 pt-3 sm:pr-8 pr-4 sm:pl-4 pl-2">
        <p className="ml-3 mb-2 font-semibold text-sm text-blueGray-500">
          Days Tracked
        </p>
        <CalendarHeatmap
          showWeekdayLabels
          horizontal={true}
          weekdayLabels={["S", "M", "T", "W", "Th", "F", "S"]}
          startDate={new Date("2020-12-31")}
          endDate={new Date("2021-12-31")}
          values={dates}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-scale-${value.count}`;
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default Goal;
