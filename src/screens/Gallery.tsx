import { useState, useRef } from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { usePhotos } from "../lib/api";

const { width, height } = Dimensions.get("screen");
const IMAGE_SIZE = 80;
const SPACING = 10;

export default function Gallery() {
  const imageRef = useRef<FlatList>(null);
  const thumbRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: images, isLoading, error } = usePhotos();

  const scrollToActiveIndex = (index: number) => {
    setActiveIndex(index);
    imageRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={imageRef}
        data={images}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={(ev) => {
          const offset = ev.nativeEvent.contentOffset.x;
          scrollToActiveIndex(Math.round(offset / width));
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.src.portrait }}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />

      <FlatList
        ref={thumbRef}
        data={images}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ position: "absolute", bottom: IMAGE_SIZE }}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                scrollToActiveIndex(index);
              }}
            >
              <Image
                source={{ uri: item.src.portrait }}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? "#fff" : "transparent",
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
