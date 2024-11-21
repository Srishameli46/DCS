import { Type } from "../enum/enum";

export interface Action {
  type:Type,
  payload?: any
}

export interface ProfileType {
  employeeCompanyId:string,
  imgUrl:string,
  firstName:string,
  lastName:string,
  email:string,
  totalExperience:number,
  ideas2itExperience:number,
  designation:{
    description:string,
  }
}