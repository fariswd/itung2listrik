import React from 'react'
import {
  Text,
} from 'react-native'

export function Big (props) {
  return (
    <Text style={[{ fontFamily: "montserrat", fontSize: 28 }, props.style]}>
      {props.children}
    </Text>
  );
}

export function Medium(props) {
  return (
    <Text style={[{ fontFamily: "montserrat", fontSize: 20 }, props.style]}>
      {props.children}
    </Text>
  );
}

export function Small(props) {
  return (
    <Text style={[{ fontFamily: "montserrat", fontSize: 16 }, props.style]}>
      {props.children}
    </Text>
  );
}