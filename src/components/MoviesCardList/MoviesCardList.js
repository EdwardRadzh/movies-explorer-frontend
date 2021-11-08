import './MoviesCardList.css'
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import image1 from '../../images/pic1.png'
import image2 from '../../images/pic2.png'
import image3 from '../../images/pic3.png'
import image4 from '../../images/pic4.png'
import image5 from '../../images/pic5.png'
import image6 from '../../images/pic6.png'
import image7 from '../../images/pic7.png'
import image8 from '../../images/pic8.png'
import image9 from '../../images/pic9.png'
import image10 from '../../images/pic10.png'
import image11 from '../../images/pic11.png'
import image12 from '../../images/pic12.png'

function MoviesCardList() {
    return (
        <section className="movies-list">
             <div className='movies-list__box'>
                <MoviesCard img={image1}/>
                <MoviesCard img={image2}/>
                <MoviesCard img={image3}/>
                <MoviesCard img={image4}/>
                <MoviesCard img={image5}/>
                <MoviesCard img={image6}/>
                <MoviesCard img={image7}/>
                <MoviesCard img={image8}/>
                <MoviesCard img={image9}/>
                <MoviesCard img={image10}/>
                <MoviesCard img={image11}/>
                <MoviesCard img={image12}/>
            </div>
            
            <button
              className="movies-list__more-btn"
              type="button"
              aria-label="Показать еще"
            >
            Ещё
            </button>
        </section>
    );
};

export default MoviesCardList;
