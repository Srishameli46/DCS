import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function DoctorTT() {
  const [hidden, setHidden] = useState(false);

  return (
    <div
      className="bg-sky-500 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <div className="flex items-center gap-3 border-b pb-3 border-slate-300">
        <FontAwesomeIcon icon={faCalendar} className="text-gray-50 text-xl" />
        <h3 className="text-white text-xl font-semibold">DOCTOR'S TIMETABLE</h3>
      </div>
      <div className="mt-5">
        <p className="text-white text-justify">
          The following is for guidance only to help you plan your appointment
          with a preferred doctor or nurse. It does not guarantee availability
          as they may sometimes be attending to other duties.
        </p>
      </div>
    </div>
  );
}

export default DoctorTT;
