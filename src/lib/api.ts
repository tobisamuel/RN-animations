import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { API_KEY } from "../config";

export type Photo = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
};

export type PexelRes = {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
  next_page: string;
};

const API_URL =
  "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20";

export async function fetchPhotos() {
  const response = await axios.get<PexelRes>(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  });

  return response.data.photos;
}

export function usePhotos() {
  return useQuery({ queryKey: ["photos"], queryFn: fetchPhotos });
}
