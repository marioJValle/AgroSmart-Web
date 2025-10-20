import { CultivosRepository } from '../../../data/repositories/cultivosRepository/CultivosRepository';

const cultivosRepository = new CultivosRepository();

export const cultivosManager = {
  getAll: async () => {
    return await cultivosRepository.getAll();
  },
  create: async (data) => {
    return await cultivosRepository.create(data);
  },
  update: async (id, data) => {
    return await cultivosRepository.update(id, data);
  },
  delete: async (id) => {
    return await cultivosRepository.delete(id);
  },
};
