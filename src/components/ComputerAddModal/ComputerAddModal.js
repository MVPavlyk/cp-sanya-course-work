import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import commonCss from '../common/styles/Common.module.css';
import { ComputerServices } from '../../services/computer.services';

const ComputerAddModal = ({setModalOpen}) => {
  const [wait, setWait] = useState(false);

  const {
    register, handleSubmit
  } = useForm();

  const createComponent = (obj) => {
    try {
      setWait(true);
      ComputerServices.create(obj).then(() => {
        setModalOpen(false);
        setWait(false);
      });
    } catch (e) {
      console.log(e);
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
          <input className={commonCss.add__input} placeholder="Name" {...register('name')} type="text"/>
          <input className={commonCss.add__input} placeholder="Description" {...register('description')} type="text"/>
          <input className={commonCss.add__input} placeholder="Inventory number" {...register('inventoryNumber')}
                 type="text"/>
          <button className={commonCss.add__button}>{wait ? 'Wait' : 'Create'}</button>
        </form>
      </div>
    </div>
  );
};

export { ComputerAddModal };
