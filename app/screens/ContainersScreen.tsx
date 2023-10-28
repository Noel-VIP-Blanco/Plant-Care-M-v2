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
import { useAppSelector, useAppDispatch } from "@reduxToolkit/Hooks";
import {
  searchContainerByName,
  selectFilteredContainer,
  DeleteContainerAPI,
} from "@reduxToolkit/Features/ContainerSlice";

//components
import CustomSearchBar from "@components/Shared/CustomSearchBar";
import AddContainerModal from "@components/TasksModal/AddContainerModal";
import ContainerCardList from "@components/Container/ContainerCardList";
import { dp, sp } from "@root/utilities/shared/SpDp";

const ContainersScreen = ({ navigation }: any) => {
  //redux
  const filteredContainer = useAppSelector(selectFilteredContainer);
  const dispatch = useAppDispatch();

  //removeContainer
  const [checkboxVisible, setCheckboxVisible] = useState(false);
  const showCheckbox = () => setCheckboxVisible(true);
  const hideCheckbox = () => {
    setCheckboxVisible(false);
    console.log(removeContainerID);
    setRemoveContainerID([]);
  };
  const handleRemoveContainers = () => {
    dispatch(
      // removeContainers(removeContainerID)

      DeleteContainerAPI({
        containerIds: removeContainerID,
        farmId: 1, //farm id should be get to the tocalStorage
      })
    );
    hideCheckbox();
  };

  const [removeContainerID, setRemoveContainerID] = useState<number[]>([]);

  //add container modal
  const [addContainerModalVisible, setAddContainerModalVisible] =
    useState(false);
  const openAddContainerModal = () => setAddContainerModalVisible(true);
  const closeAddContainerModal = () => setAddContainerModalVisible(false);
  const onSearch = (text: string) => {
    dispatch(searchContainerByName(text));
  };

  return (
    <View style={{ backgroundColor: COLORS.BACKGROUNDCOLOR, flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            marginTop: dp(70),
            marginLeft: dp(25),
            width: dp(120),
            borderRadius: dp(70),
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
              style={{ marginTop: dp(40) }}
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
            fontSize: sp(80),
            color: "#086308",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Containers
        </Text>
        {/* <Filter Containers /> */}
        <ContainerCardList
          filteredData={filteredContainer}
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
              labelStyle={{ fontSize: sp(50) }}
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
              labelStyle={{ fontSize: sp(50) }}
              contentStyle={{ backgroundColor: "#44f321", height: 50 }}
              style={ContainerScreenStyle.button}
              onPress={() => {
                Alert.alert(
                  "Container Remove",
                  "You have successfully removed the container"
                );

                handleRemoveContainers();
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
