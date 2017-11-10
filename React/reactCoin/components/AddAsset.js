import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TextInput,
    Button,
    ListView,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Communications from 'react-native-communications';
export default class AddCoin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:0
            ,Coin:""
            ,Price:""};
        if(this.props.navigation.state.params.id !== undefined){
            var asset = this.props.navigation.state.params;
            this.state.Coin = asset.Coin;
            this.state.Price = asset.Price;
            this.state.id = asset.id;
        }
    }
    save(){
        if(this.state.id === 0){
            var asset = {
                id:0
                ,Coin:this.state.Coin
                ,Price:Number(this.state.Price)};
            global.id = global.id + 1;
            global.dataArray.push(asset);
            Communications.email("george.linut.1000@gmail.com",["george.linut.1000@gmail.com"] , null,"CoinApp mail", JSON.stringify(asset));
        }
        else{
            asset = this.state;
            for(var i =0;i<global.dataArray.length;i++){
                if(global.dataArray[i].id === asset.id){
                    global.dataArray[i] = asset;
                }
            }
        }
        this.props.navigation.navigate("Home");

    }
    render(){



        return(
            <View>
                <TextInput
                    style={{height: 40, borderColor: 'blue', borderWidth: 2}}
                    onChangeText={(Coin)=>this.setState({Coin})}
                    value={this.state.Coin}
                />
                <TextInput
                    style={{height: 40, borderColor: 'blue', borderWidth: 2}}
                    keyboardType = 'numeric'
                    onChangeText={(Price)=>this.setState({Price})}
                    value={this.state.Price.toString()}
                />
                <Button
                    title="save"
                    onPress={()=>this.save()}/>
            </View>
        );
    }
}