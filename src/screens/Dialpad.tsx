import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import randomColor from "randomcolor";

const width = Dimensions.get("window").width;

const pinLength = 4;
const pinContainerSize = width / 2;
const pinMaxSize = pinContainerSize / pinLength;
const pinSpacing = 10;
const pinSize = pinMaxSize - pinSpacing * 2;

const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.4;
const spacing = 20;

const baseColor = randomColor();

const colors = {
  primary: baseColor,
  secondary: randomColor({
    hue: baseColor,
    luminosity: "dark",
  }),
};

const dialpad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];

export default function DialpadScreen() {
  const [pin, setPin] = useState<number[]>([]);

  const onPress = (item: string | number) => {
    if (item === "del") {
      setPin((prev) => prev.slice(0, prev.length - 1));
    } else if (typeof item === "number") {
      if (pin.length === pinLength) return;
      setPin((prev) => [...prev, item]);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          gap: pinSpacing,
          marginBottom: spacing * 2,
          height: pinSize * 2,
          alignItems: "flex-end",
        }}
      >
        {[...Array(pinLength).keys()].map((item) => {
          const isSelected = !!pin[item];

          return (
            <MotiView
              key={item}
              style={{
                width: pinSize,
                borderRadius: pinSize,
                backgroundColor: colors.secondary,
              }}
              animate={{
                height: isSelected ? pinSize : 2,
                marginBottom: isSelected ? pinSize / 2 : 0,
              }}
              transition={{
                type: "timing",
                duration: 150,
              }}
            />
          );
        })}
      </View>
      <Dialpad onPress={onPress} />
      <StatusBar style="auto" />
    </View>
  );
}

function Dialpad({
  onPress,
}: {
  onPress: (item: (typeof dialpad)[number]) => void;
}) {
  return (
    <FlatList
      columnWrapperStyle={{ gap: spacing }}
      contentContainerStyle={{ gap: spacing }}
      data={dialpad}
      keyExtractor={(_, index) => index.toString()}
      numColumns={3}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPress(item)}
          style={{
            width: dialPadSize,
            height: dialPadSize,
            borderRadius: dialPadSize,
            borderWidth: typeof item !== "number" ? 0 : 1,
            borderColor: colors.secondary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item === "del" ? (
            <Ionicons
              name="backspace-outline"
              color={colors.secondary}
              size={dialPadTextSize}
            />
          ) : (
            <Text style={styles.text}>{item}</Text>
          )}
        </Pressable>
      )}
      scrollEnabled={false}
      style={styles.pad}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  pad: {
    flexGrow: 0,
  },
  text: {
    fontSize: dialPadTextSize,
    color: colors.secondary,
  },
});
