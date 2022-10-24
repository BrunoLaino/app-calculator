import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";

import Display from "./src/components/Display";
import Key from "./src/components/Keys";

import { server } from "./src/common";



export default function App() {
  const [initialState, setInitialState] = useState({
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
  });

  const [calculatorState, setCalculatorState] = useState({
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
  });

  const addDigit = (n) => {
    const clearDisplay =
      calculatorState.displayValue === "0" || calculatorState.clearDisplay;

    if (
      n === "." &&
      !clearDisplay &&
      calculatorState.displayValue.includes(".")
    ) {
      return;
    }

    const currentValue = clearDisplay ? "" : calculatorState.displayValue;
    const displayValue = currentValue + n;
    setCalculatorState((previousState) => {
      return {
        ...previousState,
        displayValue: displayValue,
        clearDisplay: false,
      };
    });
    if (n !== ".") {
      const newValue = parseFloat(displayValue);
      const values = [...calculatorState.values];
      values[calculatorState.current] = newValue;
      setCalculatorState((previousState) => {
        return { ...previousState, values };
      });
    }
  };

  const clearMemory = () => {
    setCalculatorState({ ...initialState });
  };

  const setOperation = (operation) => {
    if (calculatorState.current === "0") {
      setCalulatorState((previousState) => {
        return { ...previousState, operation, current: 1, clearDisplay: true };
      });
    } else {
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      axios
        .post(`${server}/operations`, {
          values: [...calculatorState.values],
          operation: calculatorState.operation,
        })
        .then(function (response) {
          const equals = operation === "=";
          setCalculatorState({
            displayValue: `${response.data.values[0]}`,
            operation: equals ? null : operation,
            current: equals ? 0 : 1,
            clearDisplay: true,
            values: response.data.values,
          });
        })
        .catch(function (error) {
          console.log(
            "There has been a problem with your fetch operation: " +
              error.message
          );
          alert(error.message);          
          throw error;
        });
    }
  };

  return (
    <View style={styles.container}>
      <Display value={calculatorState.displayValue} />
      <View style={styles.keyboard}>
        <Key label="AC" triple onClick={clearMemory} />
        <Key label="/" operation onClick={setOperation} />
        <Key label="7" onClick={addDigit} />
        <Key label="8" onClick={addDigit} />
        <Key label="9" onClick={addDigit} />
        <Key label="*" operation onClick={setOperation} />
        <Key label="4" onClick={addDigit} />
        <Key label="5" onClick={addDigit} />
        <Key label="6" onClick={addDigit} />
        <Key label="-" operation onClick={setOperation} />
        <Key label="1" onClick={addDigit} />
        <Key label="2" onClick={addDigit} />
        <Key label="3" onClick={addDigit} />
        <Key label="+" operation onClick={setOperation} />
        <Key label="0" double onClick={addDigit} />
        <Key label="." onClick={addDigit} />
        <Key label="=" operation onClick={setOperation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboard: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
