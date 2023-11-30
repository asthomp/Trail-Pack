// Displays a loading spinner component.
import { router } from "expo-router";
import React, { useState } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

import Loading from "./Loading";

export default function DeleteModal({
  title,
  message,
  visible,
  setVisible,
  callback,
  callbackTitle,
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
                await callback();
                setLoading(false);
                setVisible(false);
                route ? router.push(route) : null;
              }}
            >
              {callbackTitle}
            </Button>
          ) : null}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
