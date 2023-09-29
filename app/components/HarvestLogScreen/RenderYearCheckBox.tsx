import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { Checkbox, TouchableRipple, Text } from "react-native-paper";

//interface
import { RenderYearCheckboxProps } from "@interface/RenderYearCheckBox/RenderYearCheckBoxProps";
const RenderYearCheckBox: React.FC<RenderYearCheckboxProps> = ({
  item,
  numberOfCheckedYears,
  numberOfYears,
  setNumberOfCheckedYears,
  setCheckedListYears,
  checkedAllYear,
}) => {
  const [checkedYear, setCheckedYear] = useState(false);

  const handleCheckedYear = () => {
    setCheckedYear((prevValue) => !prevValue);
    setNumberOfCheckedYears(
      (prevData) => (checkedYear ? prevData - 1 : prevData + 1) // Use checkedYears directly
    );

    if (!checkedYear) {
      setCheckedListYears((prevCheckedYear) => [...prevCheckedYear, item]);
    } else {
      setCheckedListYears((prevCheckedYear) =>
        prevCheckedYear.filter((year) => year !== item)
      );
    }
  };
  //useEffect when selected all Years
  useEffect(() => {
    if (checkedAllYear) {
      setCheckedYear(true);
    } else {
      if (numberOfCheckedYears === numberOfYears) {
        setCheckedYear(false);
      }
    }
  }, [checkedAllYear]);

  return (
    <TouchableRipple
      onPress={() => {
        handleCheckedYear();
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox status={checkedYear ? "checked" : "unchecked"} />
        <Text style={{ fontSize: 20 }}>{item}</Text>
      </View>
    </TouchableRipple>
  );
};

export default RenderYearCheckBox;
