import { Link } from 'react-router-dom'; 
import styles from './Footer.module.css';
import { GitHubIcon, LinkedInIcon, MailIcon } from '../ui/Icons'; 

interface SocialLinkItem {
    id: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
}

interface NavLinkItem {
    name: string;
    path: string;
}

const SOCIAL_LINKS: SocialLinkItem[] = [
    { 
        id: 'mail', 
        href: 'mailto:example@code.sense', 
        icon: MailIcon, 
        label: 'Enviar un correo'
    },
    { 
        id: 'github', 
        href: 'https://github.com', 
        icon: GitHubIcon, 
        label: 'Visitar perfil de GitHub' 
    },
    { 
        id: 'linkedin', 
        href: 'https://linkedin.com', 
        icon: LinkedInIcon, 
        label: 'Visitar perfil de LinkedIn' 
    },
];

const NAV_LINKS: NavLinkItem[] = [
    { name: 'Home', path: '/' },
];

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.container}>
            
            <nav aria-label="Footer Navigation"> 
                <h3 className={styles.title}>Navegación</h3>
                <ul className={`${styles.links} ${styles.linkTextContainer}`}>
                    {NAV_LINKS.map((link) => (
                        <li key={link.name} className={styles.linkText}>
                            <Link to={link.path}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <nav aria-label="Social Media Links">
                <h3 className={styles.title}>Redes</h3>
                <ul className={`${styles.links} ${styles.linkIconContainer}`}>
                    {SOCIAL_LINKS.map(({ id, href, icon: Icon, label }) => {
                        const isExternal = href.startsWith('http');
                        return (
                            <li key={id}>
                                <a 
                                    href={href} 
                                    target={isExternal ? "_blank" : undefined} 
                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                    aria-label={label}
                                    className={styles.socialLinkAnchor} 
                                >
                                    <Icon className={styles.socialIcon} />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            
            <p className={styles.copyRight}>
                &copy; {currentYear} WisepiloGames. Todos los derechos reservados.
            </p>
        </footer>
    );
}

export default Footer;