import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Styles";

export function CalculatorButtom(props) {
  return (
    <View style={styles.btnCalculatorBackground}>
      <TouchableOpacity
        onPress={() => props.calculator(props.buttom)}
        style={styles.btnCalculator}
      >
        <Text style={styles.fontColorCalc}>{props.buttom}</Text>
      </TouchableOpacity>
    </View>
  );
}
