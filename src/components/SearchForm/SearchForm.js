import './SearchForm.css';
import React from 'react';
import SearchInput from '../SearchInput/SearchInput';
import Checkbox from '../Checkbox/Checkbox';

function SearchForm({searchMovie, inputError, handleToggleCheckbox}) {
    const [inputValue, setInputValue] = React.useState('');

    const handleChangeInput = (evt) => {
        setInputValue(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        searchMovie(inputValue);
        setInputValue('');
    }
    
    // function handleSubmit(e) {
    //     e.preventDefault();
    //     onSearchClick(values.query);
    // }

    // React.useEffect(() => {
    //     if (!savedMoviesPage) {
    //         const input = localStorage.getItem('searchQuery');
    //         if(input) {
    //             setIsValid(true)
    //             setValues({ query: input })
    //         }
    //     }
    // }, [savedMoviesPage, setIsValid, setValues])


    return (
        <div className="search-form">
            <form className="search-form__form">
                <SearchInput 
                onChange={handleChangeInput}
                inputError={inputError}
                inputValue={inputValue}
                placeholder={inputError ? 'Во время запроса произошла ошибка. ' +
                    'Возможно, проблема с соединением или сервер недоступен. Подождите ' +
                    'немного и попробуйте ещё раз' : 'Фильмы'}
                />
                <button 
                className="search-form__btn" 
                type="submit"
                onClick={handleSubmit}
                ></button>
                <Checkbox
                handleToggleCheckBox={handleToggleCheckbox}
                />
                {/* <div className="search-form__filter-box"> */}
                    {/* <label className='search-form__checkbox'>
                        <input className='search-form__input-invisible' type='checkbox' checked={shortFilms === 'off' ? true : false} onChange={onCheckBox}/>
                        <span className='search-form__input-visible'></span>

                        <span className='search-form__label'>Короткометражки</span>
                    </label> */}
                    {/* <label className={`search-form__filter
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
                </div> */}
            </form>
        </div>
    );
};

export default SearchForm;

// import './SearchForm.css';
// import React from 'react';
// import { useFormWithValidation } from '../../hooks/UseFormValidation';
// import Checkbox from '../Checkbox/Checkbox';

// function SearchForm(props) {
//     const {values, errors, isValid, setValues, setIsValid} = useFormWithValidation();

//     const [searchInputValue, setSearchInputValue] = React.useState("");
//     const [isSearchFormValid, setIsSearchFormValid] = React.useState(true);

//     function onSubmit(e) {
//         e.preventDefault();
//         if (searchInputValue) {
//           return props.handleSearchMovies(searchInputValue.toLowerCase());
//         } else {
//           return setIsSearchFormValid(false)
//         } 
//       }

//       function handleChange(e) {
//         setSearchInputValue(e.target.value);
//         setIsSearchFormValid(e.target.checkValidity());
//       }

//       function onSubmitSavedMovies(e) {
//         e.preventDefault();
//         props.handleSearchSavedMovies(searchInputValue);
//       }
    
//     // function handleSubmit(e) {
//     //     e.preventDefault();
//     //     onSearchClick(values.query);
//     // }

//     // React.useEffect(() => {
//     //     if (!savedMoviesPage) {
//     //         const input = localStorage.getItem('searchQuery');
//     //         if(input) {
//     //             setIsValid(true)
//     //             setValues({ query: input })
//     //         }
//     //     }
//     // }, [savedMoviesPage, setIsValid, setValues])


//     return (
//         <div className="search-form">
//             <form className="search-form__form" onSubmit={!props.isSavedMovies ? onSubmit : onSubmitSavedMovies}>
//                 <input 
//                 className="search-form__input" 
//                 type="text" 
//                 placeholder="Фильм" 
//                 name="query" 
//                 value={values.query || ''}
//                 onChange={handleChange}
//                 required
//                 />
//                 <button 
//                 className="search-form__btn" 
//                 type="submit"
//                 // disabled={!isValid}
//                 onClick={onSubmit}
//                 ></button>
//                 <Checkbox
//                 isShortMovies={props.isShortMovies}
//                 handleShortMovies={props.handleShortMovies}
//                 />
//                 {/* <div className="search-form__filter-box"> */}
//                     {/* <label className='search-form__checkbox'>
//                         <input className='search-form__input-invisible' type='checkbox' checked={shortFilms === 'off' ? true : false} onChange={onCheckBox}/>
//                         <span className='search-form__input-visible'></span>

//                         <span className='search-form__label'>Короткометражки</span>
//                     </label> */}
//                     {/* <label className={`search-form__filter
//                          ${shortFilms === 'on' ? 'search-form__filter_active' : null}`
//                         }>
//                         <input className='search-form__radio search-form__radio_off'
//                         type='radio'
//                         name='shortFilms'
//                         value='off'
//                         checked={shortFilms === 'off' ? true : false}
//                         onChange={onCheckBox}
//                         />
//                         <input className='search-form__radio search-form__radio_on'
//                         type='radio'
//                         name='shortFilms'
//                         value='on'
//                         checked={shortFilms === 'on' ? true : false}
//                         onChange={onCheckBox}
//                         />
//                         <span className='search-form__switch'></span>
//                     </label>
//                     <span className='search-form__label'>Короткометражки</span>
//                 </div> */}
//             </form>
//         </div>
//     );
// };

// export default SearchForm;