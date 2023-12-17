import axios from "axios";
import { baseURL } from "./BaseURL";
import { currentUserProps } from "@interface/Auth/CurrentUserProps";
export const getSubscribedId = (
  setSubIdFromNotify: React.Dispatch<React.SetStateAction<never[]>>
) => {
  axios
    .get(
      "https://app.nativenotify.com/api/expo/indie/subs/13240/JgacDlBDrMg8qvQWalJuRM"
    )
    .then((response) => {
      // Assign the response data to the variable
      console.log(response.data);
      setSubIdFromNotify(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getAllIdFromFarm = (
  farmId: string | null | undefined,
  setIdFromFarm: React.Dispatch<React.SetStateAction<currentUserProps[]>>
) => {
  axios
    .get(`${baseURL}/api/v1/farms/${farmId}/all-users`)
    .then((response) => {
      console.log(response.data);
      setIdFromFarm(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
