import { View, TouchableOpacity, Alert } from "react-native";
import { TouchableRipple, FAB, Button, Text } from "react-native-paper";
import React, { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

//utilities
import { COLORS } from "@root/utilities/shared/Colors";

//style
import { HeaderRightIconStyle } from "@stylesheets/HeaderNavigation/HeaderRightIconStyle";
import { ContainerScreenStyle } from "@stylesheets/ContainerScreen/ContainerScreenStyle";

//redux
// import { useAppSelector, useAppDispatch } from "@reduxToolkit/Hooks";
// import {
//   searchContainerByName,
//   removeContainers,
//   selectFilteredContainer,
// } from "@reduxToolkit/Features/ContainerSlice";

//components
import CustomSearchBar from "@components/Shared/CustomSearchBar";
import AddContainerModal from "@components/TasksModal/AddContainerModal";
import ContainerCardList from "@components/Container/ContainerCardList";

import { useGetContainersQuery } from "@backend/RTKQuery/Services/awsAPI";
import { ContainersProps } from "@interface/Auth/AwsApiProps";

const ContainersScreen = ({ navigation }: any) => {
  //redux
  // const filteredContainer = useAppSelector(selectFilteredContainer);
  // const dispatch = useAppDispatch();

  const [containers, setContainers] = useState<ContainersProps[]>();
  const fetchAllContainer = async () => {
    try {
      const { data: containerss } = useGetContainersQuery(1);
      if (containerss) {
        return containerss;
      }
    } catch (e) {
      return undefined;
    }
  };
  fetchAllContainer().then((allContainer) => {
    setContainers(allContainer);
  });

  //removeContainer
  const [checkboxVisible, setCheckboxVisible] = useState(false);
  const showCheckbox = () => setCheckboxVisible(true);
  const hideCheckbox = () => {
    setCheckboxVisible(false);
    console.log(removeContainerID);
    setRemoveContainerID([]);
  };
  // const handleRemoveContainers = () => {
  //   dispatch(removeContainers(removeContainerID));
  //   hideCheckbox();
  // };
  const [removeContainerID, setRemoveContainerID] = useState<string[]>([]);

  //add container modal
  const [addContainerModalVisible, setAddContainerModalVisible] =
    useState(false);
  const openAddContainerModal = () => setAddContainerModalVisible(true);
  const closeAddContainerModal = () => setAddContainerModalVisible(false);
  const onSearch = (text: string) => {
    // dispatch(searchContainerByName(text));
  };

  return (
    <View style={{ backgroundColor: COLORS.BACKGROUNDCOLOR, flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            marginTop: 30,
            marginLeft: 10,
            width: 80,
            borderRadius: 30,
            flex: 1,
          }}
        >
          <TouchableRipple
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="arrow-back"
              style={{ marginTop: 15 }}
              size={60}
              color="white"
            />
          </TouchableRipple>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: "10%",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={openAddContainerModal}
            style={HeaderRightIconStyle.hearderRightTouchable}
          >
            <Ionicons
              name="add-circle"
              style={HeaderRightIconStyle.headerRightIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={ContainerScreenStyle.containerContents}>
        <CustomSearchBar onSearch={onSearch} searchValue="Container" />
        <Text
          style={{
            fontSize: 30,
            color: "#086308",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Containers
        </Text>
        {/* <Filter Containers /> */}
        <ContainerCardList
          // filteredData={filteredContainer}
          filteredData={containers}
          checkboxVisible={checkboxVisible}
          setRemoveContainerID={setRemoveContainerID}
        />
        <AddContainerModal
          visible={addContainerModalVisible}
          onClose={closeAddContainerModal}
        />
        {!checkboxVisible ? (
          <FAB
            icon={({ size, color }) => (
              <MaterialCommunityIcons name="delete" size={size} color={color} />
            )}
            style={ContainerScreenStyle.FAB}
            onPress={() => showCheckbox()}
          />
        ) : (
          <View style={ContainerScreenStyle.buttonContainer}>
            <Button
              mode="elevated"
              labelStyle={{ fontSize: 20 }}
              contentStyle={{ height: 50 }}
              style={ContainerScreenStyle.button}
              onPress={() => {
                hideCheckbox();
              }}
            >
              Cancel
            </Button>
            <Button
              mode="elevated"
              labelStyle={{ fontSize: 20 }}
              contentStyle={{ backgroundColor: "#44f321", height: 50 }}
              style={ContainerScreenStyle.button}
              onPress={() => {
                Alert.alert(
                  "Container Remove",
                  "You have successfully removed the container"
                );
                // handleRemoveContainers();
              }}
            >
              Remove
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default ContainersScreen;
