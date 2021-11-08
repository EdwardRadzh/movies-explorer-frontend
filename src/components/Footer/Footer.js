import './Footer.css';
import { Route } from 'react-router-dom';

function Footer() {
    const endpoints = ['/movies', '/saved-movies', '/'];

    return (
        <Route exact path={endpoints}>
            <footer className="footer">
                <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
                <div className="footer__box">
                    <p className="footer__year">&copy; 2021</p>
                    <ul className="footer__list">
                        <li className="footer_item">
                            <a className="footer__link page__link-outside" href="https://practicum.yandex.ru/" target='_blank' rel='noopener noreferrer'>Яндекс.Практикум</a>
                        </li>
                        <li className="footer_item">
                            <a className="footer__link page__link-outside" href="https://github.com/EdwardRadzh" target='_blank' rel='noopener noreferrer'>Github</a>
                        </li>
                        <li className="footer__item">
                            <a className="footer__link page__link-outside" href="https://www.facebook.com/edward.radjabov" target='_blank' rel='noopener noreferrer'>Facebook</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </Route>
    );
};

export default Footer;