import React, { useState } from 'react';
import { View, Text } from 'react-native';
import posed from 'react-native-pose';

const Box = posed.View({
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
});

export default () => {


    const [v, setV] = useState(true);

    // setInterval(() => setV(!v), 1000);

    return (
        <View>
            <Box
                style={{ width: 100, height: 100, backgroundColor: "red" }}
                pose={v ? "visible" : "hidden"}
            />
        </View>
    )
};