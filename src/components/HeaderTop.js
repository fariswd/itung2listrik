import React from 'react'
import {
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import * as Texts from "../components/Texts";

const { width } = Dimensions.get('window')

const HeaderTop = (props) => {
  const [modal, setModal] = React.useState(false)
  return (
    <View
      style={{
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Texts.Big style={{ color: "white" }}>
        ITUNG 2 LISTRIK
      </Texts.Big>
      <Ionicons
        name="ios-settings"
        size={28}
        color="white"
        onPress={() => setModal(true)}
      />
      <Modal
        // animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <View style={{ flex: 1 }} />
          <View style={{
            backgroundColor: 'white',
            width: width-40,
            borderRadius: 10,
            paddingVertical: 15,
            paddingHorizontal: 10,
            // alignItems: 'center'
          }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10, borderBottomColor: '#999', borderBottomWidth: 0.5, marginBottom: 10}}>
              <View style={{flex: 1}}>
                <Texts.Medium>Info</Texts.Medium>
              </View>
              <View style={{ flex: 0, alignItems: 'flex-end'}}>
                <Ionicons
                  name="ios-close"
                  size={28}
                  color="#999"
                  onPress={() => setModal(false)}
                />
              </View>
            </View>
            <View style={{paddingHorizontal: 10}}>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://github.com/fariswd/itung2listrik')}
              >
                <Texts.Small
                  style={{ color: '#5A9CA5', textDecorationLine: 'underline'}}>
                  github.com/fariswd/itung2listrik
                </Texts.Small>
              </TouchableOpacity>
              <View style={{paddingVertical: 3}} />
              <Texts.Small>
                vector abang listrik: freepik.com
              </Texts.Small>
            </View>
            {props.from != "home" && <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Home')}
                style={{
                  marginTop: 10,
                  borderColor: "#D8B648",
                  borderWidth: 1,
                  borderRadius: 15,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  alignItems: "center",
                }}>
                <Texts.Small>
                  Kembali Ke Home
                </Texts.Small>
              </TouchableOpacity>
            </View>}
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </Modal>
    </View>
  );
}

export default HeaderTop