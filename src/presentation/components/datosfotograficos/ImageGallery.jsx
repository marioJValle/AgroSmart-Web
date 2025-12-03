import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { deleteFotografia } from '../../../domain/useCases/fotografiasUseCases/DeleteFotografia';
import ModalConfirmacion from '../gestionInformacion/ModalConfirmacion';
import AlertaNotificacion from '../gestionInformacion/AlertaNotificacion';

export default function ImageGallery({ data }) {
    const [galleryData, setGalleryData] = useState({});
    const [modalState, setModalState] = useState({ show: false, photoId: null, deficiency: null });
    const [alertState, setAlertState] = useState({ show: false, message: '', variant: '' });

    useEffect(() => {
        setGalleryData(data || {});
    }, [data]);

    const handleShowModal = (deficiency, photoId) => {
        setModalState({ show: true, photoId: photoId, deficiency: deficiency });
    };

    const handleHideModal = () => {
        setModalState({ show: false, photoId: null, deficiency: null });
    };

    const executeDelete = async () => {
        const { photoId, deficiency } = modalState;
        if (!photoId) return;

        try {
            await deleteFotografia(photoId);
            
            setGalleryData(prevData => {
                const updatedDeficiencyPhotos = prevData[deficiency].filter(photo => photo.id !== photoId);
                
                if (updatedDeficiencyPhotos.length === 0) {
                    const { [deficiency]: _, ...rest } = prevData;
                    return rest;
                }

                return {
                    ...prevData,
                    [deficiency]: updatedDeficiencyPhotos,
                };
            });

            setAlertState({ show: true, message: 'Imagen eliminada con éxito.', variant: 'success' });

        } catch (error) {
            console.error("Error al eliminar la imagen:", error);
            setAlertState({ show: true, message: 'Hubo un error al eliminar la imagen.', variant: 'danger' });
        } finally {
            handleHideModal();
        }
    };

    const deficiencies = Object.keys(galleryData);

    if (deficiencies.length === 0) {
        return <p style={{ color: "#666" }}>No hay imágenes para este cultivo.</p>;
    }

    return (
        <div>
            <AlertaNotificacion 
                show={alertState.show}
                message={alertState.message}
                variant={alertState.variant}
                onClose={() => setAlertState({ ...alertState, show: false })}
            />
            <ModalConfirmacion 
                show={modalState.show}
                onHide={handleHideModal}
                onConfirm={executeDelete}
                title="Confirmar Eliminación"
                message="¿Estás seguro de que deseas eliminar esta imagen? Esta acción no se puede deshacer."
            />

            <style>
                {`
                .image-grid-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                }

                /* Default: MOBILE (1 por fila) */
                .image-card {
                    flex: 0 0 100%;
                    max-width: 100%;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                /* Tablet: 2 por fila */
                @media (min-width: 640px) {
                    .image-card {
                        flex: 0 0 calc(50% - 16px);
                        max-width: calc(50% - 16px);
                    }
                }

                /* Laptop: 3 por fila */
                @media (min-width: 900px) {
                    .image-card {
                        flex: 0 0 calc(33.33% - 16px);
                        max-width: calc(33.33% - 16px);
                    }
                }

                /* Desktop: 4 por fila */
                @media (min-width: 1200px) {
                    .image-card {
                        flex: 0 0 calc(25% - 16px);
                        max-width: calc(25% - 16px);
                    }
                }
                `}
            </style>

            {deficiencies.map(deficiency => (
                <div key={deficiency} style={{ marginBottom: "40px" }}>
                    <h3 style={{
                        fontSize: "20px",
                        fontWeight: "600",
                        marginBottom: "15px",
                        textTransform: "capitalize",
                        color: "#555"
                    }}>
                        {deficiency}
                    </h3>

                    <div className="image-grid-container">
                        {galleryData[deficiency].map(foto => {
                            const imgSrc = (foto.image64 || foto.image || '').trim();

                            return (
                                <div key={foto.id} className="image-card">
                                    <div>
                                        <img
                                            src={`data:image/jpeg;base64,${imgSrc}`}
                                            alt={foto.result}
                                            style={{
                                                width: "100%",
                                                height: "160px",
                                                objectFit: "cover"
                                            }}
                                        />
                                        <div style={{ padding: "8px" }}>
                                            <p style={{
                                                fontSize: "14px",
                                                color: "#555",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis"
                                            }}>
                                                {foto.result}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ padding: "8px", borderTop: "1px solid #eee", textAlign: "center" }}>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleShowModal(deficiency, foto.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
