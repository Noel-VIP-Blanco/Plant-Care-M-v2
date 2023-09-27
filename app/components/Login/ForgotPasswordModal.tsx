import { View, Alert } from "react-native";
import { Modal, Portal, Button, Text, TextInput } from "react-native-paper";
import React, { useState } from "react";

//interface
import { ModalType } from "@root/app/interface";

const ForgotPasswordModal: React.FC<ModalType> = ({ visible, onClose }) => {
  const [email, setEmail] = useState("");
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose}>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            margin: 30,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              marginBottom: 10,
              fontWeight: "bold",
              color: "#2a9215",
            }}
          >
            Restore Password
          </Text>
          <Text style={{ fontSize: 20 }}>
            Enter your email address to restore your password
          </Text>
          <TextInput
            label="Email"
            value={email}
            style={{ margin: 10 }}
            contentStyle={{ width: 300 }}
            onChangeText={(text) => {
              setEmail(text);
            }}
            mode="outlined"
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 10,
            }}
          >
            <Button
              mode="elevated"
              onPress={() => {
                onClose();
              }}
              textColor="black"
              labelStyle={{ fontSize: 20 }}
              contentStyle={{ padding: 5 }}
              style={{ flex: 1, margin: 5 }}
            >
              Cancel
            </Button>
            <Button
              mode="elevated"
              onPress={() => {
                Alert.alert(
                  "Reset Password",
                  "Check your Gmail to reset your password"
                );
                onClose();
              }}
              textColor="black"
              labelStyle={{ fontSize: 24 }}
              contentStyle={{ backgroundColor: "#44f321", padding: 5 }}
              style={{ flex: 1, margin: 5 }}
            >
              Done
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ForgotPasswordModal;
