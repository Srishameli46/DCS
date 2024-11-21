import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function TimetableCard() {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      <div
        className="bg-sky-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        onMouseEnter={() => setHidden(false)}
        onMouseLeave={() => setHidden(true)}
      >
        <div className="flex items-center gap-3 border-b pb-3 border-slate-300">
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className="text-gray-50 text-xl"
          />
          <h3 className="text-white text-xl font-semibold">OPENING HOURS</h3>
        </div>
        <div className="mt-5 space-y-2">
          <div className="flex justify-between text-white">
            <span>Morning</span>
            <span>9:00 am - 12:00 pm</span>
          </div>
          <div className="flex justify-between text-white">
            <span>Afternoon</span>
            <span>3:00 pm - 6:00 pm</span>
          </div>
        </div>
      </div>
    </>
  );
}
