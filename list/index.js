import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Switch } from 'react-native';
import Row from './row';
export default function List({ data }) {
    const [showList, setShowList] = useState(true);
    const renderRow = () => {
        const list = [];

        for (let i = 0; i < data.length; i++) {

            const row = (
                <Row item={data[i]} />
            );
            // Push row vua nhan duoc vao trong list
            if (showList == true && i % 2 == 0) {
                list.push(row);
            }

            if (showList == false && i % 2 != 0) {
                list.push(row);
            }
        }
        return list;
    }

    return (

        <View>
            {renderRow()}
        </View>
    );
}
}