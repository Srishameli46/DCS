import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createAppointment } from "../../service/AppointmentService";
import { useState } from "react";

const AppointmentForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const initialValues = {
    name: "",
    email: "",
    aadharNumber: "",
    appointment: {
      slotDate: "",
      slotTime: "",
      doctor: {
        doctorId: "",
        doctorName: "",
      },
    },
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    aadharNumber: Yup.string()
      .matches(/^\d{12}$/, "Aadhar number must be 12 digits")
      .required("Aadhar number is required"),
    appointment: Yup.object({
      slotDate: Yup.string().required("Date is required"),
      slotTime: Yup.string().required("Time is required"),
      doctor: Yup.object({
        doctorId: Yup.string().required("Doctor ID is required"),
        doctorName: Yup.string().required("Doctor name is required"),
      }),
    }),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    try {
      const data = await createAppointment(values);

      if (data.data) {
        const message =
          typeof data.data === "object"
            ? `Appointment Details: ID: ${data.data.appointmentId}, Date: ${data.data.slotDate}, Time: ${data.data.slotTime}`
            : data.data;
        setModalMessage("Appointment created successfully!" + message);
        setModalType("success");
        resetForm();
      } else {
        const message =
          typeof data.data === "object" ? `${data.data}` : data.data;
        setModalMessage(message);
        setModalType("error");
      }
      setShowModal(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.message ||
        "An error occurred while creating the appointment";
      setModalMessage(errorMessage);
      setModalType("error");
      setShowModal(true);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-xl py-2 px-6 bg-gray-700 text-white text-center font-bold uppercase">
        Book an Appointment
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="py-4 px-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                Name
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                placeholder="Enter your name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="aadharNumber">
                Aadhar Number
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="aadharnumber"
                name="aadharNumber"
                type="text"
                placeholder="Enter your aadhar number"
              />
              <ErrorMessage
                name="aadharNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                Date
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                name="appointment.slotDate"
                type="date"
              />
              <ErrorMessage
                name="appointment.slotDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
                Time
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="time"
                name="appointment.slotTime"
                type="time"
              />
              <ErrorMessage
                name="appointment.slotTime"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="doctorId">
                Doctor Id
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="doctorId"
                name="appointment.doctor.doctorId"
                type="text"
              >
                
              </Field>
              <ErrorMessage
                name="appointment.doctor.doctorId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="doctorName">
                Doctor Name
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="doctorName"
                name="appointment.doctor.doctorName"
                type="text"
              >
                
              </Field>
              <ErrorMessage
                name="appointment.doctor.doctorName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
        
            <div className="flex items-center justify-center mb-4">
              <button
                className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Book Appointment
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3
              className={`text-lg font-semibold mb-4 ${
                modalType === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {modalType === "success" ? "Success" : "Error"}
            </h3>
            <p className="text-gray-700">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;


// const AppointmentForm = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [modalType, setModalType] = useState("success"); // success or error
//   const [backendResponse, setBackendResponse] = useState<string | null>(null);

//   const initialValues = {
//     name: "",
//     email: "",
//     aadharNumber: "",
//     appointment: {
//       slotDate: "",
//       slotTime: "",
//       doctor: {
//         doctorId: "",
//         doctorName: "",
//       },
//     },
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string()
//       .min(3, "Name must be at least 3 characters")
//       .required("Name is required"),
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     aadharNumber: Yup.string()
//       .matches(/^\d{12}$/, "Aadhar number must be 12 digits")
//       .required("Aadhar number is required"),
//     appointment: Yup.object({
//       slotDate: Yup.string().required("Date is required"),
//       slotTime: Yup.string().required("Time is required"),
//       doctor: Yup.object({
//         doctorId: Yup.string().required("Doctor ID is required"),
//         doctorName: Yup.string().required("Doctor name is required"),
//       }),
//     }),
//   });

//   const handleSubmit = async (
//     values: typeof initialValues,
//     { resetForm }: any
//   ) => {
//     try {
//       const data = await createAppointment(values);

//       if (data.data) {
//         const message =
//           typeof data.data === "object"
//             ? `Appointment Details: ID: ${data.data.appointmentId}, Date: ${data.data.slotDate}, Time: ${data.data.slotTime}`
//             : data.data;
//         setModalMessage("Appointment created successfully!" + message);
//         setModalType("success");
//         resetForm();
//       } else {
//         const message =
//           typeof data.data === "object" ? `${data.data}` : data.data;
//         setModalMessage(message);
//         setModalType("error");
//       }
//       setShowModal(true);
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.message ||
//         "An error occurred while creating the appointment";
//       setModalMessage(errorMessage);
//       setModalType("error");
//       setShowModal(true);
//     }
//   };

//   return (
//     // <div className="p-10 bg-sky-200">
//     //   <Formik
//     //     initialValues={initialValues}
//     //     validationSchema={validationSchema}
//     //     onSubmit={handleSubmit}
//     //   >
//     //     {({ isSubmitting }) => (
//     //       <Form className="space-y-4">
//     //         <div>
//     //           <label className="block text-gray-700 font-medium mb-2">Name</label>
//     //           <Field type="text" name="name" className="input-field" />
//     //           <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
//     //         </div>
//     //         <div>
//     //           <label className="block text-gray-700 font-medium mb-2">Email</label>
//     //           <Field type="email" name="email" className="input-field" />
//     //           <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
//     //         </div>
//     //         <div>
//     //           <label className="block text-gray-700 font-medium mb-2">Aadhar Number</label>
//     //           <Field type="text" name="aadharNumber" className="input-field" />
//     //           <ErrorMessage name="aadharNumber" component="div" className="text-red-500 text-sm" />
//     //         </div>
//     //         <div>
//     //           <label className="block text-gray-700 font-medium mb-2">Date</label>
//     //           <Field type="date" name="appointment.slotDate" className="input-field" />
//     //           <ErrorMessage
//     //             name="appointment.slotDate"
//     //             component="div"
//     //             className="text-red-500 text-sm"
//     //           />
//     //         </div>
//     //         <div>
//     //           <label className="block text-gray-700 font-medium mb-2">Time</label>
//     //           <Field type="time" name="appointment.slotTime" className="input-field" />
//     //           <ErrorMessage
//     //             name="appointment.slotTime"
//     //             component="div"
//     //             className="text-red-500 text-sm"
//     //           />
//     //         </div>
//     //         <div>
//     //           <label className="block text-gray-700 font-medium mb-2">Doctor Id</label>
//     //           <Field type="text" name="appointment.doctor.doctorId" className="input-field" />
//     //           <ErrorMessage
//     //             name="appointment.doctor.doctorId"
//     //             component="div"
//     //             className="text-red-500 text-sm"
//     //           />
//     //         </div>
//     //         <div>
//     //           <label className="block text-gray-700 font-medium mb-2">Doctor Name</label>
//     //           <Field type="text" name="appointment.doctor.doctorName" className="input-field" />
//     //           <ErrorMessage
//     //             name="appointment.doctor.doctorName"
//     //             component="div"
//     //             className="text-red-500 text-sm"
//     //           />
//     //         </div>
//     //         <button
//     //           type="submit"
//     //           className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//     //           disabled={isSubmitting}
//     //         >
//     //           {isSubmitting ? "Submitting..." : "Submit"}
//     //         </button>
//     //       </Form>
//     //     )}
//     //   </Formik>
//     <>

//       <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
//           Book an Appointment
//         </div>
//         <form className="py-4 px-6" action="" method="POST">
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="name"
//             >
//               Name
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="name"
//               type="text"
//               placeholder="Enter your name"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="phone"
//             >
//               Phone Number
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="phone"
//               type="tel"
//               placeholder="Enter your phone number"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="date"
//             >
//               Date
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="date"
//               type="date"
//               placeholder="Select a date"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="time"
//             >
//               Time
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="time"
//               type="time"
//               placeholder="Select a time"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="service"
//             >
//               Service
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="service"
//               name="service"
//             >
//               <option value="">Select a service</option>
//               <option value="haircut">Haircut</option>
//               <option value="coloring">Coloring</option>
//               <option value="styling">Styling</option>
//               <option value="facial">Facial</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="message"
//             >
//               Message
//             </label>
//           </div>
//           <div className="flex items-center justify-center mb-4">
//             <button
//               className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Book Appointment
//             </button>
//           </div>
//         </form>
//       </div>
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h3
//               className={`text-lg font-semibold mb-4 ${
//                 modalType === "success" ? "text-green-500" : "text-red-500"
//               }`}
//             >
//               {modalType === "success" ? "Success" : "Error"}
//             </h3>
//             <p className="text-gray-700">{modalMessage}</p>
//             <button
//               onClick={() => setShowModal(false)}
//               className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AppointmentForm;
