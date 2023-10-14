import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "@root/utilities/shared/BaseURL";

type FarmsProps = {
  id: number;
  name: string;
  location: string;
};
interface ArduinoBoard {
  id: number;
  name: string;
  sensorMappings: null | any[]; // Replace 'any' with a more specific type if needed
  status: string;
}
export const farmAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}` }),
  endpoints: (builder) => ({
    getAllFarms: builder.query<FarmsProps[], void>({
      query: () => "/api/v1/farms",
    }),
    getArduino: builder.query<ArduinoBoard[], void>({
      query: () => "/api/v1/farms/1/arduinoboards",
    }),
  }),
});

export const { useGetArduinoQuery, useGetAllFarmsQuery } = farmAPI;
