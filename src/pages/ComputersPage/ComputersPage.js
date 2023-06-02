import React, { useEffect, useState } from 'react';

import { ComputerServices } from '../../services/computer.services';

import css from '../common/styles/CommonStyles.module.css';
import { useNavigate } from 'react-router-dom';
import { AddButton, ComputerAddModal } from '../../components';
import { ComponentServices } from '../../services/component.services';

const ComputersPage = () => {
  const [computers, setComputers] = useState([]);
  const [computerComponents, setComputerComponents] = useState(null);
  const [computerForComponents, setComputerForComponents] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    if (computerForComponents) {
      try {
        ComponentServices.getByComputer(computerForComponents?.id)
          .then(value => setComputerComponents(value))
          .catch(() => setComputerComponents(null));
      } catch (e) {
        console.log(e);
      }
    }

  }, [computerForComponents]);

  useEffect(() => {
    if (!openAddModal) {
      try {
        ComputerServices.getAll().then(value => setComputers(value)).catch(e => console.log(e));
      } catch (e) {
        console.log(e);
      }
    }

  }, [openAddModal]);

  return (
    <div className={css.computers__page}>
      {openAddModal && <ComputerAddModal setModalOpen={setOpenAddModal}/>}
      <nav className={css.computers__nav}>
        <div/>
        <AddButton onClick={() => setOpenAddModal(true)} endTitle="computer"/>
      </nav>
      {computerForComponents &&
        <div className={css.components__modal_wrapper} onClick={() => setComputerForComponents(null)}>
          <div className={css.components__modal} onClick={(e) => e.stopPropagation()}>
            <h4 className={css.components__modal_title}>
              {computerForComponents.name} components
            </h4>
            <div className={css.components__list}>
              <div className={css.comp__list_header}>
                <div className={css.component__type}>Type</div>
                <div className={css.component__brand}>Brand</div>
                <div className={css.component__number}>Inventory number</div>
              </div>
              {computerComponents?.length
                ? computerComponents?.map(el =>
                  <div key={el.id} className={css.comp__block}>
                    <div className={css.component__type}>{el.type}</div>
                    <div className={css.component__brand}>{el.brand}</div>
                    <div className={css.component__number}>{el?.inventoryNumber}</div>
                  </div>)
                :
                <div>No components</div>
              }
            </div>
          </div>
        </div>
      }
      <div className={css.computers__list}>
        <div className={css.comp__list_header}>
          <div className={css.name__block}>
            Name
          </div>
          <div className={css.name__block}>
            Inventory number
          </div>
          <div className={css.desc__block}>
            Description
          </div>
          <div className={css.comp__btn__block}>
            Components
          </div>
        </div>
        {computers?.length ? computers.map(comp =>
          <div onClick={() => navigate(`/computer/${comp.id}`)} className={css.comp__block} key={comp?.id}>
            <div className={css.name__block}>
              {comp?.name}
            </div>
            <div className={css.name__block}>
              {comp?.inventoryNumber}
            </div>
            <div className={css.desc__block}>
              {comp?.description}
            </div>
            <div className={css.comp__btn__block}>
              <div onClick={(e) => {
                e.stopPropagation();
                setComputerForComponents(comp);
              }} className={css.show__components_btn}>
                SHOW
              </div>
            </div>
          </div>
        ) : <div>No computers</div>
        }
      </div>
    </div>
  );
};

export { ComputersPage };
