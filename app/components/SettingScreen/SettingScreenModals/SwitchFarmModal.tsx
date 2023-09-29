import { View, Alert } from "react-native";
import React, { useState } from "react";

import { SelectList } from "react-native-dropdown-select-list";
import { Text, Modal, Portal } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

//components
import ModalButtons from "@components/Shared/ModalButtons";

//data
import { dummyFarmUser } from "@root/app/dummyData/DummyFarmUser";

type SwitchFarmModalProps = {
  visible: boolean;
  onClose: () => void;
};

const SwitchFarmModal: React.FC<SwitchFarmModalProps> = ({
  visible,
  onClose,
}) => {
  const navigation: any = useNavigation();
  const handleSwitchFarm = () => {
    Alert.alert("Switch Farm", "You have successfully switched farm ");
    navigation.reset({
      index: 0,
      routes: [{ name: "BottomTabContainer" }],
    });
  };

  const [selectFarm, setSelectFarm] = useState("");

  const farmUserData = dummyFarmUser
    .filter((farmUser) => farmUser.userId === "user1") // change userid to the login user
    .map((farmUser) => ({
      key: farmUser.farmId,
      value: farmUser.farmId,
    }));
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose}>
        <View
          style={{
            backgroundColor: "#ffffffff",
            padding: 20,
            margin: 30,
            borderRadius: 30,
          }}
        >
          <Text style={{ textAlign: "center", color: "green", fontSize: 35 }}>
            Choose Farm
          </Text>
          <View style={{ alignItems: "center" }}>
            <SelectList
              setSelected={(val: any) => setSelectFarm(val)}
              data={farmUserData}
              search={false}
              placeholder="Select Farm"
              save="key"
              boxStyles={{ width: 150, margin: 5 }}
              inputStyles={{ width: 100, fontSize: 20 }}
              dropdownStyles={{ height: 150 }}
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
