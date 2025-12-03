import { FotografiasRepository } from "../../../data/repositories/fotografiasRepository/FotografiasRepository";

export const deleteFotografia = async (id) => {
    const fotografiasRepository = new FotografiasRepository();
    return await fotografiasRepository.deleteFotografia(id);
};
