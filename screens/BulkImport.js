import {
  Avatar,
  Button,
  Card,
  HelperText,
  IconButton,
  TextInput,
} from "react-native-paper";

export default function BulkImport({
  data,
  error,
  importBulkData,
  onEditData,
  onLeave,
}) {
  const title = "Add Bulk Items";
  const subtitle = "LighterPack Share URL";

  return (
    <Card
      style={{
        flexGrow: 1,
        margin: 10,
      }}
    >
      <Card.Title
        title={title}
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
        right={() => (
          <IconButton
            icon="chevron-left"
            mode="contained"
            onPress={onLeave}
            style={{ marginRight: 20 }}
          />
        )}
      />
      <Card.Content>
        <TextInput
          label={subtitle}
          editable
          inputMode="url"
          value={data}
          error={!!error}
          onChangeText={(x) => {
            onEditData(x);
          }}
        />
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => {
            importBulkData();
          }}
        >
          Submit
        </Button>
      </Card.Actions>
    </Card>
  );
}
