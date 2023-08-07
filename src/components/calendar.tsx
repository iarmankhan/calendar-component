import { useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  parse,
  startOfMonth,
  startOfToday,
} from "date-fns";
import { cn } from "../utils.ts";

export function Calendar() {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));

  const firstDayOfMonth = startOfMonth(
    parse(currentMonth, "MMM-yyyy", new Date()),
  );

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: firstDayOfMonth,
      end: endOfMonth(firstDayOfMonth),
    });
  }, [firstDayOfMonth, currentMonth]);

  return (
    <div className="w-[400px] p-2">
      <div className="flex items-center px-2 mb-1">
        <h1 className="font-bold text-lg flex-1">
          {format(parse(currentMonth, "MMM-yyyy", new Date()), "MMMM yyyy")}
        </h1>
        <div className="flex justify-between">
          <button
            className="text-gray-500"
            onClick={() =>
              setCurrentMonth(
                format(
                  addMonths(parse(currentMonth, "MMM-yyyy", new Date()), -1),
                  "MMM-yyyy",
                ),
              )
            }
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <button
            className="text-gray-500 ml-2"
            onClick={() =>
              setCurrentMonth(
                format(
                  addMonths(parse(currentMonth, "MMM-yyyy", new Date()), 1),
                  "MMM-yyyy",
                ),
              )
            }
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 place-content-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div className="p-2">
            <span className="text-gray-500">{day}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 place-content-center ">
        {days.map((day) => (
          <div
            className={cn({
              "p-2": true,
              [dayPlacements[day.getDay()]]: true,
            })}
          >
            <button className="">{format(day, "dd")}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const dayPlacements = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
