import './PageNotFound.css';
import { Link, useHistory } from "react-router-dom";

function PageNotFound() {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  };

  return (
    <section className='notfound'>
        <div className='notfound__description'>
          <h2 className='notfound__title'>404</h2>
          <p className='notfound__subtitle'>Страница не найдена</p>
        </div>
        <Link onClick={handleClick} className='notfound__link page__link'>Назад</Link>
    </section>
  );
};


export default PageNotFound;