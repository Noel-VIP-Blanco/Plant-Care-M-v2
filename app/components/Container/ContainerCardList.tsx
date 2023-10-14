import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import React from "react";

//interface
import { ContainerCardListProps } from "@interface/ContainerCardList/ContainerCardListProps";

//components
import RenderContainerCard from "./RenderContainerCard";

const ContainerCardList: React.FC<ContainerCardListProps> = ({
  filteredData,
  checkboxVisible,
  setRemoveContainerID,
}) => {
  return (
    <View style={{ height: "95%" }}>
      {filteredData?.length === 0 ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            Containers Not Found
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ marginTop: 7 }}
          data={filteredData}
          renderItem={(
            { item } // Destructure 'item' from the 'renderItem' function argument
          ) => (
            <RenderContainerCard
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
