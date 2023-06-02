import React from 'react';

import css from './AddButton.module.css'

import add from '../assets/add.svg'

const AddButton = ({onClick, endTitle}) => {
  return (
    <div className={css.add__button} onClick={onClick}>
      <img src={add} alt="add"/> Add {endTitle}
    </div>
  );
};

export { AddButton };
