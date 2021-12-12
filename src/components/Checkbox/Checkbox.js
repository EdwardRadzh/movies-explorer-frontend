import './Checkbox.css';

function Checkbox({ toggleCheckbox, checkboxOn }) {
  return (
    <div className="checkbox">
      <input className="checkbox__input" type="checkbox" name="checkbox" />
      <button onClick={toggleCheckbox} className="checkbox__btn">
        <span
          className={`checkbox__ball ${
            checkboxOn ? "checkbox__ball_active" : ""
          }`}
        ></span>
      </button>
      <label className="checkbox__label" htmlFor="checkbox">
        Короткометражки
      </label>
    </div>
  )
}

export default Checkbox;