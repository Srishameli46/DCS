import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Type } from "../enum/enum";
import { getDoctorList } from "../service/ProfileService";
import ProfileCard from "../components/ProfileCard";

const DoctorProfile = () => {
  const { dispatch } = useAppContext();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await getDoctorList(9);
        setProfiles(response.data);
        
        dispatch({
          type: Type.FETCH_PROFILE,
          payload: response.data,
        });
      } catch (err) {
        console.error("Error fetching doctor profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [dispatch]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="m-20 flex flex-wrap justify-around gap-y-7 mb-5">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} /> 
      ))}
    </div>
  );
};

export default DoctorProfile;
