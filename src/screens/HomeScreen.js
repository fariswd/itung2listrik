import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Texts from '../components/Texts'
import HeaderTop from '../components/HeaderTop';

export default class HomeScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      electricityType: '',
      watt: '',
      price: ''
    }
  }
  buttonSelect(item) {
    const isSelected = this.state[item.select] == item.key
    return (
      <TouchableOpacity
        key={item.value}
        onPress={() => this.setState({
          electricityType: item.value,
          watt: item.key,
          price: item.price,
        })}
        style={[{
          margin: 3,
          borderWidth: 0.5,
          paddingVertical: 5,
          paddingHorizontal: 15,
          borderRadius: 30,
          borderColor: '#999',
        },
        isSelected && {
          backgroundColor: '#5A9CA5',
          borderWidth: 0
        }
      ]}
      >
        <Texts.Small style={isSelected && {
          color: 'white'
        }}>
          {item.value}
        </Texts.Small>
      </TouchableOpacity>
    );
  }
  
  render(){
    const priceTable = [
      { key: 450, value: "450VA", price: "169", select: 'watt' },
      { key: 900, value: "900VA", price: "1352", select: 'watt' },
      { key: 1300, value: "1300VA", price: "1467.28", select: 'watt' },
      { key: 2200, value: "2200VA", price: "1467.28", select: 'watt' },
      { key: 'custom', value: "Lainnya", price: '', select: 'watt' }
    ];

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{flex: 1}}
        >
          <KeyboardAvoidingView
            behavior="height"
            style={{ flex: 1, paddingTop: 35, justifyContent: "space-between" }}>
            <HeaderTop navigation={this.props.navigation} from="home" />
            <View style={styles.whiteBox}>
              <View>
                <Texts.Medium style={{ fontWeight: "600" }}>
                  Pilih besaran watt rumah
                </Texts.Medium>
                <View style={{ flexDirection: "row", paddingTop: 10, flexWrap: 'wrap' }}>
                  {priceTable.map(p => this.buttonSelect(p))}
                </View>
              </View>

              <View style={{paddingTop: 15}} />

              <View>
                <Texts.Medium style={{ fontWeight: "600" }}>
                  Harga per kWh
                </Texts.Medium>
                <View style={{ flex: 1, flexDirection: "row", paddingTop: 10, height: 50}}>
                  <View style={{
                    flex: 0,
                    backgroundColor: '#EFEFEF',
                    padding: 15,
                    marginRight: 8,
                    borderRadius: 10,
                    height: 50
                  }}>
                    <Texts.Small>
                      Rp
                    </Texts.Small>
                  </View>
                  <View style={{
                    flex: 1,
                    backgroundColor: '#EFEFEF',
                    padding: 15,
                    borderRadius: 10,
                    height: 50,
                  }}>
                    <TextInput
                      editable={this.state.wattSelect == 'custom'}
                      style={{ fontFamily: 'montserrat', fontSize: 18 }}
                      onChangeText={text => this.setState({price: text})}
                      value={this.state.price}
                      keyboardType="number-pad"
                      returnKeyType="done"
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Input', {...this.state, type: 'add'})}
                style={styles.buttonYellow}>
                <Texts.Medium style={{ fontWeight: "600" }}>
                  Hitung
                </Texts.Medium>
              </TouchableOpacity>

            </View>
            
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  whiteBox: {
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  buttonYellow: {
    marginTop: 70,
    marginBottom: 30,
    backgroundColor: "#FDD759",
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: "center",
  },
});