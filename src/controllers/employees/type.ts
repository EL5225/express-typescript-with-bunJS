import { TGenericResponse } from "@/utils";
import { Employees } from "@prisma/client";

export type TGetAllEmployeesResponse = TGenericResponse<
  string,
  Array<Employees>
>;

export type TGetEmployeeResponse = TGenericResponse<string, Employees>;

export type TCreateEmployeeResponse = TGenericResponse<string, Employees>;

export type TUpdateEmployeeResponse = TGenericResponse<string, Employees>;

export type TDeleteEmployeeResponse = TGenericResponse<string, null>;

export type TGetEmployeeByIdResponse = TGenericResponse<string, Employees>;
