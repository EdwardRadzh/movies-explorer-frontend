import './Logo.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Logo() {
    return (
        <Link to='/' className="logo">
            <img className="logo_img" src={logo} alt="логотип"/>
        </Link>
    );
};

export default Logo;