import { axiosServices } from './axios.services';

import { urls } from '../config/urls';

export const ComponentServices = {
  getAll: () => axiosServices.get(urls.getALLComponents).then(value => value.data),
  create: (data) => axiosServices.post(urls.createComponent, data).then(value => value.data),
  update: (data) => axiosServices.put(urls.updateComponent, data).then(value => value.data),
  getById: (id) => axiosServices.get(`${urls.getComponentById}/${id}`).then(value => value.data),
  getByComputer: (id) => axiosServices.get(`${urls.getComponentsByCompId}/${id}`).then(value => value.data).catch(e => console.log(e)),
  getByQuery: (query) => axiosServices.get(`${urls.getComponentsByQuery}/${query}`).then(value => value.data)
};
