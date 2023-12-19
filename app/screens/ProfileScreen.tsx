import React, { useEffect, useState } from "react";
import ShowProfileScreen from "./ShowProfileScreen";
import { Alert } from "react-native";
import { Button } from "react-native-paper";
import {
  getCurrentUser,
  setCurrentUser,
} from "@root/utilities/shared/LocalStorage";
import { currentUserProps } from "@interface/Auth/CurrentUserProps";
import EditProfileScreen from "./EditProfileScreen";
import axios from "axios";
import { baseURL } from "@root/utilities/shared/BaseURL";
import { useAppDispatch, useAppSelector } from "@reduxToolkit/Hooks";
import { selectUser, setUserFromRedux } from "@reduxToolkit/Features/UserSlice";

const ProfileScreen = () => {
  const [currentUSer, setCurrentUserr] = useState<currentUserProps>({
    email: "",
    firstName: "",
    allowNotifications: true,
    id: 0,
    lastName: "",
    role: "",
    username: "",
  });
  //initial profile details
  const [firstName, setFirstName] = useState(currentUSer.firstName);
  const [lastName, setLastName] = useState(currentUSer.lastName);
  const [role, setRole] = useState(currentUSer.role);
  const [username, setUserName] = useState(currentUSer.username);
  const [email, setEmail] = useState(currentUSer.email);
  //temp profile detailss
  const [tempFirstName, setTempFirstName] = useState(firstName);
  const [tempLastName, setTempLastName] = useState(lastName);
  const [tempRole, setTempRole] = useState(role);
  const [tempUsername, setTempUsername] = useState(username);
  const [tempEmail, setTempEmail] = useState(email);
  const [isEditShown, setIsEditShown] = useState(true);

  const dispatch = useAppDispatch();
  const userFromRedux = useAppSelector(selectUser);
  // get current User from local storage
  useEffect(() => {
    const getCurrentUserFromLocal = async () => {
      const fetchedCurrentUser = await getCurrentUser();
      if (fetchedCurrentUser) {
        setCurrentUserr(fetchedCurrentUser);
        // Initialize state variables with fetched values
        setFirstName(fetchedCurrentUser.firstName);
        setLastName(fetchedCurrentUser.lastName);
        setRole(fetchedCurrentUser.role);
        setEmail(fetchedCurrentUser.email);
        setUserName(fetchedCurrentUser.username);
      }
    };
    getCurrentUserFromLocal();
  }, []);

  // useEffect(() => {
  //   if (userFromRedux) {
  //     setCurrentUserr(userFromRedux);
  //     // Initialize state variables with fetched values
  //     setFirstName(userFromRedux.firstName);
  //     setLastName(userFromRedux.lastName);
  //     setRole(userFromRedux.role);
  //     setEmail(userFromRedux.email);
  //     setUserName(userFromRedux.username);
  //   }
  // }, []);

  useEffect(() => {
    const setTempData = async () => {
      setTempEmail(email);
      setTempRole(role);
      setTempFirstName(firstName);
      setTempLastName(lastName);
      setTempUsername(username);
    };
    setTempData();
  }, [email, role, firstName, lastName, username]);

  const handleEdit = () => {
    setIsEditShown(false);
  };
  const handleSave = async () => {
    await axios
      .put(`${baseURL}/api/v1/auth/update-profile`, {
        firstName: tempFirstName,
        lastName: tempLastName,
      })
      .then((user) => {
        console.log(user.data);
        setCurrentUser(user.data);
        dispatch(setUserFromRedux(user.data));
        Alert.alert(
          "Profile Edit",
          "You have successfully edited your profile"
        );
      });

    setFirstName(tempFirstName);
    setLastName(tempLastName);
    setRole(tempRole);
    setEmail(tempEmail);
    setUserName(tempUsername);
    setIsEditShown(true);
  };
  const handleCancel = () => {
    setTempFirstName(firstName); // change back to initial profile details if canceled
    setTempLastName(lastName);
    setTempEmail(email);
    setTempRole(role);
    setTempUsername(username);
    setIsEditShown(true);
  };

  // objects of variables and functions to pass on another components
  const initialDetailObject = {
    firstName,
    lastName,
    email,
    username,
    role,
  };
  const tempDetailObject = {
    tempFirstName,
    tempLastName,
    tempEmail,
    tempUsername,
    tempRole,
  };
  const tempDetailFunctionObject = {
    setTempFirstName,
    setTempLastName,
    setTempEmail,
    setTempRole,
    setTempUsername,
  };

  return isEditShown ? (
    <ShowProfileScreen
      initialDetailObject={initialDetailObject}
      handleEdit={handleEdit}
    />
  ) : (
    <EditProfileScreen
      tempDetailFunctionObject={tempDetailFunctionObject}
      tempDetailObject={tempDetailObject}
      handleCancel={handleCancel}
      handleSave={handleSave}
    />
  );
};

export default ProfileScreen;
