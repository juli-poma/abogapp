// Este archivo ahora actúa como un cliente para nuestro propio backend (la función sin servidor)

export const analyzeLegalCase = async (query) => {
    try {
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Ocurrió un error desconocido en el servidor.' }));
            throw new Error(`Error del API: ${response.status} - ${errorData.message || 'Sin detalles.'}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al llamar al API del backend:", error);
        throw new Error("No se pudo comunicar con el servidor de IA. Por favor, revise su conexión o intente más tarde.");
    }
};
