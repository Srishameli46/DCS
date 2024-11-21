import { NavLink } from "react-router-dom";
import profilepic from "../assets/images/NoProfile.png";

function ProfileCard({ profile }: any) {
  return (
    <div className="w-80 h-auto rounded-lg shadow-lg border border-gray-200 p-5 bg-white">
      <div className="flex gap-5">
        <div className="flex-shrink-0">
          <img
            src={profilepic}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800">{profile.name}</h3>
          <p className="text-sm text-blue-800 font-semibold mb-2">
            {profile.experience} YRS . {profile.qualification}
          </p>

          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Specializations:</span> {profile.specializations.map((data: any) => data.specialization).join(' / ')}
          </p>

          <p className="text-sm text-gray-500 mb-1">
            <span className="font-semibold">Hospital:</span> {profile.hospital.name}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Location:</span> {profile.hospital.location.locality}, {profile.hospital.location.city}, {profile.hospital.location.state}
          </p>

          <p className="text-lg font-bold text-gray-800">Consultation Fee: ₹{profile.consultationFee}</p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <NavLink to="/profiles/appointment">
          <button className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300">
            Book an Appointment
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default ProfileCard;
