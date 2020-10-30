//Importar las librerias necesarias
//import { Col } from "native-base";
import React from "react";
import { ImageBackground, StyleSheet, Text, View} from "react-native";
import {Input, Button} from "native-base";
const fondo = {uri: "https://media.discordapp.net/attachments/684522611488849983/770751505724080138/fondo.png"}
//variable que contiene la pantalla(renderizar)
const PokeListScreen = () => (
    <View style={styles.container}>
      <ImageBackground source={fondo} style={styles.image}>
        <View style={styles.containerDos}>
        <View style={{left:20, top:7, width: 250, height: 30, backgroundColor:"#fc0000"}}>
          <Text style={{color:"#ffffff", textAlign:"center", fontSize:25}}>POKEXPLORER</Text>
        </View>
          <View style={styles.marco}>
            <View style={{right:230, top:-23, width: 275, height: 175, backgroundColor:"#e8cc57"}}>
              <View style={styles.dentroMarco}>
                <View style={{width: 260, height: 160, backgroundColor:"#ffffff"}}> 

                </View>
              </View>  
            </View>
          </View>
          <View style={{width:200,right:230,top:283,height:30}}>
          <Input placeholder="Search" backgroundColor="#ffffff"></Input>     
          </View> 
            <Button style={{justifyContent:"center",width:100,height:30, right:225, top:283, backgroundColor:"#fc0000" }}>
              <Text style={{color:"#ffffff"}}>Search</Text>
            </Button>
            <Button style={{justifyContent:"center",width:200,height:50, right:200, top:300, backgroundColor:"#fc0000" }}>
              <Text style={{color:"#ffffff"}}>More Info</Text>
            </Button>
          <View style={styles.marcoPequeños}>
            <View style={{left:-400 ,top:-40 ,width: 290, height: 281, backgroundColor:"#fc0000"}}>
              
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
);


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    containerDos: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    marco: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center"
    },
    dentroMarco:{
      flex: 1,
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: "center"
    },
    marcoPequeños:{
      flex: 1,
      flexDirection: "column",
      alignContent: 'flex-end',
      justifyContent:'center'
    },

    dentroMarcoPequeños: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
    },
      
});

export default PokeListScreen;