//Importar las librerias necesarias
//import { Col } from "native-base";
import React, { useEffect, useState } from "react";
import {FlatList,StyleSheet, Text, View,Dimensions,Image} from "react-native";
import {Input, Spinner,Card,Button} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import backend from "../api/backend";
import * as Font from "expo-font";
const { width, height } = Dimensions.get("window");
//variable que contiene la pantalla(renderizar)
const PokeListScreen = ({navigation}) => {
    const [pokemon, setPokemon] = useState(null);
    const [fonts, setfonts] = useState(false);
    const [error, setError] = useState(false);
    const [Search, setSearch] = useState("");
  //metodo de consultas para traer la lista de pokemos
    const getPokemon = async () => {
      try 
      {
         const rempose = await backend.get(`pokemon?limit=807`);
        setPokemon(rempose.data);
      } catch (error) {
        setError(true);
      }
    }
  //metodo para exportar las fuentes
    const loadFonts = async() => {
      Font.loadAsync({
       'Pokemon-Hollow': require(`../../assets/fonts/Pokemon-Hollow.ttf`,),
       'Pokemon-Solid': require(`../../assets/fonts/Pokemon-Solid.ttf`),
     });
     setfonts(true);
   }
  
    useEffect(() => {
      // Efecto secundario realizar la petición a la API
      getPokemon();
      loadFonts();
    }, []);
    //Spinner para el inicio de pantalla
    if (!pokemon) {
      return (
        <View style={styles.SpinnerInicio}>
          <Spinner color="#e8cc57" />
        </View>
      )
    }
    //muestra los componentes que se muestran en la pantalla
    return(
     <View style={styles.container}>
       <View style={styles.encabezado}>
         <Text style={styles.Titulo}>PokeXplorer</Text>
       </View>
       <View style={styles.cuerpo}>
       <FlatList
            data={pokemon.results}
            keyExtractor={(item) => item.name}
            ListEmptyComponent={<View style={{marginTop:150}}><Image
            source={require("../../assets/pikachu_what.png")}
            style={styles.pokemonNotFound}
            />
            <Text style={styles.texto}>pokemon not found!</Text></View>}
            renderItem={({ item }) => {
              return (
                <View> 
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Data Pokemon", { name: item.name })
                    }
                  >
                    <Card style={styles.cardPokemom}>
                      <Text style={styles.texto}>{item.name}</Text>
                    </Card>
                  </TouchableOpacity>
                </View>
              )
            }}
          /> 

       </View>
       <View style={styles.pie}>
       <Input placeholder="Search" style={styles.Buqueda} value={Search} onChangeText={setSearch}/>
       <Button style={styles.Boton} onPress={() => {navigation.navigate("Results Search", {Search})}}>
              <Text style={styles.ajusteTexto}>Search</Text>
            </Button>
       </View>
     </View>  
    )};

//apartado de estilo de la pantalla
const styles = StyleSheet.create({
    SpinnerInicio:{
      flex: 1, 
      justifyContent: "center"
    },
    container: {
      flex: 1,
      flexDirection:"column",
    },
    ajusteTexto:{
      color:"#ffffff",
      textAlign:"center"
    },
    encabezado:{
      flex:1,
      backgroundColor:"#000000",
      justifyContent:"center",
    },
    cuerpo:{
      flex:4,
      backgroundColor:"#fc0000",
      justifyContent:"center",
    },
    texto:{
      color:"#ffffff",
      textAlign:"center", 
      fontSize:23
    },
    pie:{
      flex:1,
      flexDirection:"row",
      justifyContent:"center",
      backgroundColor:"#000000"
    },
    Titulo:{
      fontFamily:'Pokemon-Solid',
      color: "#e8cc57",
      marginTop: 20,
      marginLeft:10,
      fontSize:45,
    },
    Buqueda:{
      backgroundColor:"#ffffff",
      marginTop:30,
      marginStart:12,
      marginLeft:10,
      marginRight:10,
      height:50,
    },
    Boton:{
      backgroundColor:"#fc0000",
      marginTop:30,
      height:50,
      width:70,
      marginRight:30,
      justifyContent:"center",
      },
      cardPokemom:{
        backgroundColor:"#fc0000",
        height:50,
        marginRight:30,
        marginLeft:30,
        justifyContent:"center"
      },

      pokemonNotFound: {
        marginLeft:70,
        width:width * 0.50,
        height: height * 0.20,
        resizeMode: "contain", 
      },
});

export default PokeListScreen;