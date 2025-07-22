// Archivo: api/gemini.js
// Este código se ejecuta en un entorno de Node.js en el servidor (función sin servidor).

import { GoogleGenAI, Type } from "@google/genai";

// El esquema de la respuesta esperada de la IA
const responseSchema = {
    type: Type.OBJECT,
    properties: {
        nombre: { 
            type: Type.STRING,
            description: "El primer nombre de la persona que consulta."
        },
        apellido: { 
            type: Type.STRING,
            description: "El apellido de la persona que consulta."
        },
        edad: { 
            type: Type.INTEGER,
            description: "La edad de la persona que consulta. Si no se menciona, devuelve null."
        },
        whatsapp: {
            type: Type.STRING,
            description: "El número de WhatsApp del cliente. Si no se menciona, devuelve null. Formatear solo con números, sin espacios, guiones ni el símbolo '+'."
        },
        tipoCaso: {
            type: Type.STRING,
            description: "Clasifica el caso en una de las siguientes categorías: Familiar, Penal, Laboral, Civil, Comercial, Administrativo, o 'No Especificado'."
        },
        materia: {
            type: Type.STRING,
            description: "Un resumen breve y conciso (máximo 25 palabras) de la consulta del cliente."
        },
        fechaConsulta: {
            type: Type.STRING,
            description: `La fecha de hoy en formato YYYY-MM-DD. Hoy es ${new Date().toISOString().split('T')[0]}.`
        },
        reunionSugerida: {
            type: Type.OBJECT,
            properties: {
                fecha: {
                    type: Type.STRING,
                    description: "Sugiere una fecha para la reunión dentro de los próximos 7 días hábiles (lunes a viernes). Formato YYYY-MM-DD."
                },
                hora: {
                    type: Type.STRING,
                    description: "Sugiere una hora para la reunión en horario de oficina (e.g., 10:00, 15:30). Formato HH:MM."
                }
            },
            required: ["fecha", "hora"]
        }
    },
    required: ["nombre", "apellido", "edad", "whatsapp", "tipoCaso", "materia", "fechaConsulta", "reunionSugerida"]
};

// El manejador de la función sin servidor.
// Vercel y Netlify pueden manejar este formato estándar de Request/Response.
export default async function handler(req) {
  // Solo permitir solicitudes POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Solo se permiten solicitudes POST' }), { 
        status: 405, 
        headers: { 'Content-Type': 'application/json' } 
    });
  }

  // Verificar que la API Key esté configurada en el entorno del servidor
  if (!process.env.API_KEY) {
      return new Response(JSON.stringify({ message: 'Error de configuración del servidor: falta la API_KEY.' }), { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' }
      });
  }

  try {
    const { query } = await req.json();

    if (!query) {
        return new Response(JSON.stringify({ message: 'El parámetro "query" es requerido.' }), { 
            status: 400, 
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    // Inicializar la IA de Google de forma segura en el servidor
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analiza la siguiente consulta de un cliente para un estudio jurídico: "${query}"`,
        config: {
            systemInstruction: "Eres un asistente de IA para un estudio jurídico en un país de habla hispana. Tu tarea es analizar la consulta de un cliente y extraer información específica de manera precisa y estructurada en formato JSON. Identifica el nombre, apellido, edad, número de whatsapp, tipo de caso, un resumen de la materia, y sugiere una fecha y hora para una reunión de seguimiento. La fecha de la consulta es hoy. Si un dato como la edad o el whatsapp no está presente, usa el valor null. Sé muy preciso con el formato de salida JSON.",
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });
    
    const jsonText = response.text;
    
    if (!jsonText) {
        throw new Error("La respuesta de la IA está vacía.");
    }

    // Devolver la respuesta JSON de la IA al frontend
    return new Response(jsonText, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en la función API:', error);
    return new Response(JSON.stringify({ message: 'Error al procesar la solicitud con la IA.', details: error.message }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' }
    });
  }
}
