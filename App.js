import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./src/components/Button";
import Display from "./src/components/Display";

export default function App() {
  const [initialState, setInitialState] = useState({
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
  });
  const [state, setState] = useState({ ...initialState });

  addDigit = (n) => {
    let newState = { ...state };

    const clearDisplay = state.displayValue === "0" || state.clearDisplay;

    if (n === "." && !clearDisplay && newState.displayValue.includes(".")) {
      return;
    }
    const currentValue = clearDisplay ? "" : state.displayValue;
    const displayValue = currentValue + n;
    newState.displayValue = displayValue;
    newState.clearDisplay = false;
    setState({ ...newState });
    console.log(state);
    if (n !== ".") {
      const newValue = parseFloat(displayValue);
      const values = [...state.values];
      values[state.current] = newValue;
      newState.values = values;
      setState({ ...newState });
    }
  };

  clearMemory = () => {
    setState({ ...initialState });
  };

  setOperation = (operation) => {
    if (state.current === 0) {
      setState({ ...state, operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const values = [...state.values];
      try {
        values[0] = eval(`${values[0]} ${state.operation} ${values[1]}`);
      } catch (e) {
        values[0] = state.values[0];
      }

      values[1] = setState({
        displayValue: `${values[0]}`,
        clearDisplay: true,
        operation: equals ? null : operation,
        values,
        current: equals ? 0 : 1,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Display value={state.displayValue}></Display>
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory}></Button>
        <Button label="/" operation onClick={setOperation}></Button>
        <Button label="7" onClick={addDigit}></Button>
        <Button label="8" onClick={addDigit}></Button>
        <Button label="9" onClick={addDigit}></Button>
        <Button label="*" operation onClick={setOperation}></Button>
        <Button label="4" onClick={addDigit}></Button>
        <Button label="5" onClick={addDigit}></Button>
        <Button label="6" onClick={addDigit}></Button>
        <Button label="-" operation onClick={setOperation}></Button>
        <Button label="1" onClick={addDigit}></Button>
        <Button label="2" onClick={addDigit}></Button>
        <Button label="3" onClick={addDigit}></Button>
        <Button label="+" operation onClick={setOperation}></Button>
        <Button label="0" double onClick={addDigit}></Button>
        <Button label="." onClick={addDigit}></Button>
        <Button label="=" operation onClick={setOperation}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
