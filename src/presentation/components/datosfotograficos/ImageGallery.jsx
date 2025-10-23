import React from 'react';

export default function ImageGallery({ data }) {
    const deficiencies = Object.keys(data || {});

    if (deficiencies.length === 0) {
        return <p className="text-gray-500">No hay imágenes para este cultivo.</p>;
    }

    return (
        <div>
            {deficiencies.map(deficiency => (
                <div key={deficiency} className="mb-8">
                    <h3 className="text-xl font-semibold mb-3 text-gray-600 capitalize">{deficiency}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data[deficiency].map(foto => {
                            const imgSrc = (foto.image64 || foto.image || '').trim();
                            console.log("📦 Objeto foto completo:", foto);

                            return (
                                <div key={foto.id} className="border rounded-lg overflow-hidden shadow-lg">
                                    <img
                                        src={`data:image/jpeg;base64,${imgSrc}`}
                                        alt={foto.result}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-2">
                                        <p className="text-sm text-gray-600 truncate">{foto.result}</p>
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
