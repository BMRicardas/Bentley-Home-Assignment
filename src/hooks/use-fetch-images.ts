import { useEffect, useRef, useState } from "react";

import type { Image } from "../types";
import { BASE_URL } from "../constants";

type Mode = "pagination" | "infinite";

interface Props {
  mode?: Mode;
}

export function useFetchImages({ mode = "infinite" }: Props = {}) {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const abortControllerRef = useRef<AbortController | null>(null);

  const isInfinite = mode === "infinite";

  async function fetchImages(page?: number, limit?: number) {
    if (isInfinite && isLoading) return;

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    const url = new URL(`${BASE_URL}/v2/list`);
    if (page) url.searchParams.append("page", page.toString());
    if (limit) url.searchParams.append("limit", limit.toString());

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(url, {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const images = await response.json();

      if (isInfinite) {
        if (images.length === 0) return;

        setImages((prevImages) => [...prevImages, ...images]);
      } else {
        setImages(images);
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
        return;
      }
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isInfinite) {
      fetchImages();
    }

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return {
    images,
    isLoading,
    error,
    fetchImages,
  };
}
