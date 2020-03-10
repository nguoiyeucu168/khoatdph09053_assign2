// JavaScript source code
import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
export default function Row({ item }) {
    return ((show == true) ? (
        <View >
            <View >
                <Image source={{ uri: item.avatar }} />
            </View>
            <View>
                <Text >{item.name}</Text>
                <Text>{item.category}</Text>
                <Text >{item.total_chapter}</Text>
                <Text >{item.is_full}</Text>
            </View>
        </View>
    )
        : null
    );
}
