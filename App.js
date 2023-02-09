import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [counter, setCounter] = useState(null);
  const row1 = [
    "3 mm",
    "Fine Dust",
    "6 mm",
    "10 mm",
    "14 mm",
    "20 mm",
    "28 mm",
  ];
  const row2 = [
    "",
    "Slurry Dust",
    "6 mm BEST",
    "10 mm BEST",
    "14 mm BEST",
    "20 mm BEST",
    "",
  ];
  const row3 = [
    "40 mm",
    "Rail + Ballas",
    "Formpave",
    "Type 3",
    "Blend 66",
    "75 / 40",
    "20 / 5",
  ];
  const row4 = ["ROAD BLEND", "WGS", "Oversized", "6F5", "10S/D", "6S/D", ""];

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
  return (
    <SafeAreaView style={{ height: "100%" }}>
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
    margin: 10,
  },
  gridItemWrapper: {
    width: "14.2%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    margin: 5,
  },
  gridItem: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    padding: 5,
  },
  on: {
    backgroundColor: "green",
    margin: 30,
  },
  selectedItem: {
    color: "white",
    textAlign: "center",
    fontSize: 32,
    padding: 20,
  },
  counter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  counterDigit: {
    color: "white",
    fontSize: 28,
  },
  blinker: {
    color: "white",
    fontSize: 28,
  },
});
