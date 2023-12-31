import { View, Alert } from "react-native";
import React, { useState } from "react";

import { SelectList } from "react-native-dropdown-select-list";
import { Text, Modal, Portal } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

//components
import ModalButtons from "@components/Shared/ModalButtons";

//data
import { useAppSelector } from "@reduxToolkit/Hooks";
import { selectFarms } from "@reduxToolkit/Features/FarmSlice";
import { setFarm } from "@root/utilities/shared/LocalStorage";
import { dp, sp } from "@root/utilities/shared/SpDp";

type SwitchFarmModalProps = {
  visible: boolean;
  onClose: () => void;
};

const SwitchFarmModal: React.FC<SwitchFarmModalProps> = ({
  visible,
  onClose,
}) => {
  const farms = useAppSelector(selectFarms);
  const navigation: any = useNavigation();
  const handleSwitchFarm = async () => {
    Alert.alert("Switch Farm", "You have successfully switched farm ");
    await await setFarm(parseInt(selectFarm));
    navigation.reset({
      index: 0,
      routes: [{ name: "LoadingScreenForSetupFarm" }],
    });
  };

  const [selectFarm, setSelectFarm] = useState("");

  const farmUserData = farms.map((farm) => ({
    key: farm.id,
    value: farm.name,
  }));
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose}>
        <View
          className="bg-white dark:bg-slate-800"
          style={{
            padding: dp(50),
            margin: dp(70),
            borderRadius: dp(70),
          }}
        >
          <Text
            className="text-green-800 dark:text-green-400"
            style={{ textAlign: "center", fontSize: sp(80) }}
          >
            Choose Farm
          </Text>
          <View style={{ alignItems: "center" }}>
            <SelectList
              setSelected={(val: any) => setSelectFarm(val)}
              data={farmUserData}
              search={false}
              placeholder="Select Farm"
              save="key"
              boxStyles={{
                width: dp(400),
                backgroundColor: "white",
                margin: dp(10),
              }}
              inputStyles={{ width: dp(280), fontSize: sp(40) }}
              dropdownTextStyles={{ fontSize: sp(40) }}
              dropdownStyles={{ backgroundColor: "white" }}
            />
          </View>
          {/* 2 button inside - cancel and confirm buttom */}
          <ModalButtons
            labelForSave="Switch Farm"
            onSave={handleSwitchFarm}
            onClose={onClose}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default SwitchFarmModal;
