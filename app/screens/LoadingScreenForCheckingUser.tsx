import { View } from "react-native";
import { ActivityIndicator, Modal, Portal, Text } from "react-native-paper";
import React, { FC } from "react";
interface ILoadingScreenForCheckingUser {
  title: string;
  showActivityIndicator: boolean;
}
const LoadingScreenForCheckingUser: FC<ILoadingScreenForCheckingUser> = ({
  title,
  showActivityIndicator,
}) => {
  return (
    <Portal>
      <Modal visible={showActivityIndicator}>
        <View
          style={{
            backgroundColor: "#ffffffff",
            padding: 20,
            margin: 60,
            borderRadius: 30,
          }}
        >
          {title && (
            <Text
              style={{ fontSize: 25, textAlign: "center", fontWeight: "bold" }}
            >
              {title}
            </Text>
          )}

          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      </Modal>
    </Portal>
  );
};
export default LoadingScreenForCheckingUser;
