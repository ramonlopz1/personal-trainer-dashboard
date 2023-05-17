import styles from './Boxed.module.css'

interface BoxedProps {
    children: JSX.Element
}

export default function Boxed(props: BoxedProps) {
    return (
        <div className={styles.boxed}>
            {props.children}
        </div>
    )
}