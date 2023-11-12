  import React, { useEffect, useState } from "react";
  import {View} from "react-native"
  import { Text } from "react-native-paper";
  import ShowProfileScreen from "./ShowProfileScreen";
  import { Alert } from "react-native";
  import { Button } from "react-native-paper";
  import { getCurrentUser } from "@root/utilities/shared/LocalStorage";
  import { currentUserProps } from "@interface/Auth/CurrentUserProps";
  import EditProfileScreen from "./EditProfileScreen";

  const ProfileScreen = () => {
    const [currentUSer, setCurrentUser] = useState<currentUserProps>({
      email: "",
      firstName: "",
      id: 0,
      lastName: "",
      role: "",
      username: "",
    });
    

    //get current User from local storage
    useEffect(() => {
      
      const getCurrentUserFromLocal = async () => {
        const fetchedCurrentUser = await getCurrentUser();
        if (fetchedCurrentUser) {
          setCurrentUser(fetchedCurrentUser);
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

    const handleEdit = () => {
      setIsEditShown(false);
    };
    const handleSave = () => {
      Alert.alert("Profile Edit", "You have successfully edited your profile");
      setFirstName(tempFirstName);
      setLastName(tempLastName);
      setRole(tempRole);
      setEmail(tempEmail);
      setUserName(tempUsername);
      setIsEditShown(true);
    };
    const handleCancel = () => {
      setTempFirstName(firstName); // change back to initial profile details if canceled
      setTempLastName(lastName)
      setTempEmail(email)
      setTempRole(role)
      setTempUsername(username)
      setIsEditShown(true);
    };

    // objects of variables and functions to pass on another components
    const initialDetailObject = {
      firstName,
      lastName,
      email,
      username,
      role
    };
    const tempDetailObject = {
      tempFirstName,
      tempLastName,
      tempEmail,
      tempUsername,
      tempRole
    };
    const tempDetailFunctionObject = {
      setTempFirstName,
      setTempLastName,
      setTempEmail,
      setTempRole,
      setTempUsername
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
