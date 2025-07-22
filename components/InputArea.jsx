import React, { useState } from 'react';
import { MicrophoneIcon } from './icons/MicrophoneIcon.jsx';
import { SendIcon } from './icons/SendIcon.jsx';
import { LoadingSpinner } from './icons/LoadingSpinner.jsx';

const InputArea = ({ query, setQuery, onProcess, isLoading }) => {
    const [isRecording, setIsRecording] = useState(false);

    const handleRecord = () => {
        setIsRecording(true);
        // Simulate recording and transcription
        setQuery('Simulando transcripción de audio...');
        setTimeout(() => {
            setIsRecording(false);
            setQuery('Mi nombre es Ana Pérez, tengo 35 años. Fui despedida de mi trabajo sin causa justa y quiero iniciar un reclamo. Necesito saber los pasos a seguir.');
        }, 1500);
    }

  return (
    <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Ingrese su consulta</h2>
        <div className="relative">
            <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Escriba su consulta aquí o use el micrófono para grabar..."
            className="w-full h-40 p-4 pr-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-accent focus:border-accent transition-shadow duration-200 resize-none text-text-primary bg-gray-50"
            disabled={isLoading || isRecording}
            />
            <button
                type="button"
                onClick={handleRecord}
                disabled={isLoading || isRecording}
                className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-200 ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-transparent text-secondary hover:bg-amber-100 hover:text-primary'} disabled:opacity-50`}
                title="Grabar audio"
            >
                <MicrophoneIcon className="h-6 w-6" />
            </button>
        </div>
        <div className="mt-4 flex justify-end">
            <button
                onClick={onProcess}
                disabled={isLoading || !query}
                className="flex items-center justify-center px-6 py-3 bg-primary text-on-primary font-bold rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-105 disabled:bg-secondary disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isLoading ? (
                    <>
                        <LoadingSpinner className="h-5 w-5 mr-2" />
                        <span>Procesando...</span>
                    </>
                ) : (
                    <>
                        <SendIcon className="h-5 w-5 mr-2" />
                        <span>Procesar Consulta</span>
                    </>
                )}
            </button>
        </div>
    </div>
  );
};

export default InputArea;
