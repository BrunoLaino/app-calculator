import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { LogBox, Text, TouchableOpacity, View } from "react-native";
import { CalculatorButtom } from "./CalculatorButtom";
import { styles } from "./Styles";

export default function App() {
  LogBox.ignoreAllLogs;
  console.disableYellowBox = true;
  const [firstNum, setFirstNum] = useState(0);
  const [secondNum, setSecondNum] = useState(0);
  const [mathematicalSign, setMathematicalSign] = useState("");
  const [calc, setCalc] = useState("0");

  var buttons = [];

  function createCalculatorButtons() {
    for (var i = 0; i <= 9; i++) {
      buttons.push(i);
    }

    buttons.push("AC");
  }

  function calculator(n) {
    if (mathematicalSign == "") {
      setFirstNum(parseInt(firstNum.toString() + n.toString()));
      setCalc(parseInt(firstNum.toString() + n.toString()));
    }

    if ((n == "+" || n == "-" || n == "*" || n == "+/") && secondNum == 0) {
      setCalc(firstNum.toString() + n);
      setMathematicalSign(n);
    }

    if (mathematicalSign != "") {
      setSecondNum(parseInt(secondNum.toString() + n.toString()));
      setCalc(
        firstNum +
          mathematicalSign +
          parseInt(secondNum.toString() + n.toString())
      );
    }

    if (n == "=") {
      let result = 0;
      if (mathematicalSign == "+") {
        result = firstNum + secondNum;
      } else if (mathematicalSign == "-") {
        result = firstNum - secondNum;
      } else if (mathematicalSign == "*") {
        result = firstNum * secondNum;
      } else if (mathematicalSign == "/") {
        result = firstNum / secondNum;
      }

      continueCalculator(result);
    }

    if (n == "AC") {
      resetCalculator();
    }
  }

  function resetCalculator() {
    setCalc("0");
    setMathematicalSign("");
    setFirstNum(0);
    setSecondNum(0);
  }

  function continueCalculator(result) {
    setCalc(result);
    setMathematicalSign("");
    setFirstNum(result);
    setSecondNum(0);
  }

  createCalculatorButtons();

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar hidden />
      <View style={styles.top}>
        <Text style={styles.fontColorCalc}>{calc}</Text>
      </View>

      <View
        style={{ flexDirection: "row", height: "16.6%", alignItems: "center" }}
      >
        <TouchableOpacity
          onPress={() => calculator("+")}
          style={styles.btnMathematicalSign}
        >
          <Text style={styles.fontColorCalc}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => calculator("-")}
          style={styles.btnMathematicalSign}
        >
          <Text style={styles.fontColorCalc}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => calculator("/")}
          style={styles.btnMathematicalSign}
        >
          <Text style={styles.fontColorCalc}>/</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => calculator("*")}
          style={styles.btnMathematicalSign}
        >
          <Text style={styles.fontColorCalc}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => calculator("=")}
          style={styles.btnMathematicalSign}
        >
          <Text style={styles.fontColorCalc}>=</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnMenu}>
        {buttons.map(function (val) {
          return (
            <CalculatorButtom
              calculator={calculator}
              buttom={val}
            ></CalculatorButtom>
          );
        })}
      </View>
    </View>
  );
}
