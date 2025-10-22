
import { useState, useEffect } from 'react';

export function FormularioPublicacionNovedades({ user, initialData, onSave, onCancelEdit }) {

    const [formData, setFormData] = useState({ title: "", description: "", author: "", content: "" });
    const [preview, setPreview] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [isAuthorLocked, setIsAuthorLocked] = useState(false);

    const isEditing = initialData !== null;

    useEffect(() => {
        if (isEditing) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                author: initialData.author || '',
                content: initialData.content || '',
            });
            setPreview(initialData.imageBytes || null);
            setImageBase64(initialData.imageBytes || null);
        } else {
            // When not editing, set author based on role
            const authorName = user && user.role === 'Administrador' ? 'Team AgroSmart' : '';
            setFormData({ title: "", description: "", author: authorName, content: "" });
            setPreview(null);
            setImageBase64(null);
        }

        // Lock author field only for admin users
        setIsAuthorLocked(user && user.role === 'Administrador');

    }, [initialData, user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                    const MAX_WIDTH = 800;
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scaleSize;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7);
                    setImageBase64(resizedBase64);
                    setPreview(resizedBase64);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const clearForm = () => {
        const authorName = user && user.role === 'Administrador' ? 'Team AgroSmart' : '';
        setFormData({ title: "", description: "", author: authorName, content: "" });
        setPreview(null);
        setImageBase64(null);
        if (document.querySelector('input[type="file"]')) {
            document.querySelector('input[type="file"]').value = "";
        }
    };

    const handleSubmit = (e, status) => {
        e.preventDefault();
        onSave({ ...formData, imageBytes: imageBase64 }, status);
        if (!isEditing) {
            clearForm();
        }
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title mb-0">{isEditing ? 'Editar Novedad' : 'Crear Novedad'}</h5>
                    {isEditing && <button className="btn btn-sm btn-outline-secondary" onClick={onCancelEdit}>Cancelar Edición</button>}
                </div>
                <form onSubmit={(e) => handleSubmit(e, 'published')}>
                    <div className="mb-3">
                        <label className="form-label">Imagen de portada</label>
                        <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />
                        {preview && <img src={preview} alt="preview" className="img-fluid rounded mt-2" style={{ maxWidth: "200px" }} />}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Título</label>
                        <input type="text" name="title" className="form-control" placeholder="Escribe el título..." value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Autor</label>
                        <input type="text" name="author" className="form-control" placeholder="Nombre del autor..." value={formData.author} onChange={handleChange} disabled={isAuthorLocked} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea name="description" className="form-control" rows="2" placeholder="Escribe una breve descripción..." value={formData.description} onChange={handleChange} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contenido</label>
                        <textarea name="content" className="form-control" rows="4" placeholder="Escribe el contenido..." value={formData.content} onChange={handleChange} required></textarea>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-secondary d-flex align-items-center" onClick={(e) => handleSubmit(e, 'draft')}>
                            {isEditing ? 'Actualizar Borrador' : 'Guardar Borrador'}
                        </button>
                        <button type="submit" className="btn btn-success d-flex align-items-center">
                            {isEditing ? 'Actualizar Publicación' : 'Publicar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

