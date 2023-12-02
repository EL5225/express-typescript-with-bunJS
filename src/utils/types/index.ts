export type TGenericResponse<T, K> = {
  message: T;
  data?: K | K[] | null;
};
