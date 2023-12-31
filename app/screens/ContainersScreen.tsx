import { View, TouchableOpacity, Alert } from "react-native";
import { TouchableRipple, FAB, Button, Text } from "react-native-paper";
import React, { useEffect, useState } from "react";
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
import { getFarm } from "@root/utilities/shared/LocalStorage";
import {
  getAllIdFromFarm,
  getSubscribedId,
} from "@root/utilities/shared/GetSubscribedId";
import axios from "axios";
import {
  currentUserProps,
  subscribedIdFromNotify,
} from "@interface/Auth/CurrentUserProps";

const ContainersScreen = ({ navigation }: any) => {
  //redux
  const filteredContainer = useAppSelector(selectFilteredContainer);
  const dispatch = useAppDispatch();

  //get farmId from local
  const [farmIdFromLocal, setFarmIdFromLocal] = useState<
    string | null | undefined
  >(null);
  useEffect(() => {
    const getFarmIdFromLocal = async () => {
      const fetchedFarmId = await getFarm();
      setFarmIdFromLocal(fetchedFarmId);
    };
    getFarmIdFromLocal();
  }, []);
  //get the subscribed ids from native notify
  const [subIdFromNotify, setSubIdFromNotify] = useState<
    subscribedIdFromNotify[]
  >([]);
  //get all the id from the farm
  const [idFromFarm, setIdFromFarm] = useState<currentUserProps[]>([]);

  useEffect(() => {
    getSubscribedId(setSubIdFromNotify);
    getAllIdFromFarm(farmIdFromLocal, setIdFromFarm);
  }, [farmIdFromLocal]);
  //removeContainer
  const [checkboxVisible, setCheckboxVisible] = useState(false);
  const showCheckbox = () => {
    setCheckboxVisible(true);
    getSubscribedId(setSubIdFromNotify);
    getAllIdFromFarm(farmIdFromLocal, setIdFromFarm);
  };
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

    let subIds = subIdFromNotify.map((item) => item.sub_id);
    let filteredA = idFromFarm.filter((item) =>
      subIds.includes(item.id.toString())
    );
    let result = filteredA.map((item) => item.id.toString());
    if (result.length > 0) {
      axios
        .post(`https://app.nativenotify.com/api/indie/group/notification`, {
          subIDs: result,
          appId: 13240,
          appToken: "JgacDlBDrMg8qvQWalJuRM",
          title: "Container Notification",
          message: "Containers are deleted",
        })
        .catch((e) => {
          console.log("Error from add container modal line 146", e);
        });
    }
    hideCheckbox();
  };

  const [removeContainerID, setRemoveContainerID] = useState<number[]>([]);

  //add container modal
  const [addContainerModalVisible, setAddContainerModalVisible] =
    useState(false);
  const openAddContainerModal = () => {
    setAddContainerModalVisible(true);
    getSubscribedId(setSubIdFromNotify);
    getAllIdFromFarm(farmIdFromLocal, setIdFromFarm);
  };
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
      <View
        className="bg-white dark:bg-slate-800"
        style={ContainerScreenStyle.containerContents}
      >
        <CustomSearchBar onSearch={onSearch} searchValue="Container" />
        <Text
          className="text-green-800 dark:text-green-400"
          style={{
            fontSize: sp(80),
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Containers
        </Text>
        {/* <Filter Containers /> */}
        <ContainerCardList
          idFromFarm={idFromFarm}
          subIdFromNotify={subIdFromNotify}
          filteredData={filteredContainer}
          checkboxVisible={checkboxVisible}
          setRemoveContainerID={setRemoveContainerID}
        />
        <AddContainerModal
          idFromFarm={idFromFarm}
          subIdFromNotify={subIdFromNotify}
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
              labelStyle={{ fontSize: sp(40) }}
              contentStyle={{ height: dp(130) }}
              style={ContainerScreenStyle.button}
              onPress={() => {
                hideCheckbox();
              }}
            >
              Cancel
            </Button>
            <Button
              mode="elevated"
              labelStyle={{ fontSize: sp(40) }}
              contentStyle={{ backgroundColor: "#44f321", height: dp(130) }}
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
