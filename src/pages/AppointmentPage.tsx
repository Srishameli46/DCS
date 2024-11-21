import AppointmentList from "../components/Appointment/Appointment.list";

const Appointments: React.FC = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-6">Manage Appointments</h1>
    <AppointmentList />
  </div>
);

export default Appointments;
