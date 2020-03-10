import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    ScrollView,
    TextInput,
    View,
} from 'react-native';

class AwesomeProject extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        }
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <TextInput
                     
                        placeholder="Enter Name"
                        returnKeyLabel={"next"}
                        onChangeText={(text) => this.setState({ text })}
                    />

                    <Button >
                        Submit
        </Button>

                </View>
            </ScrollView>
        );
    }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);