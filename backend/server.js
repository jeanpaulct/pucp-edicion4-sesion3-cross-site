const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simulación de base de datos en memoria para el módulo de reseñas
const reviews = [
    { 
        id: 1, 
        author: "Ana", 
        text: "Excelente producto, muy <b>recomendado</b>. Volvería a comprarlo." 
    },
    {
        id: 2,
        author: "Carlos",
        text: "El envío fue rápido, pero la caja llegó un poco <i>golpeada</i>."
    }
];

/**
 * Endpoint: Obtener todas las reseñas
 * Método: GET
 * Ruta: /api/reviews
 */
app.get('/api/reviews', (req, res) => {
    try {
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Error interno al recuperar los comentarios." });
    }
});

/**
 * Endpoint: Crear nueva reseña
 * Método: POST
 * Ruta: /api/reviews
 */
app.post('/api/reviews', (req, res) => {
    try {
        const { author, text } = req.body;

        if (!author || !text) {
            return res.status(400).json({ error: "Los campos 'author' y 'text' son obligatorios." });
        }

        const newReview = {
            id: reviews.length > 0 ? reviews[reviews.length - 1].id + 1 : 1,
            author,
            text
        };

        reviews.push(newReview);

        res.status(201).json({
            message: "Reseña publicada con éxito",
            data: newReview
        });
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ error: "Error interno al guardar la reseña." });
    }
});

app.listen(PORT, () => {
    console.log(`Product Review Service (Backend) corriendo en http://localhost:${PORT}`);
});