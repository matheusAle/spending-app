import { Dimensions } from "react-native";
import Svg, {Path, Defs, Mask, Rect } from "react-native-svg";
import { Container } from "./styles";
import React from "react";
const Paths = require('paths-js/path');

export default (props) => {
    const height = 68;
    const din = Dimensions.get('window');

    const center = (din.width / 2);

    // https://jxnblk.github.io/paths/?d=M0%2032%20L16%2032%20C24%2032%2024%2048%2032%2048%20C40%2048%2040%2032%2048%2032%20L64%2032%20L64%2056%20L0%2056
    let path = Paths()
        .moveto(0, 0)
        .lineto(center - 60, 0)

        .curveto( center - 30, 0, center - 30, 30, center, 30)
        .curveto( center + 30, 30, center + 30, 0, center + 60, 0)

        .lineto(din.width, 0)
        .lineto(din.width, height)
        .lineto(0, height)
        .closepath();

    return (
        <Container>
            <Svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
                width={`${din.width + 2}px`}
                height={`${height + 4}px`}
                viewBox={`0 0 ${din.width + 2} ${height + 2}`}>

            <Path d={path.print()} fill={'white'} stroke="rgba(0, 0, 0, 0.2)" stroke-size={"1"}/>

            </Svg>
            { props.children }
        </Container>
    )
}
