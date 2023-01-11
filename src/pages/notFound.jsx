import styles from './notFound.module.css'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <div className={styles.container}>
            <p className="text text_type_digits-large">404</p>
            <p className="text text_type_main-large">Страница не найдена</p>
            <Link to='/' className="text text_type_main-medium">На главную</Link>
        </div>
    )
}