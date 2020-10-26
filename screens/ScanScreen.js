import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class BookTransactionScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal'
    }
  }

  getCameraPermissions = async()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions : status === "granted",
      buttonState : 'clicked',
      scanned : false
    });
  }

  handleBarCodeScanned = async({type, data})=>{
    this.setState({
      scanned : true,
      scannedData : data,
      buttonState : 'normal'
    });
  }

  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if(buttonState === "clicked" && hasCameraPermissions){
      return(
        <BarCodeScanner
        onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
        style = {StyleSheet.absoluteFillObject}
        />
      );
    }

    else if(buttonState === "normal"){
      return(
        <View style = {StyleSheet.container}>
          
          <Image
            style = {styles.imageIcon}
            sourc = {{
             uri : './assests/scanner.jpg',
            }}
          />

          <Text styles = {styles.displayText}>{
            hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permission"
          }</Text>

          <TouchableOpacity
            onPress = {this.getCameraPermissions}
            style = {styles.scanButton}
            title = "Bar Code Scanner">
          </TouchableOpacity>

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  displayText : {
    fontSize : 15,
    textDecorationLine : 'underline'
  },
  scanButton : {
    backgroundColor : '#2196f3',
    padding : 10,
    margin : 10
  },
  buttonText : {
    fontSize : 20,
  },
  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 95,
  }
});
