import styles from "./spinner.module.css";

export const Spinner = () => {
  return <span data-testid="spinner" className={styles.spinner}></span>;
};
