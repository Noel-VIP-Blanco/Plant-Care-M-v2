import { View } from "react-native";
import { ActivityIndicator, Modal, Portal, Text } from "react-native-paper";
import React, { FC } from "react";
import { dp, sp } from "@root/utilities/shared/SpDp";
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
            padding: dp(50),
            margin: dp(150),
            borderRadius: dp(70),
          }}
        >
          {title && (
            <Text
              style={{
                fontSize: sp(60),
                textAlign: "center",
                fontWeight: "bold",
              }}
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
