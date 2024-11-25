import TimetableCard from "./TimetableCard";
import DoctorTT from "./DoctorTT";
import Appointment from "./Appointment";
import Call from "./Call";

function Card() {
  return (
    <>
      <div className=" bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
        <TimetableCard />
        <DoctorTT />
        <Appointment />
        <Call />
      </div>
    </>
  );
}

export default Card;
