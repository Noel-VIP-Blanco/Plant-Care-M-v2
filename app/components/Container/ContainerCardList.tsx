import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import React from "react";

//interface
import { ContainerCardListProps } from "@interface/ContainerCardList/ContainerCardListProps";

//components
import RenderContainerCard from "./RenderContainerCard";
import { dp, sp } from "@root/utilities/shared/SpDp";

const ContainerCardList: React.FC<ContainerCardListProps> = ({
  filteredData,
  checkboxVisible,
  setRemoveContainerID,
  idFromFarm,
  subIdFromNotify,
}) => {
  return (
    <View style={{ height: "95%" }}>
      {filteredData.length === 0 ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text
            className="text-green-800 dark:text-green-400"
            style={{ fontSize: sp(70), fontWeight: "bold" }}
          >
            Container Not Found
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ marginTop: dp(12) }}
          data={filteredData}
          renderItem={(
            { item } // Destructure 'item' from the 'renderItem' function argument
          ) => (
            <RenderContainerCard
              idFromFarm={idFromFarm}
              subIdFromNotify={subIdFromNotify}
              container={item}
              checkboxVisible={checkboxVisible}
              setRemoveContainerID={setRemoveContainerID}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: 180,
          }}
        />
      )}
    </View>
  );
};

export default ContainerCardList;
