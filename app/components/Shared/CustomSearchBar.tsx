import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import React, { useState } from "react";
import { useColorScheme } from "nativewind";
//interface
import { CustomSearchBarProps } from "@interface/Shared/CustomSearchBarProps";

//style
import { CustomSearchBarStyle } from "@stylesheets/CustomSearchBar/CustomSearchBarStyle";
const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  onSearch,
  searchValue,
}) => {
  const { colorScheme } = useColorScheme();
  const [searchTask, setSearchTask] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchTaskHandler = (value: string) => {
    onSearch(value);
    setSearchTask(value);
  };

  const clearSearchHandle = () => {
    onSearch("");
    setSearchTask("");
  };

  const handleSearchFocused = () => {
    setIsSearchFocused(true);
  };
  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <View style={CustomSearchBarStyle.searchBarContainer}>
      <Searchbar
        onChangeText={(newValue) => {
          searchTaskHandler(newValue);
        }}
        elevation={3}
        placeholder={"Search " + searchValue + " Name"}
        value={searchTask}
        style={{ width: "85%" }}
        inputStyle={{ color: colorScheme === "light" ? "black" : "white" }}
        className="bg-white dark:bg-slate-600"
        onFocus={handleSearchFocused}
        onBlur={handleSearchBlur}
      />
    </View>
  );
};

export default CustomSearchBar;
