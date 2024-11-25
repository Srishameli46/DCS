import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppContext } from "../../context/AppContext";
import { Type } from "../../enum/enum";
import { createPatient } from "../../service/ProfileService";

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Patient name should contain only letters and space")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .matches(/^[a-z0-9]+@(gmail\.com|yahoo\.com)$/, "Email must be a valid Gmail or Yahoo email address")
    .required("Email is required"),
  dob: Yup.date().max(new Date(), "Dob should not have future dates").required("Date of birth is required"),
  gender: Yup.string().oneOf(["male", "female"], "Gender must be 'male' or 'female'").required("Gender is required"),
  aadharNumber: Yup.string()
    .matches(/^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/, "Invalid Aadhar number format")
    .required("Aadhar number is required"),
  phoneNo: Yup.string()
    // .matches(/^(\\d{10}|\\d{3}[-\\s]?\\d{3}[-\\s]?\\d{4})$/, "Invalid phone number format")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  bloodGroup: Yup.string()
    .matches(/^(A|B|AB|O)[+-]$/, "Invalid Blood group")
    .required("Blood group is required"),
});

const PatientForm = () => {
  const {dispatch} = useAppContext();
  const handleSubmit = async (values: any) => {
    try {
      const patientData = await createPatient(values);
      dispatch({ type: Type.SET_PATIENT, payload: patientData });
      alert("Patient created successfully!");
    } catch (err) {
      alert("Error creating patient.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md my-16">
      <h1 className="text-xl font-semibold mb-4">Create New Patient</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          dob: "",
          gender: "",
          aadharNumber: "",
          phoneNo: "",
          address: "",
          bloodGroup: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Field
                type="text"
                name="name"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Field
                type="email"
                name="email"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <Field
                type="date"
                name="dob"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="dob" component="div" className="text-red-600 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <Field
                as="select"
                name="gender"
                className="mt-1 p-2 border rounded-md w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="text-red-600 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
              <Field
                type="text"
                name="aadharNumber"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="aadharNumber" component="div" className="text-red-600 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <Field
                type="text"
                name="phoneNo"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="phoneNo" component="div" className="text-red-600 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <Field
                type="text"
                name="address"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="address" component="div" className="text-red-600 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
              <Field
                type="text"
                name="bloodGroup"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="bloodGroup" component="div" className="text-red-600 text-sm" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white p-2 rounded-md w-full mt-4"
            >
              {isSubmitting ? "Creating..." : "Create Patient"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PatientForm;
