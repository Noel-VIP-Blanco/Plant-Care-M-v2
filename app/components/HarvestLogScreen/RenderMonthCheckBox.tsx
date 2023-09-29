import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { Checkbox, TouchableRipple, Text } from "react-native-paper";

//interface
import { RenderMonthCheckboxProps } from "@interface/RenderMonthCheckBox/RenderMonthCheckBoxProps";
const RenderMonthCheckBox: React.FC<RenderMonthCheckboxProps> = ({
  item,
  numberOfCheckedMonths,
  numberOfMonths,
  setNumberOfCheckedMonths,
  setCheckedListMonths,
  checkedAllMonths,
}) => {
  const [checkedMonth, setCheckedMonth] = useState(false);

  const handleCheckedMonth = () => {
    setCheckedMonth((prevValue) => !prevValue);
    setNumberOfCheckedMonths(
      (prevData) => (checkedMonth ? prevData - 1 : prevData + 1) // Use checkedMonth directly
    );

    if (!checkedMonth) {
      setCheckedListMonths((prevCheckedMonth) => [...prevCheckedMonth, item]);
    } else {
      setCheckedListMonths((prevCheckedMonth) =>
        prevCheckedMonth.filter((month) => month !== item)
      );
    }
  };
  //useEffect when selected all months
  useEffect(() => {
    if (checkedAllMonths) {
      setCheckedMonth(true);
    } else {
      if (numberOfCheckedMonths === numberOfMonths) {
        setCheckedMonth(false);
      }
    }
  }, [checkedAllMonths]);

  return (
    <TouchableRipple
      onPress={() => {
        handleCheckedMonth();
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox status={checkedMonth ? "checked" : "unchecked"} />
        <Text style={{ fontSize: 20 }}>{item}</Text>
      </View>
    </TouchableRipple>
  );
};

export default RenderMonthCheckBox;
