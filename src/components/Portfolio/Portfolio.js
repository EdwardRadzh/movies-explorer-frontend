import './Portfolio.css';
import arrow from '../../images/arrow_link.svg';

function Portfolio() {
    return (
        <section className="portfolio content__section" id="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <p className="portfolio__name">Статичный сайт</p>
                    <a className="portfolio__link page__link" href="https://github.com/EdwardRadzh/how-to-learn" target='_blank' rel='noopener noreferrer'><img className='portfolio__pic' src={arrow} alt='Ссылка на проект со статичным сайтом'/></a>
                </li>
                <li className="portfolio__item">
                <p className="portfolio__name">Адаптивный сайт</p>
                    <a className="portfolio__link page__link" href="https://github.com/EdwardRadzh/russian-travel" target='_blank' rel='noopener noreferrer'><img className='portfolio__pic' src={arrow} alt='Ссылка на проект со адаптивным сайтом'/></a>
                </li>
                <li className="portfolio__item">
                <p className="portfolio__name">Одностраничное приложение</p>
                    <a className="portfolio__link page__link" href="https://github.com/EdwardRadzh/react-mesto-api-full" target='_blank' rel='noopener noreferrer'><img className='portfolio__pic' src={arrow} alt='Ссылка на проект с одностраничным приложением'/></a>
                </li>
            </ul>
        </section>
    );
};

export default Portfolio;