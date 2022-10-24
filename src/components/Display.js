import React from "react";
import { StyleSheet, Text, View } from "react-native";

const components = (props) => {
  return (
    <View style={styles.display}>
      <Text numberOfLines={1} style={styles.displayText}>
        {props.value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  displayText: {
    fontSize: 60,
    color: "#fff",
  },
});

export default components;
