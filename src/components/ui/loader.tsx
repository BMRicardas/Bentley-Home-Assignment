import style from "./loader.module.css";

export function Loader() {
  return (
    <span
      className={style.loader}
      role="status"
      aria-live="polite"
      aria-label="Loading..."
    />
  );
}
