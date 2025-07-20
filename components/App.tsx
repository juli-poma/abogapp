import React, { useState, useCallback } from 'react';
import { analyzeLegalCase } from './services/geminiService.js';
import Header from './components/Header.jsx';
import InputArea from './components/InputArea.jsx';
import CaseTable from './components/CaseTable.jsx';
import { SparklesIcon } from './components/icons/SparklesIcon.jsx';
import { AlertTriangleIcon } from './components/icons/AlertTriangleIcon.jsx';
import { Footer } from './components/Footer.jsx';

const App = () => {
  const [cases, setCases] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProcessQuery = useCallback(async () => {
    if (!currentQuery.trim()) {
      setError('Por favor, ingrese una consulta antes de procesar.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newCase = await analyzeLegalCase(currentQuery);
      setCases(prevCases => [newCase, ...prevCases]);
      setCurrentQuery('');
    } catch (err) {
      console.error(err);
      setError('Hubo un error al procesar la consulta con la IA. Por favor, intente de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [currentQuery]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-text-primary">
      <Header />
      <main className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
        <div className="bg-surface rounded-2xl shadow-lg p-6 md:p-8">
          <InputArea
            query={currentQuery}
            setQuery={setCurrentQuery}
            onProcess={handleProcessQuery}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-4 flex items-center bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                <AlertTriangleIcon className="h-6 w-6 mr-3 text-red-500"/>
                <div>
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            </div>
          )}
        </div>

        <div className="mt-12">
          <div className="flex items-center mb-6">
            <SparklesIcon className="h-8 w-8 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary ml-3">
              Casos Procesados
            </h2>
          </div>
          
          <CaseTable cases={cases} />

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;