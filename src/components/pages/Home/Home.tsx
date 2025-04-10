import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Button from '../../ui/Button';

const Home = () => {
    return (
        <main className={styles.home}>
            <div className={styles.heroIcon}>🍽️</div>

            <h1>Welcome to Cafetaria</h1>

            <p className={styles.subtitle}>
                Tempat para Santri untuk Ngopi, Diskusi dan mengisi Nutrisi.
            </p>

            <div className={styles.buttons}>
                <Link to="/login">
                    <Button>Login</Button>
                </Link>
                <Link to="/create">
                    <Button color="secondary">Order Now</Button>
                </Link>
            </div>

            <footer className={styles.footer}>
                Made with ❤️ by F_dh@il · &copy; {new Date().getFullYear()}
            </footer>
        </main>
    );
};

export default Home;
