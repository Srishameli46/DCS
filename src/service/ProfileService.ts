import { ACCESS_TOKEN, BASEURL } from "../constants";
import { apiService } from "./ApiService";


export const getDoctorList = async(page:number)=>{
  
  const response = await apiService.get(
    `users/doctors?page=0&size=8`
  );
  return response;
}
export const getLoginAccess = async(userName:string, password:string)=>{
  
  return await apiService.post(`${BASEURL}/users/login`, {
    email: userName,
    password: password,
  }).then(response=>{
    console.log(response.data.token);
    
    localStorage.setItem("access-token", response.data.token);
     return response;
  });
}


export const fetchDoctors = async () => {
  const response = await apiService.get(`${BASEURL}/users/doctors?page=0&size=8`);
  return response.data;
};


export const createPatient = async (value:any) =>{
  const response = await apiService.post(`${BASEURL}/users/patients`, value);
  return response;
}