// Displays a modal with an optional action.
import { Button, Dialog, Portal, Text } from "react-native-paper";

import Loading from "./Loading";

export default function AlertModal({
  callback,
  callbackButtonTitle = "Okay",
  loading = false,
  message,
  onCancel,
  title,
  visible,
}) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          {loading ? <Loading /> : <Text variant="bodyMedium">{message}</Text>}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>Cancel</Button>
          {callback ? (
            <Button onPress={callback}>{callbackButtonTitle}</Button>
          ) : null}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
