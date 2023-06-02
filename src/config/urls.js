const baseURL = 'https://spring-boot-reference-system.onrender.com/api';
// const baseURL = 'http://localhost:8080/api';

export default baseURL;

export const urls = {
  getAllComputers: '/computers/getAll',
  getOneComputer: '/computers/getById',
  deleteComputer: '/computers/delete',
  createComputer: '/computers/create',

  getALLComponents: '/components/getAll',
  createComponent: '/components/create',
  updateComponent: '/components/update',
  getComponentsByCompId: '/components/getBy/ComputerId',
  getComponentById: '/components/getById',
  getComponentsByQuery: '/components/getBy'
};

