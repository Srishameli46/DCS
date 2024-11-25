import React, { useEffect, useState } from "react";
import { fetchAppointments } from "../../service/AppointmentService";
import { useAppContext } from "../../context/AppContext";
import { Type } from "../../enum/enum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const AppointmentList = () => {
  const { dispatch } = useAppContext();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu((prev) => !prev);
  }

    const handleCancelClick = () => {
      // onCancel();
      setShowMenu(false);
    };

    const handleViewClick = () => {
      // onView();
      setShowMenu(false);
    };
    

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
          setError(
            err?.response?.data?.message || "Failed to fetch appointments"
          );
        } finally {
          setLoading(false);
        }
      };

      fetchProfiles();
    }, [dispatch]);

    if (loading) {
      return <div>Loading...</div>;
    }

    const handleToggle = () => {
      <div>hhkajk</div>;
    };

    return (
      <div className="p-6 my-16">
        <h2 className="text-2xl font-bold mb-4">Appointments</h2>
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-600 border border-red-300 rounded-md">
            Error: {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className=" text-left">
                <th className=" px-4 py-2">Appointment Id</th>
                <th className=" px-4 py-2">Date</th>
                <th className=" px-4 py-2">Time</th>
                <th className=" px-4 py-2">Doctor</th>
                <th className="  px-4 py-2">Hospital Name</th>
                <th className=" border-gray-300 px-4 py-2">Location</th>
                <th className=" border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment: any) => (
                <tr
                  key={appointment.appointmentId}
                  className="hover:bg-gray-100 "
                >
                  <td className=" border-gray-300 px-3 py-5">
                    {appointment.appointmentId}
                  </td>

                  <td className=" border-gray-300 px-3 py-5">
                    {appointment.slotDate}
                  </td>
                  <td className=" border-gray-300 px-3 py-2">
                    {appointment.slotTime}
                  </td>
                  <td className=" border-gray-300 px-3 py-2">
                    {appointment.doctor.doctorName}
                  </td>
                  <td className=" border-gray-300 px-3 py-2">
                    {appointment.doctor.hospital.name}
                  </td>
                  <td className=" border-gray-300 px-3 py-2">
                    {appointment.doctor.hospital.location.locality},{" "}
                    {appointment.doctor.hospital.location.city},{" "}
                    {appointment.doctor.hospital.location.state},{" "}
                    {appointment.doctor.hospital.location.pinCode}
                  </td>
                  <td className=" border-gray-300 px-3 py-2">
                    {appointment.status}
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      className="px-3"
                      onClick={handleMenuToggle}
                    />
                    {showMenu && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                        <button
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                          onClick={handleViewClick}
                        >
                          View
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default AppointmentList;

// Code Implementation
// tsx
// Copy code
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

// const AppointmentActions = ({ onCancel, onView }: { onCancel: () => void; onView: () => void }) => {
//   const [showMenu, setShowMenu] = useState(false);

//   const handleMenuToggle = () => {
//     setShowMenu((prev) => !prev); // Toggle the dropdown visibility
//   };

//   const handleCancelClick = () => {
//     onCancel(); // Call the cancel action
//     setShowMenu(false); // Close the menu
//   };

//   const handleViewClick = () => {
//     onView(); // Call the view action
//     setShowMenu(false); // Close the menu
//   };

//   return (
//     <div className="relative inline-block">
//       {/* Icon */}
//       <FontAwesomeIcon
//         icon={faEllipsisV}
//         className="px-3 cursor-pointer"
//         onClick={handleMenuToggle}
//       />

//       {/* Dropdown Menu */}
//       {showMenu && (
//         <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
//           <button
//             className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
//             onClick={handleViewClick}
//           >
//             View
//           </button>
//           <button
//             className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
//             onClick={handleCancelClick}
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppointmentActions;
// 4. Usage
// Use this component in your parent component and define the onCancel and onView functions.

// tsx
// Copy code
// import React from "react";
// import AppointmentActions from "./AppointmentActions";

// const ParentComponent = () => {
//   const handleCancel = () => {
//     alert("Appointment canceled!");
//     // Add your cancel logic here
//   };

//   const handleView = () => {
//     alert("Viewing appointment details!");
//     // Add your view logic here
//   };

//   return (
//     <div>
//       <h1>Appointment</h1>
//       <AppointmentActions onCancel={handleCancel} onView={handleView} />
//     </div>
//   );
// };

// export default ParentComponent;
// 5. Styling.
