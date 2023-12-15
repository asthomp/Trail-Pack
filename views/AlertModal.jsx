// Displays a loading spinner component.
import { router } from "expo-router";
import React, { useState } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

import Loading from "./Loading";

export default function AlertModal({
  title,
  message,
  visible,
  setVisible,
  callback,
  callbackButtonTitle,
  route,
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          {loading ? <Loading /> : <Text variant="bodyMedium">{message}</Text>}
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={async () => {
              setVisible(false);
            }}
          >
            Cancel
          </Button>

          {callback ? (
            <Button
              onPress={async () => {
                setLoading(true);
                try {
                  const result = await callback();
                  if (result) {
                    setLoading(false);
                    setVisible(false);
                    if (route) {
                      router.push(route);
                    }
                  }
                } catch (error) {
                  console.error("Callback execution error:", error);
                  throw new Error(
                    "Callback to AlertModal must be a valid asynchronous function",
                  );
                }
              }}
            >
              {callbackButtonTitle}
            </Button>
          ) : null}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
