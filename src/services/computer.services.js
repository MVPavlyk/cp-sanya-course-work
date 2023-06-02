import { axiosServices } from './axios.services';

import { urls } from '../config/urls';

export const ComputerServices = {
  getAll: () => axiosServices.get(urls.getAllComputers).then(value => value.data),
  getOne: (id) => axiosServices.get(`${urls.getOneComputer}/${id}`).then(value => value.data),
  deleteComputer: (id) => axiosServices.delete(`${urls.deleteComputer}/${id}`).then(value => value.data),
  create: (data) => axiosServices.post(urls.createComputer, data).then(value => value.data)
};
