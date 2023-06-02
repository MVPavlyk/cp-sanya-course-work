import React, { useEffect, useState } from 'react';

import commonCss from '../common/styles/Common.module.css';
import { ComputerServices } from '../../services/computer.services';
import { ComponentServices } from '../../services/component.services';

const SwitchComputerModal = ({component, setComponent, currentComputerId, setModalOpen}) => {
  const [computers, setComputers] = useState([]);


  useEffect(() => {
    ComputerServices
      .getAll()
      .then(value => setComputers(value.filter(comp => comp?.id !== currentComputerId)))
      .catch(e => console.log(e));
  }, []);

  const setNewComputer = async (comp) => {
    const computerParts = await ComponentServices.getByComputer(comp?.id);
    const existWithSuchType = computerParts?.filter(el => el?.type === component?.type)[0];
    if (existWithSuchType) {
      await ComponentServices.update({...existWithSuchType, computerId: 0});
    }
    const newComponent = await ComponentServices.update({...component, computerId: comp?.id});

    setComponent(newComponent);

    setModalOpen(false);
  };

  return (
    <div className={commonCss.common__modal_wrapper} onClick={() => setModalOpen(false)}>
      <div className={commonCss.common__modal} onClick={(e) => e.stopPropagation()}>
        <div className={commonCss.modal__title}>Select computer</div>
        {computers.map(comp =>
          <div onClick={() => setNewComputer(comp)} className={commonCss.common__btn}>
            {comp?.name}
          </div>
        )}
      </div>
    </div>
  );
};

export { SwitchComputerModal };
