import Styles from "./Button.module.css"

export default function Button (props) {
    return (
        <button className={`${Styles.btn} ${props.className}`}>
            {props.children}
        </button>
    )
}