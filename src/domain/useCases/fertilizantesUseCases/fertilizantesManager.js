import { FertilizantesRepository } from '../../../data/repositories/fertilizantesRepository/FertilizantesRepository';

const fertilizantesRepository = new FertilizantesRepository();

export const fertilizantesManager = {
  getAll: async () => {
    return await fertilizantesRepository.getAll();
  },
  create: async (data) => {
    return await fertilizantesRepository.create(data);
  },
  update: async (id, data) => {
    return await fertilizantesRepository.update(id, data);
  },
  delete: async (id) => {
    return await fertilizantesRepository.delete(id);
  },
};
