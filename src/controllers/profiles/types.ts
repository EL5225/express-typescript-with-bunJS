import { TGenericResponse } from "@/utils";

export type TProfilesResponse = {
  id: string;
  phone_number: string | null;
  birth_date: Date | null;
  birth_place: string | null;
};

export type TGetAllProfilesResponse = TGenericResponse<
  string,
  Array<TProfilesResponse>
>;

export type TUpdateProfileRequest = TProfilesResponse;

export type TUpdateProfileResponse = TGenericResponse<
  string,
  TProfilesResponse
>;
