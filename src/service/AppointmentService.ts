import { BASEURL } from "../constants";
import { apiService } from "./ApiService";

export const createAppointment = async (data: any) => {
  console.log(localStorage.getItem("token"));
  console.log(data);
  
  
  const response = await apiService.post(
    `${BASEURL}/patients/me/appointments`, // 'me' dynamically resolves to the current user
    data,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the JWT token
            "Content-Type": "application/json",
        },
    }
);
return response;
}

export const fetchAppointments = async () => {
  const response =  await apiService.get(`${BASEURL}/patients/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token
    },
  });
  return response.data;
};
