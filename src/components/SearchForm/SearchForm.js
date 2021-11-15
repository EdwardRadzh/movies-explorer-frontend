import './SearchForm.css';
import React from 'react';

function SearchForm() {
    return (
        <div className="search-form">
            <form className="search-form__form">
                <input className="search-form__input" type="text" placeholder="Фильм" required/>
                <button className="search-form__btn" type="submit"></button>
                <div className="search-form__filter-box">
                    <label className='search-form__checkbox'>
                        <input className='search-form__input-invisible' type='checkbox'/>
                        <span className='search-form__input-visible'></span>

                        <span className='search-form__label'>Короткометражки</span>
                    </label>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;