import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [destination, setDestination] = useState(null);
  const [counter, setCounter] = useState(null);
  const row1 = [
    "3 mm",
    "FINE DUST",
    "SLURRY DUST",
    "6 mm",
    "10 mm",
    "14 mm",
    "20 mm",
  ];
  const row2 = [
    "28 mm",
    "40 mm",
    "RAIL BALLAST",
    "6 mm BEST",
    "10 mm BEST",
    "14 mm BEST",
    "20 mm BEST",
  ];
  const row3 = [
    "TYPE 1",
    "TYPE 3",
    "BLEND 66",
    "BLEND 20/5",
    "FORMPAVE",
    "75/40",
    "OVERSIZED",
  ];
  const row4 = [
    "ROAD BLEND",
    "WASHED GRANIT SAND",
    "GF5",
    "6 mm SURFACE DRESSING",
    "10 mm SURFACE DRESSING",
    "",
    "",
  ];

  const destinationRow1 = ["STOCK", "BENNY", "WASHPLANT"];
  const destinationRow2 = ["ST HEAVENS", "EXTENSION", "OTHER"];

  const stopCounter = () => {
    setCounter(null);
    setSelectedItem(null);
    setDestination(null);
  };
  const startCounter = (destination) => {
    setDestination(destination);
    setCounter(0);
  };
  const selectItem = (item) => {
    if (item === "") {
      return;
    }
    setSelectedItem(item);
  };

  useEffect(() => {
    let timer1;
    if (counter !== null) {
      timer1 = setTimeout(() => {
        setCounter((counter) => counter + 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timer1);
    };
  }, [counter]);

  useEffect(() => {
    async function prepare() {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAppIsReady(true);
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      {selectedItem && (
        <View style={{ height: "100%", backgroundColor: "#06601D" }}>
          {!destination && (
            <View style={styles.fullHeight}>
              <View>
                <Text style={styles.selectedItem}>{selectedItem}</Text>
              </View>
              <View style={styles.destinationRow}>
                {destinationRow1.map((item, index) => (
                  <View style={{ flex: 1 }} key={index}>
                    <TouchableOpacity
                      onPress={() => startCounter(item)}
                      style={styles.destinationColumn}
                    >
                      <Text style={styles.destinationItem}>{item}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <View style={styles.destinationRow}>
                {destinationRow2.map((item, index) => (
                  <View style={{ flex: 1 }} key={index}>
                    <TouchableOpacity
                      onPress={() => startCounter(item)}
                      style={styles.destinationColumn}
                    >
                      <Text style={styles.destinationItem}>{item}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}
          {destination && (
            <View style={styles.fullHeight}>
              <TouchableOpacity onPress={stopCounter}>
                <View
                  style={{
                    height: "80%",
                    flexDirection: "row",
                    borderBottomColor: "white",
                    borderBottomWidth: 3,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      width: "50%",
                      alignContent: "center",
                      justifyContent: "center",
                      borderRightColor: "white",
                      borderRightWidth: 3,
                    }}
                  >
                    <Text style={styles.selectedItem}>{selectedItem}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      width: "50%",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.selectedItem}>{destination}</Text>
                  </View>
                </View>
                {counter !== null && (
                  <View
                    style={{
                      height: "20%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.counterDigit}>
                      {Math.floor((counter % (60 * 60 * 24)) / (60 * 60))
                        .toString()
                        .padStart(2, "0")}
                    </Text>
                    <Text style={styles.blinker}>:</Text>
                    <Text style={styles.counterDigit}>
                      {Math.floor((counter % (60 * 60)) / 60)
                        .toString()
                        .padStart(2, "0")}
                    </Text>
                    <Text style={styles.blinker}>:</Text>
                    <Text style={styles.counterDigit}>
                      {Math.floor(counter % 60)
                        .toString()
                        .padStart(2, "0")}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      {!selectedItem && (
        <View style={styles.fullHeight}>
          <View style={styles.row}>
            {row1.map((item, index) => (
              <TouchableOpacity
                style={styles.gridItemWrapper}
                onPress={() => selectItem(item)}
                key={index}
              >
                <Text style={styles.gridItem}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {row2.map((item, index) => (
              <TouchableOpacity
                style={styles.gridItemWrapper}
                onPress={() => selectItem(item)}
                key={index}
              >
                <Text style={styles.gridItem}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {row3.map((item, index) => (
              <TouchableOpacity
                style={styles.gridItemWrapper}
                onPress={() => selectItem(item)}
                key={index}
              >
                <Text style={styles.gridItem}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {row4.map((item, index) => (
              <TouchableOpacity
                style={styles.gridItemWrapper}
                onPress={() => selectItem(item)}
                key={index}
              >
                <Text style={styles.gridItem}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  fullHeight: {
    height: "100%",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    height: "25%",
    marginTop: 10,
  },
  gridItemWrapper: {
    width: "14.2%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#595959",
    marginLeft: 5,
  },
  gridItem: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    padding: 5,
    fontWeight: "bold",
  },
  selectedItem: {
    color: "white",
    textAlign: "center",
    fontSize: 32,
    padding: 20,
    fontWeight: "bold",
  },
  counter: {
    flex: 1,
    height: "20%",
    flexDirection: "row",
    justifyContent: "center",
  },
  counterDigit: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  blinker: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  destinationColumn: {
    borderColor: "black",
    borderWidth: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
  destinationRow: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
  destinationItem: {
    fontWeight: "bold",
    fontSize: 24,
  },
});
