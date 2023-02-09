import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import cn from "classnames";

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
      {!selectedItem && (
        <View style={styles.container}>
          <View style={styles.row}>
            {row1.map((item, index) => (
              <View style={styles.gridItemWrapper}>
                <Text style={styles.gridItem} key={index}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.row}>
            {row2.map((item, index) => (
              <View style={styles.gridItemWrapper}>
                <Text style={styles.gridItem} key={index}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.row}>
            {row3.map((item, index) => (
              <View style={styles.gridItemWrapper}>
                <Text style={styles.gridItem} key={index}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.row}>
            {row4.map((item, index) => (
              <View style={styles.gridItemWrapper}>
                <Text style={styles.gridItem} key={index}>
                  {item}
                </Text>
              </View>
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
    fontSize: "16",
    padding: 5,
  },
});
