import React, { useEffect, useState } from 'react';
import css from '../TypesDropdown/TypesDropdown.module.css';
import { ComputerServices } from '../../services/computer.services';

const ComputersDropdown = ({externalCompSetter}) => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [computers, setComputers] = useState(null);
  const [currentComputer, setCurrentComputer] = useState(null);

  const setNewComputer = (comp) => {
    setCurrentComputer(comp);
    externalCompSetter(comp);
    setIsDropOpen(false);
  };

  useEffect(() => {
    ComputerServices.getAll().then(val => setComputers(val)).catch(e => console.log(e));
  }, []);


  return (
    <div className={css.dropdown__wrapper}>
      <div onClick={() => setIsDropOpen(!isDropOpen)} className={css.dropdown__button}>
        <div>{currentComputer?.name || 'Select computer'}</div>
        {isDropOpen && <div className={css.dropdown__menu}>
          {computers?.map(element =>
            <div className={css.dropdown__element} key={element?.id} onClick={() => setNewComputer(element)}>
              {element?.name}
            </div>
          )}
        </div>}
      </div>
    </div>
  );
};

export { ComputersDropdown };
