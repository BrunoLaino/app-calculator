import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

const components = (props) => {
  const stylesKey = [styles.key];
  if (props.double) stylesKey.push(styles.keyDouble);
  if (props.triple) stylesKey.push(styles.keyTriple);
  if (props.operation) stylesKey.push(styles.operationKey);

  return (
    <View>
      <TouchableHighlight onPress={() => props.onClick(props.label)}>
        <Text style={stylesKey}>{props.label}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  key: {
    fontSize: 40,
    height: Dimensions.get("window").width / 4,
    width: Dimensions.get("window").width / 4,
    padding: 20,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    borderWidth: 1,
  },
  keyDouble: {
    width: (Dimensions.get("window").width / 4) * 2,
  },
  keyTriple: {
    width: (Dimensions.get("window").width / 4) * 3,
  },
  operationKey: {
    color: "#fff",
    backgroundColor: "#fa8231",
  },
});

export default components;
