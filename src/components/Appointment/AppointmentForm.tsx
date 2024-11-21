import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createAppointment } from "../../service/AppointmentService";
import { useState } from "react";

const AppointmentForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success"); // success or error
  const [backendResponse, setBackendResponse] = useState<string | null>(null);

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
    email: Yup.string().email("Invalid email format").required("Email is required"),
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

  const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    try {
      const data = await createAppointment(values);

      if (data.data) {
        const message = typeof data.data === "object" 
        ? `Appointment Details: ID: ${data.data.appointmentId}, Date: ${data.data.slotDate}, Time: ${data.data.slotTime}`
        : data.data;
        setModalMessage("Appointment created successfully!" + message);
        setModalType("success");
        resetForm();
        
      } else {
      
        const message = typeof data.data === "object" 
        ? `${data.data}`
        : data.data;
      setModalMessage(message)
        setModalType("error");
    
      }
      setShowModal(true);
    } catch (error: any) {      
      const errorMessage =
        error.response?.message || "An error occurred while creating the appointment";
      setModalMessage(errorMessage);
      setModalType("error");
      setShowModal(true);
    }
  };

  return (
    <div className="p-10 bg-sky-200">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <Field type="text" name="name" className="input-field" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <Field type="email" name="email" className="input-field" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Aadhar Number</label>
              <Field type="text" name="aadharNumber" className="input-field" />
              <ErrorMessage name="aadharNumber" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date</label>
              <Field type="date" name="appointment.slotDate" className="input-field" />
              <ErrorMessage
                name="appointment.slotDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Time</label>
              <Field type="time" name="appointment.slotTime" className="input-field" />
              <ErrorMessage
                name="appointment.slotTime"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Doctor Id</label>
              <Field type="text" name="appointment.doctor.doctorId" className="input-field" />
              <ErrorMessage
                name="appointment.doctor.doctorId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Doctor Name</label>
              <Field type="text" name="appointment.doctor.doctorName" className="input-field" />
              <ErrorMessage
                name="appointment.doctor.doctorName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
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
