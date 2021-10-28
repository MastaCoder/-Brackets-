import styles from "./Button.module.css"

export default function Button (props) {
    return (
        <button className={styles.btn} style={{...props.cs}}>
            {props.children}
        </button>
    )
}