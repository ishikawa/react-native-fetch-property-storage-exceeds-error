import { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import * as BlobRegistry from "react-native/Libraries/Blob/BlobRegistry";

const INIT_BLOBS = 196607 - 5;

export default function App() {
  const [blobRegistered, setBlobRegistered] = useState(false);
  const [isInLoading, setIsInLoading] = useState(false);

  const registerBlobs = useCallback(() => {
    for (let i = 0; i < INIT_BLOBS; i++) {
      const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
      BlobRegistry.register(uuid);
    }

    setBlobRegistered(true);
  }, []);

  const fetchReactNativeHomePage = useCallback(() => {
    setIsInLoading(true);
    fetch("https://reactnative.dev/").finally(() => setIsInLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        First, press "Register Blobs" button. It will register {INIT_BLOBS}{" "}
        blobs in BlobRegistry.
      </Text>
      <Button
        title="Register Blobs"
        onPress={registerBlobs}
        disabled={blobRegistered}
      />

      <Text>
        Second, press "Fetch" button few times. It will make a fetch request.
      </Text>
      <Button
        title="Fetch"
        onPress={fetchReactNativeHomePage}
        disabled={!blobRegistered}
      />

      <ActivityIndicator animating={isInLoading} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 40,
  },
});
