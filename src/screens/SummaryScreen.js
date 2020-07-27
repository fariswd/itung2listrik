import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import HeaderTop from '../components/HeaderTop'
import * as Texts from "../components/Texts";

export default class SummaryScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      electronicList: false,
      update: false,
      isDelete: false,
      isUpdate: false,
    }
  }
  componentDidMount(){
    const {params} = this.props.route
    const electronic = {
      electronicType: params.electronicType,
      electronic: params.electronic,
      electronicWatt: params.electronicWatt,
      electronicWattType: params.electronicWattType,
      count: params.count,
      countHour: params.countHour,
    }
    this.setState({
      electronicList: [electronic]
    })
  }
  shouldComponentUpdate(nextProps, nextState){
    if(this.state.isUpdate){
      const { params } = nextProps.route
      const electronic = {
        electronicType: params.electronicType,
        electronic: params.electronic,
        electronicWatt: params.electronicWatt,
        electronicWattType: params.electronicWattType,
        count: params.count,
        // countHour: params.countHour,
      }
      let newElectronicList = [...params.electronicList]
      newElectronicList[params.key] = electronic
      this.setState({
        electronicList: newElectronicList,
        isUpdate: false
      })
      return true
    }
    if(this.state.isDelete){
      this.setState({ isDelete: false })
      return true
    }
    if (!this.state.update && !this.state.isUpdate){
      const { params } = this.props.route
      const electronic = {
        electronicType: params.electronicType,
        electronic: params.electronic,
        electronicWatt: params.electronicWatt,
        electronicWattType: params.electronicWattType,
        count: params.count,
        // countHour: params.countHour,
      }
      this.setState({
        electronicList: [
          ...this.props.route.params.electronicList,
          electronic],
          update: true
      })
      return true
    }
    return true
  }
  spacingDecimals(num){
    let newNum = num.toString().split('.')
    let decimals = newNum[1] ? `,${newNum[1]}` : ''
    return newNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + decimals ;
  }
  calculate(type){
    if (!this.state.electronicList) return 0
    const { params } = this.props.route
    let result = 0
    switch (type) {
      case 'hour':
        this.state.electronicList.forEach(e => {
          result += Math.round(e.count * e.electronicWatt /1000 * params.price)
        })
        return result
        break;
      case 'day':
        this.state.electronicList.forEach(e => {
          result += Math.round(e.count * e.electronicWatt /1000 * params.price * 24)
        })
        return result
        break;
      case 'month':
        this.state.electronicList.forEach(e => {
          result += Math.round(e.count * e.electronicWatt /1000 * params.price * 24 * 30)
        })
        return result
        break;
      default:
        return result
        break;
    }
  }

  render() {
    // console.log('--render')
    const {params} = this.props.route
    const { electronicList } = this.state
    // console.log(this.state.electronicList)
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
                  <Texts.Medium>Ringkasan Pemakaian</Texts.Medium>
                </View>
                <View style={styles.textList}>
                  <Texts.Medium>Watt Rumah</Texts.Medium>
                  <Texts.Medium>{params.electricityType}</Texts.Medium>
                </View>

                <View style={styles.textList}>
                  <Texts.Medium>Harga per KWh</Texts.Medium>
                  <Texts.Medium>Rp.{this.spacingDecimals(+params.price)}</Texts.Medium>
                </View>
                
                {electronicList && electronicList.map((electronic, key) => {
                  return (
                    <View key={key} style={{flexDirection: 'row', paddingTop: 20}}>
                      <View style={{flex: 0, paddingRight: 20}}>
                        <Texts.Medium>{electronic.count}x</Texts.Medium>
                      </View>
                      <View style={{flex: 2}}>
                        <View style={{flexDirection: 'row'}}>
                          <Texts.Medium>{electronic.electronicType}</Texts.Medium>
                          <View style={{paddingRight: 5}}/>
                          <Texts.Medium>{electronic.electronicWatt}W</Texts.Medium>
                        </View>
                        <Texts.Small>/jam Rp.{this.spacingDecimals(Math.round(electronic.electronicWatt/1000*params.price))} </Texts.Small>
                        <Texts.Small>/hari Rp.{this.spacingDecimals(Math.round(electronic.electronicWatt/1000*params.price*24))}</Texts.Small>
                        <Texts.Small>/bulan Rp.{this.spacingDecimals(Math.round(electronic.electronicWatt/1000*params.price*24*30))}</Texts.Small>
                      </View>
                      <View style={{flex: 0}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ isUpdate: true }, () => {
                              this.props.navigation.push("Input", {
                                key: key,
                                ...electronic,
                                electronicList: this.state.electronicList
                              })
                            })
                          }}
                          style={{borderWidth: 0.5, borderColor: '#999', padding: 8, borderRadius: 10}}>
                          <FontAwesome name="pencil" size={16} color="#6F6F6F" />
                        </TouchableOpacity>
                        <View style={{paddingTop: 10}} />
                        <TouchableOpacity
                          onPress={() => {
                            if(key == 0) this.props.navigation.navigate('Home')
                            const newElectronicList = this.state.electronicList.splice(key, 1)
                            this.setState({isDelete: true, electronicList: newElectronicList})
                          }}
                          style={{borderWidth: 0.5, borderColor: '#999', padding: 8, borderRadius: 10}}>
                          <FontAwesome name="trash" size={16} color="#6F6F6F" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                })}

                <View style={styles.textList}>
                  <Texts.Medium>Cost per jam</Texts.Medium>
                  <Texts.Medium>Rp.{this.spacingDecimals(this.calculate('hour'))}</Texts.Medium>
                </View>

                <View style={styles.textList}>
                  <Texts.Medium>Cost per hari</Texts.Medium>
                  <Texts.Medium>Rp.{this.spacingDecimals(this.calculate('day'))}</Texts.Medium>
                </View>

                <View style={styles.textList}>
                  <View>
                    <Texts.Medium>Cost per bulan</Texts.Medium>
                    <Texts.Small>*30 hari</Texts.Small>
                  </View>
                  <Texts.Medium>Rp.{this.spacingDecimals(this.calculate('month'))}</Texts.Medium>
                </View>

              </ScrollView>
              {/* <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Home")
                }
                style={[styles.buttonExit, {marginBottom: 0}]}
              >
                <Texts.Medium style={{ fontWeight: "600" }}>
                  Keluar
                </Texts.Medium>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() =>{
                  this.setState({update: false})
                  this.props.navigation.push("Input", {
                    electronicList: this.state.electronicList
                  })
                }}
                style={styles.buttonYellow}
              >
                <Texts.Medium style={{ fontWeight: "600" }}>
                  Tambah
                </Texts.Medium>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    )
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
    // justifyContent: 'space-between'
  },
  textList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  buttonYellow: {
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: "#FDD759",
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: "center",
  },
  buttonExit: {
    marginTop: 10,
    marginBottom: 30,
    borderColor: "#D8B648",
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: "center",
  },
})