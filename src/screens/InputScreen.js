import React from 'react'
import {
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import HeaderTop from '../components/HeaderTop'
import * as Texts from "../components/Texts";

export default class InputScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      electronicType: props.route.params.electronicType ?? null,
      electronic: props.route.params.electronic ?? null,
      electronicWattType: props.route.params.electronicWattType ?? null,
      electronicWatt: props.route.params.electronicWatt ?? null,
      count: props.route.params.count ?? 1,
      // countHour: props.route.params.countHour ?? 0.5,
    }
  }

  handlePressSelect(item){
    if(item.select == 'electronicType'){
      this.setState({
        electronic: item.key,
        electronicType: item.value,
      })
    } else {
      this.setState({
        electronicWatt: item.key,
        electronicWattType: item.value,
      })
    }
  }

  buttonSelect(item) {
    const isSelected = this.state[item.select] == item.value
    return (
      <TouchableOpacity
        key={item.value}
        onPress={() => this.handlePressSelect(item)}
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
  
  render() {
    const electronicTable = [
      { key: "TV", value: "TV", select: "electronicType" },
      { key: "AC", value: "AC", select: "electronicType" },
      { key: "KipasAngin", value: "Kipas Angin", select: "electronicType" },
      { key: "Komputer", value: "Komputer", select: "electronicType" },
      { key: "Kulkas", value: "Kulkas", select: "electronicType" },
      { key: "Lampu", value: "Lampu", select: "electronicType" },
      { key: "", value: "Lainnya", select: "electronicType" },
    ];
    const electronicWattTable = [
      { key: "35", value: "35", select: "electronicWattType" },
      { key: "65", value: "65", select: "electronicWattType" },
      { key: "100", value: "100", select: "electronicWattType" },
      { key: "300", value: "300", select: "electronicWattType" },
      { key: "500", value: "500", select: "electronicWattType" },
      { key: "600", value: "600", select: "electronicWattType" },
      { key: "", value: "Lainnya", select: "electronicWattType" },
    ];

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1 }}
        >
          <KeyboardAvoidingView
            behavior="height"
            style={{ flex: 1, paddingTop: 15 }}
          >
            <View style={{ flex: 0, paddingBottom: 10 }}>
              <HeaderTop navigation={this.props.navigation}/>
            </View>
            <View style={styles.whiteBox}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                  <View>
                    <Texts.Medium>Pilih Elektronik</Texts.Medium>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      {electronicTable.map((p) => this.buttonSelect(p))}
                    </View>
                    {this.state.electronicType == "Lainnya" && (
                      <View style={{ paddingTop: 10 }}>
                        <TextInput
                          style={styles.textBox}
                          onChangeText={(text) =>
                            this.setState({ electronic: text })
                          }
                          value={this.state.electronic}
                          returnKeyType="done"
                        />
                      </View>
                    )}
                  </View>
                  <View style={{ paddingTop: 20 }} />
                  <View>
                    <Texts.Medium>Pilih Daya (Watt)</Texts.Medium>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      {electronicWattTable.map((p) => this.buttonSelect(p))}
                    </View>
                    {this.state.electronicWattType == "Lainnya" && (
                      <View style={{ paddingTop: 10 }}>
                        <TextInput
                          style={styles.textBox}
                          onChangeText={(text) =>
                            this.setState({ electronicWatt: text })
                          }
                          value={this.state.electronicWatt}
                          keyboardType="number-pad"
                          returnKeyType="done"
                        />
                      </View>
                    )}
                  </View>
                  <View style={{ paddingTop: 20 }} />
                  <View>
                    <Texts.Medium>Jumlah (Buah)</Texts.Medium>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          if (this.state.count > 1) {
                            this.setState({ count: (this.state.count -= 1) });
                          }
                        }}
                        style={[
                          styles.sideButton,
                          this.state.count > 1 && { backgroundColor: "#FDD759" },
                        ]}
                      >
                        <Ionicons name="ios-remove" size={24} color="#999" />
                      </TouchableOpacity>
                      <View style={styles.midButton}>
                        <Texts.Small>{this.state.count}</Texts.Small>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({ count: (this.state.count += 1) })
                        }
                        style={[styles.sideButton, { backgroundColor: "#FDD759" }]}
                      >
                        <Ionicons name="ios-add" size={24} color="#999" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ paddingTop: 20 }} />
                  {/* <View>
                    <Texts.Medium>Lama pemakaian (Jam)</Texts.Medium>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          if (this.state.count > 0.5) {
                            this.setState({ countHour: (this.state.countHour -= 0.5) });
                          }
                        }}
                        style={[
                          styles.sideButton,
                          this.state.countHour > 0.5 && { backgroundColor: "#FDD759" },
                        ]}
                      >
                        <Ionicons name="ios-remove" size={24} color="#999" />
                      </TouchableOpacity>
                      <View style={styles.midButton}>
                        <Texts.Small>{this.state.countHour}</Texts.Small>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({ countHour: (this.state.countHour += 0.5) })
                        }
                        style={[styles.sideButton, { backgroundColor: "#FDD759" }]}
                      >
                        <Ionicons name="ios-add" size={24} color="#999" />
                      </TouchableOpacity>
                    </View>
                  </View> */}
                </View>
              </ScrollView>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Summary", {
                    ...this.props.route.params,
                    ...this.state,
                    electronicList: this.props.route.params.electronicList ?? []
                  })
                }
                style={styles.buttonYellow}
              >
                <Texts.Medium style={{ fontWeight: "600" }}>
                  Lanjut
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
    flex: 1,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  sideButton: {
    flex: 1,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
  },
  midButton: {
    flex: 3,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
  },
  textBox: {
    backgroundColor: "#EFEFEF",
    padding: 15,
    borderRadius: 10,
    height: 50,
    fontFamily: "montserrat",
    fontSize: 18,
  },
  buttonYellow: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#FDD759",
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: "center",
  },
});