import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Appointment() {
  return (
    <div className="bg-sky-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-3 border-b pb-3 border-slate-300">
        <FontAwesomeIcon icon={faPhone} className="text-gray-50 text-xl" />
        <h3 className="text-white text-xl font-semibold">APPOINTMENT</h3>
      </div>
      <div className="mt-5">
        <p className="text-white text-justify">
          The first step towards a healthy life is to schedule an appointment.
          Please contact our office by phone or complete the appointment request
          form.
        </p>
      </div>
    </div>
  );
}

export default Appointment;
