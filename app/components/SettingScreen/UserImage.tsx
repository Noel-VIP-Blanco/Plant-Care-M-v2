import { View, Image } from "react-native";
import React from "react";

type UserImageProps = {
  photoURL: string;
};
const UserImage: React.FC<UserImageProps> = ({ photoURL }) => {
  const userImage = "../../../assets/PlantCareImages/PlantCareLogo.png";
  return (
    <View
      style={{
        marginTop: -70,
        alignItems: "center",
      }}
    >
      <View
        style={{
          //backgroundColor: "black",
          padding: 15,
          borderRadius: 70,
        }}
      >
        {/* <Ionicons name="person" color="white" size={90} /> */}
        <Image
          source={require(userImage)}
          //   source={{ uri: photoURL }}
          style={{ height: 120, width: 120, borderRadius: 60 }}
        />
      </View>
    </View>
  );
};

export default UserImage;
