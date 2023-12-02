import { TGenericResponse } from "@/utils";

export type TGetAllUsersResponse = TGenericResponse<
  string,
  Array<{
    id: string;
    name: string;
    email: string;
    is_verified: boolean;
  }>
>;
