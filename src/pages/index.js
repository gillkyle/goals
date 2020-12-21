import * as React from "react";
import { graphql } from "gatsby";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import Portrait from "../images/portrait-square-small.jpg";
import "../styles/chart.css";

const IndexPage = ({ data }) => {
  console.log(data);
  const dates = data.allAirtable.nodes.map((node) => {
    let colorDensity = 0;
    // const date = format(new Date(node.data.Day), `yyyy-MM-dd`);
    if (node.data.Status === `Done`) {
      colorDensity = 3;
    } else if (node.data.Status === `Pass`) {
      colorDensity = 2;
    } else if (node.data.Status === `Failed`) {
      colorDensity = 1;
    } else if (node.data.Status === `Not Started`) {
      colorDensity = 0;
    } else if (node.data.Status === null) {
      return {};
    }
    return { date: node.data.Day, count: colorDensity };
  });
  console.log(dates);
  return (
    <main
      className="h-full"
      style={{
        fontFamily: `fontFamily: "Inter, -apple-system, sans-serif, serif",`,
      }}
    >
      <title>Home Page</title>
      <section className="flex space-x-4 items-center width-100 px-10 pt-10 pb-16 bg-gradient-to-br from-lightBlue-400 to-indigo-500">
        <div className="">
          <img
            className="border-blueGray-200 border-4 rounded-full max-h-32 max-w-32 shadow-lg"
            src={Portrait}
          />
        </div>
        <div className="">
          <h1 className="text-2xl leading-6 font-bold text-white">Goals</h1>
          <p className="text-lg text-blueGray-300">Kyle Gill | 2021</p>
        </div>
      </section>
      <section className="p-10 bg-blueGray-50 h-full">
        <div className="bg-white text-gray-600 rounded-xl shadow-md p-4 transform -translate-y-16">
          <a
            href="https://airtable.com/shrUpUS4fnwJInCVn"
            target="_blank"
            rel="noopener"
            className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-sm px-3 py-2 text-white font-semibold mr-1"
          >
            View &rarr;
          </a>{" "}
          the airtable where the data is coming from.
        </div>
        <h2 className="text-2xl leading-6 font-bold text-gray-800">
          Arise at 6:30am
        </h2>
        <p className="mb-4">Every day from M-F.</p>
        <div className="max-w-3xl">
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
      </section>
    </main>
  );
};

export default IndexPage;

export const query = graphql`
  {
    allAirtable(filter: { table: { eq: "Wake" } }) {
      nodes {
        id
        table
        data {
          Day
          Status
        }
      }
    }
  }
`;
