import React, { useState } from 'react';

import css from './TypesDropdown.module.css';

import { Types } from '../../config/constants';

const TypesDropdown = ({externalSetType}) => {
  const [type, setType] = useState(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const setNewType = (t) => {
    setType(t);
    externalSetType(t);
    setIsDropdownOpen(false);
  };

  return (
    <div style={{zIndex: 100}} className={css.dropdown__wrapper}>
      <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={css.dropdown__button}>
        <div>{type || 'Select type'}</div>
        {isDropdownOpen && <div className={css.dropdown__menu}>
          {Types.map(element =>
            <div className={css.dropdown__element} key={element} onClick={() => setNewType(element)}>
              {element}
            </div>
          )}
        </div>}
      </div>
    </div>
  );
};

export { TypesDropdown };
