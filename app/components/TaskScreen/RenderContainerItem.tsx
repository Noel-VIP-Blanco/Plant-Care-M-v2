import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { Checkbox, TouchableRipple, Text } from "react-native-paper";
//interface
import { RenderContainerItemProps } from "@interface/RenderContainerItem/RenderContainerItemProps";
import { sp } from "@root/utilities/shared/SpDp";

const RenderContainerItem: React.FC<RenderContainerItemProps> = ({
  item,
  setNumberOfCheckedContainer,
  checkedAllContainer,
  numberOfCheckedContainer,
  numberOfContainers,
  setCheckedListContainerId,
}) => {
  const [checkedContainerId, setCheckedContainerId] = useState(false);

  const handleCheckedContainerId = () => {
    setCheckedContainerId((prevValue) => !prevValue); // Use the functional update to get the latest value
    setNumberOfCheckedContainer(
      (prevData) => (checkedContainerId ? prevData - 1 : prevData + 1) // Use checkedContainerId directly
    );

    if (!checkedContainerId) {
      setCheckedListContainerId((prevCheckedContainer) => [
        ...prevCheckedContainer,
        item.key,
      ]);
    } else {
      setCheckedListContainerId((prevCheckedContainer) =>
        prevCheckedContainer.filter((containerId) => containerId !== item.key)
      );
    }
  };
  //useEffect when selected all containers
  useEffect(() => {
    if (checkedAllContainer) {
      setCheckedContainerId(true);
    } else {
      if (numberOfCheckedContainer === numberOfContainers) {
        setCheckedContainerId(false);
      }
    }
  }, [checkedAllContainer]);
  return (
    <TouchableRipple
      onPress={() => {
        handleCheckedContainerId();
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox status={checkedContainerId ? "checked" : "unchecked"} />
        <Text style={{ fontSize: sp(45) }}>{item.value}</Text>
      </View>
    </TouchableRipple>
  );
};

export default RenderContainerItem;
