import { MotiTransitionProp, MotiView } from "moti";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Easing } from "react-native-reanimated";

type SwitchProps = {
  size: number;
  onPress: () => void;
  isActive: boolean;
};

const colors = {
  active: "#2C2C2C",
  inactive: "#DCDCDC",
};

const transition: MotiTransitionProp = {
  type: "timing",
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};

const Switch = ({ isActive, onPress, size }: SwitchProps) => {
  const trackWidth = useMemo(() => {
    return size * 1.5;
  }, [size]);

  const trackHeight = useMemo(() => {
    return size * 0.5;
  }, [size]);

  const knobSize = useMemo(() => {
    return size * 0.5;
  }, [size]);

  return (
    <Pressable onPress={onPress}>
      <View style={styles.center}>
        <MotiView
          transition={transition}
          animate={{
            backgroundColor: isActive ? colors.active : colors.inactive,
          }}
          style={{
            position: "absolute",
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
            backgroundColor: colors.active,
          }}
        />

        <MotiView
          transition={transition}
          animate={{
            translateX: isActive ? trackWidth / 4 : -trackWidth / 4,
          }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MotiView
            transition={transition}
            animate={{
              width: isActive ? 0 : knobSize,
              borderColor: isActive ? colors.active : colors.inactive,
            }}
            style={{
              width: knobSize,
              height: knobSize,
              borderRadius: knobSize / 2,
              borderWidth: size * 0.1,
              borderColor: colors.active,
            }}
          />
        </MotiView>
      </View>
    </Pressable>
  );
};

export default function SwitchScreen() {
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.container}>
      <Switch
        isActive={isActive}
        onPress={() => {
          setIsActive((prev) => !prev);
        }}
        size={80}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
