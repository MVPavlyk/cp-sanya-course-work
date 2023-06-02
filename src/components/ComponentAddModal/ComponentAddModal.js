import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import commonCss from '../common/styles/Common.module.css';
import { ComponentServices } from '../../services/component.services';
import { TypesDropdown } from '../TypesDropdown/TypesDropdown';
import { ComputersDropdown } from '../ComputersDropdown/ComputersDropdown';

const ComponentAddModal = ({computerId, setModalOpen}) => {
  const [type, setType] = useState(null);
  const [computer, setComputer] = useState(null);
  const [wait, setWait] = useState(false);

  const {
    register, handleSubmit
  } = useForm();

  const createComponent = async (obj) => {
    const newComputerId = computerId || computer?.id || 0;

    if (type && !wait) {
      try {
        setWait(true);
        ComponentServices.create({...obj, computerId: newComputerId, type}).then(() => {
          setModalOpen(false);
          setWait(false);
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className={commonCss.common__modal_wrapper} onClick={() => setModalOpen(false)}>
      <div
        className={commonCss.common__modal}
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className={commonCss.modal__title}>Add component</h4>
        <form className={commonCss.add__form} onSubmit={handleSubmit(createComponent)}>
          <TypesDropdown externalSetType={setType}/>
          {/*<input className={commonCss.add__input} placeholder="Type" {...register('type')} type="text"/>*/}
          <input className={commonCss.add__input} placeholder="Brand" {...register('brand')} type="text"/>
          <input className={commonCss.add__input} placeholder="Inventory number" {...register('inventoryNumber')}
                 type="text"/>
          <ComputersDropdown externalCompSetter={setComputer}/>
          <button className={commonCss.add__button}>{wait ? 'Wait' : 'Create'}</button>
        </form>
      </div>
    </div>
  );
};

export { ComponentAddModal };
