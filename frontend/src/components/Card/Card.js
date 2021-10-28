import Styles from "./Card.module.css";

export default function Card(props) {
  return (
    <div className={Styles.card}>{props.children}</div>
  );
}
