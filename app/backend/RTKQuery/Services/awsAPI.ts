import {
  AddContainersProps,
  ArduinoBoardProps,
  ContainersProps,
  FarmsProps,
} from "@interface/Auth/AwsApiProps";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "@root/utilities/shared/BaseURL";

export const awsAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}` }),
  tagTypes: ["Containers"],
  endpoints: (builder) => ({
    // manage farms
    getAllFarms: builder.query<FarmsProps[], void>({
      query: () => "/api/v1/farms",
    }),
    // manage arduino
    getArduino: builder.query<ArduinoBoardProps[], void>({
      query: () => "/api/v1/farms/1/arduinoboards",
    }),
    //manage containers
    getContainers: builder.query<ContainersProps[], number>({
      query: (farmId) => `/api/v1/farms/${farmId}/containers`,
      providesTags: ["Containers"],
    }),
    addContainer: builder.mutation<
      void,
      { container: AddContainersProps; farmId: string }
    >({
      query: ({ container, farmId }) => ({
        url: `api/v1/farms/${farmId}/containers`,
        method: "POST",
        body: container,
      }),
      invalidatesTags: ["Containers"],
    }),
  }),
});

export const {
  useGetArduinoQuery,
  useGetAllFarmsQuery,
  useGetContainersQuery,
  useAddContainerMutation,
} = awsAPI;
