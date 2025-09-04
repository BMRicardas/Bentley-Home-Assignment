import { IMAGE_HEIGHT } from "../constants";

import type { Image } from "../types";

export function buildThumbnailUrl(image: Image) {
  const aspectRatio = image.width / image.height;
  const roundedImageWidth = Math.round(IMAGE_HEIGHT * aspectRatio);

  return {
    url: `https://picsum.photos/id/${image.id}/${roundedImageWidth}/${IMAGE_HEIGHT}.webp`,
    width: roundedImageWidth,
    height: IMAGE_HEIGHT,
  };
}
