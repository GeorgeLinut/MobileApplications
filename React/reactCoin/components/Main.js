import React from 'react';
import { NavigationActaions } from 'react-navigation';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TextInput,
    Button,
    ListView,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

export default class Main extends React.Component{
    constructor(props) {
        super(props);

        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.Id != r2.Id });
        this.state = {
            dataSource: dataSource.cloneWithRows(global.dataArray),
        }
    }
    edit(asset){
        this.props.navigation.navigate("Profile",asset);
    }
    renderRow(asset) {
        return (
            <TouchableHighlight onPress={()=>this.edit(asset)}>
                <View>
                    <Text style={styles.item}>{asset.Coin}</Text>
                    <Text style={styles.item}>{asset.Price}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    add(){
        this.props.navigation.navigate("Profile",{});
    }
    render() {
        return (
            <View>
                <Text>Assets</Text>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow = {this.renderRow.bind(this)}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
                <Button
                    title="Add"
                    onPress={()=>this.add()}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'green',
    },
})