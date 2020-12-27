import * as React from "react";
import { Helmet } from "react-helmet";
import { getDayOfYear, getYear } from "date-fns";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import "react-calendar-heatmap/dist/styles.css";
import "../styles/chart.css";

import Goal from "../components/goal";
import StatCard from "../components/stat-card";
import Fingerprint from "../icons/fingerprint";
import Calendar from "../icons/calendar";

// const FAKE_DATE = "2021-01-05"; used to debug

const calculate = (nodes) => {
  let completed = 0;
  let failed = 0;
  const dates = nodes
    .filter((node) => {
      const year = getYear(new Date());
      console.log({ year });
      console.log(node.data.Day);
      return node.data.Day.includes(String(year));
    })
    .map((node) => {
      let colorDensity = 0;

      if (node.data.Status === `Done`) {
        completed += 1;
        colorDensity = 3;
      } else if (node.data.Status === `Pass`) {
        colorDensity = 2;
      } else if (node.data.Status === `Failed`) {
        failed += 1;
        colorDensity = 1;
      } else if (node.data.Status === `Not Started`) {
        colorDensity = 0;
      } else if (node.data.Status === null) {
        return {};
      }
      return { date: node.data.Day, count: colorDensity };
    });

  return {
    dates,
    completed,
    failed,
  };
};

const IndexPage = ({ data }) => {
  const wake = calculate(data.wake.nodes);
  const study = calculate(data.study.nodes);
  const temple = calculate(data.temple.nodes);

  const dayOfYear = getDayOfYear(new Date()) + 1;

  return (
    <main
      className="h-full"
      style={{
        fontFamily: `fontFamily: "Inter, -apple-system, sans-serif, serif",`,
      }}
    >
      <Helmet>
        <html lang="en" />
        <title>Goal Tracker</title>
      </Helmet>
      <section className="flex space-x-4 items-center width-100 sm:px-10 px-4 pt-10 pb-16 bg-gradient-to-br from-lightBlue-400 to-indigo-500">
        <div>
          {/* <img
            src={Portrait}
            className="border-blueGray-200 border-4 rounded-full max-h-32 max-w-32 shadow-lg"
          /> */}
          <StaticImage
            src="../images/portrait-square-small.jpg"
            className="border-blueGray-200 border-4 rounded-full shadow-lg"
            width={120}
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Goals</h1>
          <div className="flex space-x-2 items-center text-white text-xs mb-1 italic ">
            "...by small and simple things are great things brought to pass"
          </div>
          <div className="flex space-x-2 items-center">
            <Fingerprint className="fill-current text-orange-400 h-5" />
            <p className="text-md text-orange-100">Kyle Gill</p>
          </div>
          <div className="flex space-x-2 items-center">
            <Calendar className="stroke-current text-orange-400 h-5" />
            <p className="text-md text-orange-100">2021</p>
          </div>
        </div>
      </section>
      <section className="sm:px-10 px-4 py-9 bg-trueGray-100 h-full">
        <div className="bg-white text-gray-600 rounded-xl shadow-md p-4 pr-6 transform -translate-y-16 w-max">
          <a
            href="https://airtable.com/shrUpUS4fnwJInCVn"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-sm px-3 py-2 text-white font-semibold mr-1"
          >
            View &rarr;
          </a>{" "}
          the data in Airtable
        </div>
        {/* STUDY GOAL */}
        <Goal
          name="Daily scripture study"
          subtitle="Write down something I learned every day of the week."
          dates={study.dates}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-4 mt-4 mb-8 max-w-3xl">
          <StatCard title="Done Days" number={study.completed} />
          <StatCard
            title="Failed Days"
            number={study.failed}
            invert={study.failed !== 0}
          />
          <StatCard title="Day of Year" number={dayOfYear} />
          <StatCard
            title="Success %"
            number={Math.round((study.completed / dayOfYear) * 100)}
            invert={Math.round((study.completed / dayOfYear) * 100) < 80}
          />
        </div>
        {/* TEMPLE GOAL */}
        <Goal
          name="Temple or family history"
          subtitle="Go to the temple or do an hour of family history research, once weekly."
          dates={temple.dates}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-4 mt-4 mb-8 max-w-3xl">
          <StatCard title="Done Days" number={temple.completed} />
          <StatCard
            title="Failed Days"
            number={temple.failed}
            invert={temple.failed !== 0}
          />
          <StatCard title="Day of Year" number={dayOfYear} />
          <StatCard
            title="Success %"
            number={Math.round((temple.completed / dayOfYear) * 100)}
            invert={Math.round((temple.completed / dayOfYear) * 100) < 80}
          />
        </div>
        {/* WAKE UP GOAL */}
        <Goal
          name="Get up at 6:30am"
          subtitle="Every day from M-F, weekend success criteria is 7+ hours of sleep."
          dates={wake.dates}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-4 mt-4 mb-8 max-w-3xl">
          <StatCard title="Done Days" number={wake.completed} />
          <StatCard
            title="Failed Days"
            number={wake.failed}
            invert={wake.failed !== 0}
          />
          <StatCard title="Day of Year" number={dayOfYear} />
          <StatCard
            title="Success %"
            number={Math.round(
              (wake.completed / (wake.weekdayCount || dayOfYear)) * 100
            )}
            invert={
              Math.round(
                (wake.completed / (wake.weekdayCount || dayOfYear)) * 100
              ) < 80
            }
          />
        </div>
      </section>
    </main>
  );
};

export default IndexPage;

export const query = graphql`
  {
    wake: allAirtable(filter: { table: { eq: "Get Up" } }) {
      nodes {
        id
        table
        data {
          Day
          Status
        }
      }
    }
    study: allAirtable(filter: { table: { eq: "Scripture Study" } }) {
      nodes {
        id
        table
        data {
          Day
          Status
        }
      }
    }
    temple: allAirtable(filter: { table: { eq: "Temple & Family History" } }) {
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
