import { View, StyleSheet, Platform } from "react-native";
import { useState } from "react";
import ThemedScrollView from "@/components/ThemedScrollView";

import { TextInput, Text } from "react-native-paper";

export default function HomeScreen() {
    const [text, setText] = useState<string>("");
    const [tax, setTax] = useState<number>(0.0438);
    const [spreed, setSpreed] = useState<number>(0.04);
    const [total, setTotal] = useState<number>(0);

    return (
        <ThemedScrollView>
            <View style={styles.titleContainer}>
                <Text variant="titleLarge">Simulador de Compra em Dólar!</Text>
            </View>
            <View style={styles.stepContainer}>
                <TextInput
                    label="Valor da Compra"
                    value={text}
                    onChangeText={(text) => setText(text)}
                />
            </View>
            <View style={styles.stepContainer}>
                <Text>Spreed: {spreed * 100}%</Text>
                <Text>Taxa de IOF: {tax * 100}%</Text>
            </View>
            <View style={styles.stepContainer}>
                <Text>Total: {total}</Text>
            </View>
        </ThemedScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
