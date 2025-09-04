import { useEffect } from "react";

import { useFetchImages } from "../../hooks/use-fetch-images";
import { useInfiniteScroll } from "../../hooks/use-infinite-scroll";
import { usePagination } from "../../context/pagination/use-pagination";

import { ImageGalleryItem } from "./image-item";
import { Loader } from "../ui/loader";

import styles from "./image-gallery.module.css";

export function ImageGallery() {
  const { page, setPage, limit } = usePagination();
  const { images, isLoading, error, fetchImages } = useFetchImages();

  const firstPageLoaded = page === 1 ? images.length > 0 : true;

  useEffect(() => {
    fetchImages(page, limit);
  }, [page, limit]);

  function handleLoadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  const { observerTarget } = useInfiniteScroll({
    onIntersect: handleLoadMore,
    disabled: isLoading || !firstPageLoaded,
  });

  return (
    <div className={styles.imageGalleryContainer}>
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.error}>Error:</p>
          <code>{error}</code>
          <button type="button" onClick={() => fetchImages(page, limit)}>
            Retry
          </button>
        </div>
      )}
      <ul className={styles.imageGallery}>
        {images.map((image) => {
          return (
            <li key={image.id}>
              <ImageGalleryItem image={image} />
            </li>
          );
        })}
      </ul>
      {isLoading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
      {firstPageLoaded && <div ref={observerTarget} aria-hidden="true" />}
      {!isLoading && images.length === 0 && <p>No images available.</p>}
    </div>
  );
}
