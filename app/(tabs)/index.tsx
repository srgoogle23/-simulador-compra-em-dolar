import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { TextInput, Text } from "react-native-paper";
import { MaskedTextInput } from "react-native-mask-text";
import axios from "axios";

export default function HomeScreen() {
    // configura o textValue como tipado como string
    const [textValue, setTextValue] = useState<string>("");
    const [value, setValue] = useState<number>(0);
    const [tax, setTax] = useState<number>(0.0438);
    const [spread, setSpread] = useState<number>(0.04);
    const [total, setTotal] = useState<number>(0);
    const [dollarValue, setDollarValue] = useState<number>(0);

    useEffect(() => {
        getDollarValue();
    }, []);

    useEffect(() => {
        const cleanNumber = parseFloat(textValue.replace(/[^0-9.]/g, "")) || 0;
        setValue(cleanNumber);
    }, [textValue]);

    useEffect(() => {
        if (value >= 0) {
            const directConversion = value * dollarValue;
            const calculatedTotal =
                directConversion +
                directConversion * tax +
                directConversion * spread;
            setTotal(parseFloat(calculatedTotal.toFixed(2)));
        }
    }, [value]);

    const getDollarValue = async () => {
        try {
            const response = await axios.get(
                "https://economia.awesomeapi.com.br/all/USD-BRL"
            );
            const dollarValue = response.data.USD.bid;
            setDollarValue(parseFloat(dollarValue));
        } catch (error) {
            console.error("Erro ao buscar cotação do dólar", error);
        }
    };

    // Função para formatar valores como moeda brasileira
    const formatCurrency = (number: number) => {
        return number.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Simule sua compra em Dólar</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    label="Valor da Compra"
                    render={(props) => (
                        <MaskedTextInput
                            {...props}
                            mask="R$ 9999999,99"
                            value={textValue}
                            onChangeText={(masked) => setTextValue(masked)}
                            keyboardType="numeric"
                        />
                    )}
                />
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.detailText}>
                    Spread: {formatCurrency(spread * 100)}%
                </Text>
                <Text style={styles.detailText}>
                    Taxa de IOF: {formatCurrency(tax * 100)}%
                </Text>
                <Text style={styles.totalText}>
                    Total: R$ {formatCurrency(total)}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#fff",
        fontSize: 18,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
    },
    detailContainer: {
        marginTop: 20,
    },
    detailText: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 5,
    },
    totalText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
    },
});
