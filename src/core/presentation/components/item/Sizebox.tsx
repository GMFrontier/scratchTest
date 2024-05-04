import React from 'react';
import { View } from 'react-native';

interface Props {
    height?: number,
    width?: number
}

const Sizebox = ({ height = 0, width = 0 }: Props) => {
    return (
        <View style={{ height: height, width: width }}>
        </View>
    );
};



export default Sizebox;