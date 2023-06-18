import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import { useRef, useState, useEffect } from "react";
import { MotiView } from "moti";

const { width } = Dimensions.get("screen");

const _colors = {
  active: `#FCD259ff`,
  inactive: `#FCD25900`,
};
const _spacing = 10;

const data = [...Array(20).keys()].map(() => ({
  key: faker.string.uuid(),
  job: faker.animal.crocodilia(),
}));

export default function Scroll() {
  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const [viewPosition, setViewPosition] = useState(0);

  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: viewPosition,
      viewOffset: viewPosition === 0.5 || viewPosition === 1 ? 0 : _spacing,
    });
  }, [index, viewPosition]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        ref={ref}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 700));
          wait.then(() => {
            ref.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        style={{ flexGrow: 0 }}
        data={data}
        initialScrollIndex={index}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: _spacing, gap: _spacing }}
        renderItem={({ item, index: fIndex }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setIndex(fIndex);
              }}
            >
              <MotiView
                animate={{
                  backgroundColor:
                    fIndex === index ? _colors.active : _colors.inactive,
                  opacity: fIndex === index ? 1 : 0.6,
                }}
                transition={{
                  duration: 500,
                  repeat: 1,
                }}
                style={{
                  padding: _spacing,
                  borderWidth: 2,
                  borderColor: _colors.active,
                  borderRadius: 12,
                }}
              >
                <Text style={{ color: "#36303F", fontWeight: "700" }}>
                  {item.job}
                </Text>
              </MotiView>
            </TouchableOpacity>
          );
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: _spacing * 10,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#36303F",
              fontWeight: "700",
              marginBottom: _spacing,
            }}
          >
            Scroll Position
          </Text>

          <View
            style={{
              flexDirection: "row",
              width: width / 2,
              justifyContent: "center",
              gap: _spacing,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setViewPosition(0);
              }}
            >
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: "#FCD259",
                  borderRadius: _spacing,
                }}
              >
                <Entypo name="align-left" size={24} color="#36303F" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setViewPosition(0.5);
              }}
            >
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: "#FCD259",
                  borderRadius: _spacing,
                }}
              >
                <Entypo
                  name="align-horizontal-middle"
                  size={24}
                  color="#36303F"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setViewPosition(1);
              }}
            >
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: "#FCD259",
                  borderRadius: _spacing,
                }}
              >
                <Entypo name="align-right" size={24} color="#36303F" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text
            style={{ color: "#36303F", fontWeight: "700", marginBottom: 10 }}
          >
            Navigation
          </Text>

          <View
            style={{
              flexDirection: "row",
              width: width / 2,
              justifyContent: "center",
              gap: _spacing,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (index === 0) {
                  return;
                }

                setIndex(index - 1);
              }}
            >
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: "#FCD259",
                  borderRadius: _spacing,
                }}
              >
                <Feather name="arrow-left" size={24} color="#36303F" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (index === data.length - 1) {
                  return;
                }

                setIndex(index + 1);
              }}
            >
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: "#FCD259",
                  borderRadius: _spacing,
                }}
              >
                <Feather name="arrow-right" size={24} color="#36303F" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
