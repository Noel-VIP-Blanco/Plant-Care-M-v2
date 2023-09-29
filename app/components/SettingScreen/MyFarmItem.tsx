import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

//stylesheets
import { SettingScreenStyle } from "@stylesheets/Setting/SettingScreenStyle";

//components
import SwitchFarmModal from "./SettingScreenModals/SwitchFarmModal";

const MyFarmItem = ({ navigation }: any) => {
  //swtich farm modal
  const [switchFarmModalVisible, setSwitchFarmModalVisible] = useState(false);
  const openSwitchFarmModal = () => setSwitchFarmModalVisible(true);
  const closeSwitchFarmModal = () => setSwitchFarmModalVisible(false);

  return (
    <>
      <View style={SettingScreenStyle.itemContainer}>
        <View style={SettingScreenStyle.accountBox1}>
          <Ionicons
            name="swap-horizontal-sharp"
            style={SettingScreenStyle.accountBox1Icon}
          />
          <Text>Switch Farm</Text>
        </View>
        <View style={SettingScreenStyle.accountBox2}>
          <View style={SettingScreenStyle.acountBox2Items}>
            {/* change on the current farm used by user */}
            <Text>farm1</Text>
            <TouchableOpacity
              onPress={() => {
                openSwitchFarmModal();
              }}
            >
              <Ionicons
                name="arrow-forward"
                style={SettingScreenStyle.accountBox2Icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Switch farm modal */}
      <SwitchFarmModal
        visible={switchFarmModalVisible}
        onClose={closeSwitchFarmModal}
      />
    </>
  );
};

export default MyFarmItem;
