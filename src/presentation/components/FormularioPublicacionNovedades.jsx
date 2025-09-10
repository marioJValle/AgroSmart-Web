
import { News } from '../../domain/model/News';
import { NewsRepositoryImpl } from '../../data/repositories/NewsRepository/NewsRepository';
import { CreateNews } from '../../domain/useCases/newsUseCases/CreateNews';
import { useState } from 'react';


export function FormularioPublicacionNovedades() {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        author: "",
        content: "",
    });

    const [preview, setPreview] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {

        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;

                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 800; // 👈 tamaño máximo permitido
                    const scaleSize = MAX_WIDTH / img.width;

                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scaleSize;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    // Convertimos a JPG con compresión 0.7 (70% calidad)
                    const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7);

                    setImageBase64(resizedBase64); // Se guarda optimizada
                    setPreview(resizedBase64);     // Para previsualizar
                };
            };

            reader.readAsDataURL(file);
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newsRepository = new NewsRepositoryImpl();
        const createNews = new CreateNews(newsRepository);

        try {
            const news = new News({ ...formData, imageBytes: imageBase64 });
            const id = await createNews.execute(news);
            alert("Noticia publicada ✅ con ID: " + id);

            setFormData({ title: "", description: "", author: "", content: "" });
            setPreview(null);
            setImageBase64(null);
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h5 className="card-title mb-3">Nueva noticia</h5>

                    <form onSubmit={handleSubmit}>
                        {/* Imagen */}
                        <div className="mb-3">
                            <label className="form-label">Imagen de portada</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="img-fluid rounded mt-2"
                                    style={{ maxWidth: "200px" }}
                                />
                            )}
                        </div>

                        {/* Título */}
                        <div className="mb-3">
                            <label className="form-label">Título</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Escribe el título..."
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Autor */}
                        <div className="mb-3">
                            <label className="form-label">Autor</label>
                            <input
                                type="text"
                                name="author"
                                className="form-control"
                                placeholder="Escribe el autor..."
                                value={formData.author}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Descripción */}
                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <textarea
                                name="description"
                                className="form-control"
                                rows="2"
                                placeholder="Escribe una breve descripción..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>


                        {/* Contenido */}
                        <div className="mb-3">
                            <label className="form-label">Contenido </label>
                            <textarea
                                name="content"
                                className="form-control"
                                rows="4"
                                placeholder="Escribe el contenido con encabezados, negritas y enlaces..."
                                value={formData.content}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        {/* Botones */}
                        <div className="d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-outline-secondary d-flex align-items-center"
                            >
                                <i className="bi bi-save me-2"></i> Guardar
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success d-flex align-items-center"
                            >
                                <i className="bi bi-check-circle me-2"></i> Publicar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

