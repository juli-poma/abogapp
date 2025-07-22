import React from 'react';
import { CalendarIcon } from './icons/CalendarIcon.jsx';
import { UserIcon } from './icons/UserIcon.jsx';
import { BriefcaseIcon } from './icons/BriefcaseIcon.jsx';
import { DocumentTextIcon } from './icons/DocumentTextIcon.jsx';

const WhatsAppIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.687-1.475L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.447-4.435-9.884-9.888-9.884-5.448 0-9.886 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.001.004l-1.043 3.803l3.827-1.023z"></path>
    </svg>
);


const CaseCard = ({ caseData }) => {
    
    const handleSendMessage = () => {
        if (caseData.whatsapp) {
            // Elimina cualquier caracter que no sea un dígito para asegurar un enlace limpio.
            const phoneNumber = caseData.whatsapp.replace(/\D/g, '');
            window.open(`https://wa.me/${phoneNumber}`, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="bg-surface rounded-xl shadow-lg overflow-hidden mb-6 transition-transform transform hover:-translate-y-1">
            <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    {/* Main Case Info */}
                    <div className="flex-grow">
                        <div className="flex items-center mb-4 flex-wrap">
                             <UserIcon className="h-6 w-6 text-primary" />
                             <h3 className="text-xl font-bold text-text-primary ml-3">{caseData.nombre} {caseData.apellido}</h3>
                             <span className="ml-4 text-sm bg-amber-100 text-amber-900 font-medium px-2 py-1 rounded-full">{caseData.edad ? `${caseData.edad} años` : 'Edad N/A'}</span>
                        </div>

                        {caseData.whatsapp && (
                           <div className="flex items-center text-text-secondary mb-4">
                             <WhatsAppIcon className="h-5 w-5 mr-3 text-primary" />
                             <span className="font-semibold mr-2">WhatsApp:</span> {caseData.whatsapp}
                             <button
                                onClick={handleSendMessage}
                                className="ml-4 px-3 py-1 text-xs font-semibold text-text-primary bg-accent rounded-full hover:brightness-95 transition-all"
                             >
                                Enviar Mensaje
                             </button>
                           </div>
                        )}

                        <div className="flex items-center text-text-secondary mb-2">
                             <BriefcaseIcon className="h-5 w-5 mr-3" />
                             <span className="font-semibold mr-2">Tipo de Caso:</span> {caseData.tipoCaso}
                        </div>
                        <div className="flex items-start text-text-secondary">
                             <DocumentTextIcon className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                             <div>
                                <span className="font-semibold">Materia:</span>
                                <p className="text-text-primary leading-relaxed">{caseData.materia}</p>
                             </div>
                        </div>
                    </div>
                    {/* Meeting Suggestion Card */}
                    <div className="mt-6 md:mt-0 md:ml-6 md:w-64 flex-shrink-0 bg-amber-50 border-2 border-accent rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center text-primary mb-2">
                            <CalendarIcon className="h-6 w-6 mr-2" />
                            <h4 className="font-bold text-lg">Reunión Sugerida</h4>
                        </div>
                        <p className="text-2xl font-extrabold text-primary">{new Date(caseData.reunionSugerida.fecha + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</p>
                        <p className="text-lg text-text-secondary">a las {caseData.reunionSugerida.hora} hs</p>
                        <p className="text-xs text-text-secondary mt-3">Consulta del {new Date(caseData.fechaConsulta + 'T00:00:00').toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CaseTable = ({ cases }) => {
  if (cases.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-surface rounded-lg shadow-sm">
        <svg className="mx-auto h-12 w-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-text-primary">No hay casos procesados</h3>
        <p className="mt-1 text-sm text-text-secondary">
          Ingrese una nueva consulta para comenzar a clasificar casos.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {cases.map((caseItem, index) => (
        <CaseCard key={index} caseData={caseItem} />
      ))}
    </div>
  );
};

export default CaseTable;
