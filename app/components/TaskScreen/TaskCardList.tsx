import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
//component
import RenderTaskCard from "@components/TaskScreen/RenderTaskCard";

//interface
import { TaskCardListProps } from "@interface/TaskCardList/TaskCardListProps";
import { dp, sp } from "@root/utilities/shared/SpDp";

const TaskCardList: React.FC<TaskCardListProps> = ({
  filteredData,
  checkboxVisible,
  setHarvestTasksID,
}) => {
  return (
    <View style={{ height: "95%" }}>
      {filteredData.length === 0 ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text
            className="text-green-800 dark:text-green-400"
            style={{ fontSize: sp(55), fontWeight: "bold" }}
          >
            Task Not Found
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ marginTop: dp(10) }}
          data={filteredData}
          renderItem={(
            { item } // Destructure 'item' from the 'renderItem' function argument
          ) => (
            <RenderTaskCard
              item={item} // Pass the 'item' directly to the RenderTaskCard component
              checkboxVisible={checkboxVisible}
              setCompleteTasksID={setHarvestTasksID}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            marginTop: dp(-20),
            paddingBottom: 150,
          }}
        />
      )}
    </View>
  );
};

export default TaskCardList;
