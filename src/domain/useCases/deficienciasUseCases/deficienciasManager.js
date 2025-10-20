import { DeficienciasRepository } from '../../../data/repositories/deficienciasRepository/DeficienciasRepository';

const deficienciasRepository = new DeficienciasRepository();

export const deficienciasManager = {
  getAll: async () => {
    return await deficienciasRepository.getAll();
  },
  create: async (data) => {
    return await deficienciasRepository.create(data);
  },
  update: async (id, data) => {
    return await deficienciasRepository.update(id, data);
  },
  delete: async (id) => {
    return await deficienciasRepository.delete(id);
  },
};
