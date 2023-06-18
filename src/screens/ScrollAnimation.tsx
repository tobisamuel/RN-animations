import * as React from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { faker } from "@faker-js/faker";

faker.seed(10);

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.string.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement([
      "women",
      "men",
    ])}/${faker.number.int(60)}.jpg`,
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    email: faker.internet.email(),
  };
});

const BG_IMG =
  "https://www.pexels.com/photo/pink-rose-closeup-photography-1231265/";
const SPACING = 20;
const AVATAR_SIZE = 70;

export default () => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: BG_IMG }}
        style={[StyleSheet.absoluteFill]}
        blurRadius={80}
      />
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
          gap: SPACING,
        }}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                gap: SPACING / 2,
                padding: SPACING,
                borderRadius: 12,
                backgroundColor: "rgba(255,255,255,0.7)",
                shadowColor: "#000",
                borderWidth: 1,
                borderColor: "red",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 1,
                shadowRadius: 20,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                }}
              />

              <View>
                <Text style={{ fontSize: 22, fontWeight: "700" }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 12, opacity: 0.7 }}>
                  {item.jobTitle}
                </Text>
                <Text style={{ fontSize: 12, opacity: 0.8, color: "#0099cc" }}>
                  {item.email}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
