import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

const App = () => {
    const [reviews, setReviews] = useState([]);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/reviews');
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            const data = await response.json();
            setReviews(data);
        } catch (err) {
            console.error("Error cargando las reseñas:", err);
            setError('No se pudieron cargar los comentarios recientes.');
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!author.trim() || !text.trim()) {
            setError('Por favor, completa todos los campos requeridos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ author, text }),
            });

            if (response.ok) {
                setAuthor('');
                setText('');
                fetchReviews(); // Recargar la lista después de publicar
            } else {
                const errData = await response.json();
                setError(errData.error || 'Ocurrió un problema al publicar la reseña.');
            }
        } catch (err) {
            console.error("Error publicando la reseña:", err);
            setError('Error de conexión con el servidor. Inténtalo más tarde.');
        }
    };

    return (
        <div style={{ maxWidth: '650px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
            <h2>Opiniones sobre el Producto</h2>
            
            <div style={{ marginBottom: '40px', padding: '25px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <h3>Escribe tu opinión</h3>
                <p style={{ fontSize: '0.85em', color: '#555', marginBottom: '20px' }}>
                    * El sistema soporta formato básico. Puedes usar etiquetas como &lt;b&gt; para negrita o &lt;i&gt; para cursiva.
                </p>
                
                {error && (
                    <div style={{ padding: '10px', backgroundColor: '#ffe6e6', color: '#d93025', borderRadius: '4px', marginBottom: '15px' }}>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Tu Nombre:</label>
                        <input 
                            type="text" 
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
                            placeholder="Ej. Juan Pérez"
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Comentario:</label>
                        <textarea 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', minHeight: '120px', borderRadius: '4px', border: '1px solid #ccc' }}
                            placeholder="¿Qué te pareció el producto?"
                        />
                    </div>
                    <button 
                        type="submit"
                        style={{ padding: '12px 24px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em', fontWeight: 'bold' }}
                    >
                        Publicar Comentario
                    </button>
                </form>
            </div>

            <div>
                <h3>Comentarios de la Comunidad</h3>
                {reviews.length === 0 ? (
                    <p style={{ color: '#666' }}>Aún no hay opiniones. ¡Sé el primero en comentar!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} style={{ marginBottom: '20px', padding: '15px', borderBottom: '1px solid #eee' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1em', marginBottom: '8px' }}>
                                {review.author}
                            </div>
                            {/* Renderizado dinámico de HTML según especificación del negocio */}
                            <div 
                                style={{ color: '#333', lineHeight: '1.5' }}
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(review.text, {
                                    ALLOWED_TAGS: ['b', 'i', 'strong', 'em'],
                                    ALLOWED_ATTR: []
                                }) }} 
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default App;