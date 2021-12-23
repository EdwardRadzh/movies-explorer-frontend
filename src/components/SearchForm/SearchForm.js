import './SearchForm.css';
import React from 'react';
import Checkbox from '../Checkbox/Checkbox';

function SearchForm({ handleSearchSubmit, toggleCheckbox, checkboxOn }) {

    const [inputValue, setInputValue] = React.useState("");
    const [searchFormError, setSearchFormError] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!inputValue) {
            setSearchFormError("Введите название фильма");
        } else {
            handleSearchSubmit(inputValue);
            localStorage.setItem('query', JSON.stringify(inputValue))
        }
    }

    function handleChange(e) {
        setSearchFormError("");
        setInputValue(e.target.value);
    }

    return (
        <>
        <div className="search-form">
            <form className="search-form__form" onSubmit={handleSubmit}>
                <input 
                className="search-form__input" 
                type="text" 
                placeholder="Фильм" 
                name="query" 
                value={inputValue || ''}
                onChange={handleChange}
                required
                />
                <span className="search-form__error">{searchFormError}</span>
                <button 
                className="search-form__btn" 
                type="submit"
                ></button>
                <Checkbox
                toggleCheckbox={toggleCheckbox}
                checkboxOn={checkboxOn}
                />
            </form>
        </div>
        </>
    );
};

export default SearchForm;