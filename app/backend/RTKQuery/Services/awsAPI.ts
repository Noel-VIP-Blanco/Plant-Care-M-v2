import {
  ArduinoBoardProps,
  ContainersProps,
  FarmsProps,
} from "@interface/Auth/AwsApiProps";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "@root/utilities/shared/BaseURL";

export const awsAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}` }),
  endpoints: (builder) => ({
    getAllFarms: builder.query<FarmsProps[], void>({
      query: () => "/api/v1/farms",
    }),
    getArduino: builder.query<ArduinoBoardProps[], void>({
      query: () => "/api/v1/farms/1/arduinoboards",
    }),
    getContainers: builder.query<ContainersProps[], number>({
      query: (farmId) => `/api/v1/farms/${farmId}/containers`,
    }),
  }),
});

export const {
  useGetArduinoQuery,
  useGetAllFarmsQuery,
  useGetContainersQuery,
} = awsAPI;
