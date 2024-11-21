import React, { useEffect, useState } from "react";
import { fetchAppointments } from "../../service/AppointmentService";
import { useAppContext } from "../../context/AppContext";
import { Type } from "../../enum/enum";

const AppointmentList = () => {
  const { dispatch } = useAppContext();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const value = await fetchAppointments();
        setAppointments(value.appointment);
        dispatch({
          type: Type.FETCH_APPOINTMENTS,
          payload: value,
        });
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-600 border border-red-300 rounded-md">
          Error: {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Time</th>
              <th className="border border-gray-300 px-4 py-2">Doctor</th>
              <th className="border border-gray-300 px-4 py-2">Hospital Name</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment: any) => (
              <tr key={appointment.appointmentId} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{appointment.slotDate}</td>
                <td className="border border-gray-300 px-4 py-2">{appointment.slotTime}</td>
                <td className="border border-gray-300 px-4 py-2">{appointment.doctor.doctorName}</td>
                <td className="border border-gray-300 px-4 py-2">{appointment.doctor.hospital.name}</td> 
                <td className="border border-gray-300 px-4 py-2">{appointment.doctor.hospital.location.locality}, {appointment.doctor.hospital.location.city}, {appointment.doctor.hospital.location.state}, {appointment.doctor.hospital.location.pinCode}</td> 
                <td className="border border-gray-300 px-4 py-2">{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
