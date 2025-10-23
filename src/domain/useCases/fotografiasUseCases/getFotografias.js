import { FotografiasRepository } from "../../../data/repositories/fotografiasRepository/FotografiasRepository";

export const getFotografias = async () => {
    const fotografiasRepository = new FotografiasRepository();
    return await fotografiasRepository.getAllFotografias();
};
