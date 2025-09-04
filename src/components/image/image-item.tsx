import { buildThumbnailUrl } from "../../utils";

import type { Image } from "../../types";

import styles from "./image-item.module.css";

type Props = {
  image: Image;
};

export function ImageGalleryItem({ image }: Props) {
  const { url, width, height } = buildThumbnailUrl(image);

  return (
    <figure className={styles.figure}>
      <img
        src={url}
        alt={`Photo by ${image.author}`}
        className={styles.image}
        loading="lazy"
        width={width}
        height={height}
      />
      <figcaption className={styles.figcaption}>{image.author}</figcaption>
    </figure>
  );
}
