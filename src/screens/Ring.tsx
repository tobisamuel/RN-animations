import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";

const _color = "#6E01EF";
const _size = 100;

export default function Ring() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={[styles.dot, styles.center]}>
        {[...Array(3).keys()].map((index) => (
          <MotiView
            from={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{
              duration: 2000,
              type: "timing",
              easing: Easing.out(Easing.ease),
              loop: true,
              delay: index * 400,
              repeatReverse: false,
            }}
            key={index}
            style={[StyleSheet.absoluteFillObject, styles.dot]}
          />
        ))}
        <Feather name="phone-outgoing" size={32} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: _size,
    height: _size,
    borderRadius: _size,
    backgroundColor: _color,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
