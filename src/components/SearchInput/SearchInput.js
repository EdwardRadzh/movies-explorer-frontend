import React from "react";
import './SearchInput.css';

function SearchInput({ placeholder, onChange, inputValue }) {
    return (
        <>
            <input 
                className="search-form__input" 
                type="text" 
                placeholder={placeholder} 
                name="query" 
                value={inputValue}
                onChange={onChange}
                required
            />
        </>
    )
}

export default SearchInput;