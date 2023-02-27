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

  const stopCounter = () => {
    setCounter(null);
    setSelectedItem(null);
  };
  const selectItem = (item) => {
    if (item === "") {
      return;
    }
    setCounter(0);
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
    <SafeAreaView style={{ height: "100%" }} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      {selectedItem && (
        <TouchableOpacity style={styles.on} onPress={stopCounter}>
          <View
            style={{
              height: "100%",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <Text style={styles.selectedItem}>{selectedItem}</Text>
            </View>
            {counter !== null && (
              <View style={styles.counter}>
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
          </View>
        </TouchableOpacity>
      )}
      {!selectedItem && (
        <View style={styles.container}>
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
    margin: 5,
  },
  gridItem: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    padding: 5,
    fontWeight: "bold",
  },
  on: {
    backgroundColor: "#06601D",
    margin: 30,
  },
  selectedItem: {
    color: "white",
    textAlign: "center",
    fontSize: 32,
    padding: 20,
    fontWeight: "bold",
  },
  counter: {
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
});
