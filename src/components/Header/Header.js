import React from 'react';

import css from './Header.module.css'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={css.header}>
      <Link className={css.header__link} to={'/'}>
        Home
      </Link>
      <Link className={css.header__link} to={'/computers'}>
        Computers
      </Link>
      <Link className={css.header__link} to={'/components'}>
        Components
      </Link>
    </div>
  );
};

export { Header };
