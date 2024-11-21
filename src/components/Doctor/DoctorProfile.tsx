const DoctorProfile: React.FC<{ doctor: any }> = ({ doctor }) => (
  <div className="bg-white shadow-md rounded-lg p-6 max-w-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">{doctor.name}</h2>
    <p className="text-gray-600">
      <span className="font-medium">Specialization:</span> {doctor.specializations.join(", ")}
    </p>
    <p className="text-gray-600">
      <span className="font-medium">Consultation Fee:</span> ${doctor.consultationFee}
    </p>
    <p className="text-gray-600">
      <span className="font-medium">Qualification:</span> {doctor.qualification}
    </p>
    <p className="text-gray-600">
      <span className="font-medium">Gender:</span> {doctor.gender}
    </p>
  </div>
);

export default DoctorProfile;
