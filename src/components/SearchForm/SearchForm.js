import './SearchForm.css';
import React from 'react';
import { useFormWithValidation } from '../../hooks/UseFormValidation';

function SearchForm({ onSearchClick, onCheckBox, shortFilms, savedMoviesPage}) {
    const {values, errors, isValid, setValues, handleChange, setIsValid} = useFormWithValidation();

    function handleSubmit(e) {
        e.preventDefault();
        onSearchClick(values.query);
    }

    React.useEffect(() => {
        if (!savedMoviesPage) {
            const input = localStorage.getItem('searchQuery');
            if(input) {
                setIsValid(true)
                setValues({ query: input })
            }
        }
    }, [savedMoviesPage, setIsValid, setValues])


    return (
        <div className="search-form">
            <form className="search-form__form" onSubmit={handleSubmit}>
                <input 
                className="search-form__input" 
                type="text" 
                placeholder="Фильм" 
                name="query" 
                value={values.query || ''}
                onChange={handleChange}
                required
                />
                <button 
                className="search-form__btn" 
                type="submit"
                disabled={!isValid}
                ></button>
                <div className="search-form__filter-box">
                    {/* <label className='search-form__checkbox'>
                        <input className='search-form__input-invisible' type='checkbox' checked={shortFilms === 'off' ? true : false} onChange={onCheckBox}/>
                        <span className='search-form__input-visible'></span>

                        <span className='search-form__label'>Короткометражки</span>
                    </label> */}
                    <label className={`search-form__filter
                         ${shortFilms === 'on' ? 'search-form__filter_active' : null}`
                        }>
                        <input className='search-form__radio search-form__radio_off'
                        type='radio'
                        name='shortFilms'
                        value='off'
                        checked={shortFilms === 'off' ? true : false}
                        onChange={onCheckBox}
                        />
                        <input className='search-form__radio search-form__radio_on'
                        type='radio'
                        name='shortFilms'
                        value='on'
                        checked={shortFilms === 'on' ? true : false}
                        onChange={onCheckBox}
                        />
                        <span className='search-form__switch'></span>
                    </label>
                    <span className='search-form__label'>Короткометражки</span>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;