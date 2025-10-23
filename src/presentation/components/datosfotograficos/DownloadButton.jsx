import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver'; // Necesitaremos file-saver también

export default function DownloadButton({ images, filename, buttonText = 'Descargar Galería' }) {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        console.log("Datos recibidos por el botón de descarga:", images);

        if (!images || images.length === 0) {
            alert('No hay imágenes para descargar.');
            return;
        }

        setIsDownloading(true);
        const zip = new JSZip();
        let validImagesCount = 0;

        images.forEach((image, index) => {
            if (image && image.image64 && typeof image.image64 === 'string') {
                validImagesCount++;
                const base64Data = image.image64.split(',')[1] || image.image64;
                const safeResult = image.result || 'sin_nombre';
                const imageName = `${safeResult.replace(/\s+/g, '_')}_${index}.jpg`;
                zip.file(imageName, base64Data, { base64: true });
            } else {
                console.warn(`La imagen en el índice ${index} fue omitida por no tener un formato válido.`, image);
            }
        });

        if (validImagesCount === 0) {
            setIsDownloading(false);
            alert('No se encontraron imágenes con un formato válido para descargar. Por favor, revisa la consola del navegador (F12) para ver la estructura de los datos recibidos.');
            return;
        }

        try {
            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, `${filename}.zip`);
        } catch (error) {
            console.error("Error al generar el archivo ZIP:", error);
            alert("Hubo un error al crear el archivo de descarga.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <button 
            onClick={handleDownload} 
            disabled={isDownloading}
            className="btn btn-primary btn-sm"
        >
            {isDownloading ? 'Descargando...' : buttonText}
        </button>
    );
}
