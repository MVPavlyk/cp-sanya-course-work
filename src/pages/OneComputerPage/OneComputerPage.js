import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import commonCss from '../common/styles/CommonStyles.module.css';
import { ComputerServices } from '../../services/computer.services';
import { ComponentServices } from '../../services/component.services';

const OneComputerPage = () => {
  const {id} = useParams();

  const [computer, setComputer] = useState(null);
  const [components, setComponents] = useState(null);

  const navigate = useNavigate();

  const deleteComputer = () => {
    ComputerServices.deleteComputer(id).then(() => {
      navigate('/computers');
    });
  };

  const removeComponent = (component) => {
    ComponentServices.update({
      ...component,
      computerId: 0
    }).then(() => setComponents(components.filter(el => el.id !== component?.id))).catch(e => console.log(e));
  };

  useEffect(() => {
    try {
      ComputerServices.getOne(id).then(value => setComputer(value));
      ComponentServices.getByComputer(id).then(value => setComponents(value)).catch(e => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  return (
    <div className={commonCss.one__comp_page}>
      <h2 className={commonCss.computer__title}>{computer?.name}</h2>
      <h4 className={commonCss.computer__subtitle}>Inventory number: {computer?.inventoryNumber}</h4>
      <h4 className={commonCss.computer__subtitle}>Description: {computer?.description}</h4>
      <button onClick={deleteComputer} className={commonCss.delete__button}>
        Delete computer
      </button>
      <div style={{padding: '20px 0'}} className={commonCss.computers__list}>
        <div className={commonCss.comp__list_header}>
          <div className={commonCss.component__type}>Type</div>
          <div className={commonCss.component__brand}>Brand</div>
          <div className={commonCss.component__number}>Inventory number</div>
          <div className={commonCss.component__number}>Remove</div>
        </div>
        {components?.length
          ? components?.map(el =>
            <div onClick={() => navigate(`/component/${el?.id}`)} key={el.id} className={commonCss.comp__block}>
              <div className={commonCss.component__type}>{el.type}</div>
              <div className={commonCss.component__brand}>{el.brand}</div>
              <div className={commonCss.component__number}>{el?.inventoryNumber}</div>
              <div onClick={e => {
                e.stopPropagation();
                removeComponent(el);
              }} className={commonCss.component__remove}>Yes
              </div>
            </div>)
          :
          <div>No components</div>
        }
      </div>

    </div>
  );
};

export { OneComputerPage };
