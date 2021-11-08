import './AboutMe.css';
import photo from '../../images/Photo_student.jpg';

function AboutMe() {
    return (
        <section className="studet content__section" id="student">
            <h2 className="content__title">Студент</h2>
            <article className="about-me">
                <div className="about-me__text-box">
                    <div className="about-me__main-info">
                        <h3 className="about-me__title">Эдуард</h3>
                        <p className="about-me__subtitle">Фронтенд-разработчик, 29 лет</p>
                        <p className="about-me__text"></p>
                    </div>
                    <ul className="about-me__contacts">
                        <li className="about-me__contact">
                            <a className="about-me__link page__link-outside" href="https://www.facebook.com/edward.radjabov" target="_blank" rel='noopener noreferrer'>Facebook</a>
                        </li>
                        <li className="about-me__contact">
                            <a className="about-me__link page__link-outside" href="https://github.com/EdwardRadzh" target="_blank" rel='noopener noreferrer'>Git</a>
                        </li>
                    </ul>
                </div>
                <div className="about-me__photo-box">
                    <img className='about-me__photo' src={photo} alt='Фото студента' />
                </div>

            </article>
        </section>
    );
};

export default AboutMe;