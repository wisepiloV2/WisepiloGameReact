import { NavLink, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
    { name: 'Home', path: '/' },
];

export const Navbar = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                
                <Link to="/" className={styles.logo}>
                    Wisepilo<span className={styles.logoAccent}>Games</span>
                </Link>

                <nav>
                    <ul className={styles.navList}>
                        {NAV_ITEMS.map((item) => (
                            <li key={item.name}>
                                <NavLink 
                                    to={item.path}
                                    className={({ isActive }) => 
                                        isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;