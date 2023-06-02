import React, { useEffect, useState } from 'react';
import css from '../common/styles/CommonStyles.module.css';
import { ComponentServices } from '../../services/component.services';
import { Link } from 'react-router-dom';
import { AddButton, ComponentAddModal } from '../../components';
import { useForm } from 'react-hook-form';
import { TypesDropdown } from '../../components/TypesDropdown/TypesDropdown';

const ComponentsPage = () => {
  const [components, setComponents] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [searchModalType, setSearchModalType] = useState(null);
  const [type, setType] = useState(null);

  const {
    register, handleSubmit, reset
  } = useForm();

  useEffect(() => {
    if (!openAddModal) {
      try {
        ComponentServices.getAll().then(value => setComponents(value)).catch(e => console.log(e));
      } catch (e) {
        console.log(e);
      }
    }
  }, [openAddModal]);

  const setNotFree = () => {
    ComponentServices.getByQuery('NonFree/true').then(value => {
      setSearchModalType(null);
      setComponents(value);
    }).catch(e => {
      setComponents(null);
      setSearchModalType(null);
    });
  };

  const setFree = () => {
    ComponentServices.getByQuery('Free/true').then(value => {
      setComponents(value);
      setSearchModalType(null);
    }).catch(e => {
      setComponents(null);
      setSearchModalType(null);
    });
  };

  const setAll = () => {
    ComponentServices.getAll().then(value => {
      setComponents(value);
      setSearchModalType(null);
    }).catch(e => {
      setComponents(null);
      setSearchModalType(null);
    });
  };

  const getByFormData = (obj) => {
    let [type, value] = Object.entries(obj)[0];
    if (type === 'Number') type = 'InventoryNumber';
    console.log(({type, value}));
    ComponentServices.getByQuery(`${type}/${value}`).then(value => {
      setComponents(value);
      setSearchModalType(null);
    }).catch(e => {
      setComponents(null);
      setSearchModalType(null);
    });
    setSearchModalType(null);
    reset();
  };

  return (
    <div className={`${css.computers__page}`}>
      {openAddModal && <ComponentAddModal setModalOpen={setOpenAddModal}/>}
      {searchModalType === 'main' &&
        <div className={css.components__modal_wrapper} onClick={() => setSearchModalType(null)}>
          <div className={css.search__modal} onClick={(e) => e.stopPropagation()}>
            Select category
            <button onClick={setAll} className={css.select__category_btn}>Select all</button>
            <button onClick={() => setSearchModalType('Type')} className={css.select__category_btn}>Type</button>
            <button onClick={() => setSearchModalType('Brand')} className={css.select__category_btn}>Brand</button>
            <button onClick={() => setSearchModalType('Number')} className={css.select__category_btn}>
              Inventory number
            </button>
            <button onClick={setFree} className={css.select__category_btn}>Free</button>
            <button onClick={setNotFree} className={css.select__category_btn}>Not free</button>
          </div>
        </div>
      }
      {(searchModalType === 'Type' || searchModalType === 'Brand' || searchModalType === 'Number') &&
        <div className={css.components__modal_wrapper} onClick={() => setSearchModalType(null)}>
          <div className={css.search__modal} onClick={(e) => e.stopPropagation()}>
            Select by {searchModalType}
            <form className={css.select__modal_form} onSubmit={handleSubmit(getByFormData)}>
              <input type="text" placeholder={searchModalType} {...register(searchModalType)}
                     className={css.select__modal_input}/>
              <button className={css.search__by_button}>Search</button>
            </form>
          </div>
        </div>
      }
      {searchModalType === 'Type' &&
        <div className={css.components__modal_wrapper} onClick={() => setSearchModalType(null)}>
          <div style={{minHeight: '300px'}} className={css.search__modal} onClick={(e) => e.stopPropagation()}>
            Select by {searchModalType}
            <TypesDropdown externalSetType={setType}/>
            <button style={{width: '100%'}} onClick={() => {
              if (type) getByFormData({Type: type});
            }} className={css.search__by_button}>Search
            </button>
          </div>
        </div>
      }
      <nav className={css.computers__nav}>
        <div onClick={() => setSearchModalType('main')} className={css.search__by_button}>Search by...</div>
        <AddButton onClick={() => setOpenAddModal(true)} endTitle="component"/>
      </nav>
      <div className={css.computers__list}>
        <div className={css.comp__list_header}>
          <div className={css.component__type}>Type</div>
          <div className={css.component__brand}>Brand</div>
          <div className={css.component__free}>Is free</div>
          <div className={css.component__number}>Inventory number</div>
        </div>
        {components?.length
          ? components?.map(el =>
            <Link to={`/component/${el?.id}`} key={el.id} className={css.comp__block}>
              <div className={css.component__type}>{el.type}</div>
              <div className={css.component__brand}>{el.brand}</div>
              <div className={css.component__free}>{el?.computerId ? 'No' : 'Yes'}</div>
              <div className={css.component__number}>{el?.inventoryNumber}</div>
            </Link>)
          :
          <div>No components</div>
        }
      </div>
    </div>
  );
};

export { ComponentsPage };
