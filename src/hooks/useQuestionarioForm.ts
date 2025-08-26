import { useState, useMemo, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { FormData } from '@/app/questionario/iniciar/constants';
import { funcionalidadesOptions } from '@/app/questionario/iniciar/constants';

/**
 * Hook customizado para gerenciar a lógica do formulário de questionário.
 * Encapsula o estado, validações e a submissão dos dados para o Firebase.
 */
export const useQuestionarioForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({ usaTraqueostomia: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  
  const stepsConfig = useMemo(() => {
    if (formData.usaTraqueostomia === 'Não') {
      return [
        { name: 'Perfil' },
        { name: 'Cuidados Gerais' },
        { name: 'Experiência' },
        { name: 'Finalização' },
      ];
    }
    return [
      { name: 'Perfil' },
      { name: 'Desafios' },
      { name: 'Solução VAP-App' },
      { name: 'Experiência' },
      { name: 'Finalização' },
    ];
  }, [formData.usaTraqueostomia]);

  const totalSteps = stepsConfig.length;

  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleRadioChange = useCallback((name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);


  const validateStep = useCallback((currentStep: number): boolean => {
    const stepFields: { [key: string]: (keyof FormData)[][] } = {
      'Sim': [
        ['nome', 'contato', 'nivelEstudo', 'usaTraqueostomia'],
        ['parentesco', 'maiorMedo', 'sentimentoApoio', 'confiancaCuidado', 'buscaInformacao'],
        [...funcionalidadesOptions.map(f => `func_${f.id}` as keyof FormData), 'momentoUsoApp', 'importanciaApp', 'maiorBeneficio'],
        ['importanciaVozFamilias', 'pensouComprarDispositivo', 'dificuldadeCompra'],
      ],
      'Não': [
        ['nome', 'contato', 'nivelEstudo', 'usaTraqueostomia'],
        ['cuidaOutraCondicao', 'utilidadeOutrasCondicoes'],
        ['filhoIntubado', 'sabiaRiscosIntubacao', 'explicaramRiscosTQT', 'medoIntubacao'],
      ]
    };

    const path = formData.usaTraqueostomia;
    
    if (!path && currentStep > 0) {
      setError("Por favor, selecione se a criança utiliza traqueostomia para continuar.");
      return false;
    }
    
    const fieldsToValidate = path ? stepFields[path]?.[currentStep] : stepFields['Sim'][currentStep];

    if (fieldsToValidate) {
      for (const field of fieldsToValidate) {
        if (field === 'dificuldadeCompra' && (formData.pensouComprarDispositivo === 'Não, nunca precisei' || formData.pensouComprarDispositivo === 'Não sabia que era possível comprar por conta própria')) {
            continue;
        }
        
        if (formData.usaTraqueostomia === 'Não' && currentStep === 2) {
            if (formData.filhoIntubado?.startsWith('Não')) {
                
                if (field !== 'filhoIntubado' && !formData[field]) {
                    continue;
                }
            }
        }
        
        if (!formData[field]) {
            setError("Por favor, responda a todas as perguntas para continuar.");
            return false;
        }
      }
    }

    return true;
  }, [formData]);

  
  const nextStep = useCallback(() => {
    if (validateStep(step)) {
      setError(null);
      setStep(prev => Math.min(prev + 1, totalSteps - 1));
    }
  }, [step, totalSteps, validateStep]);

  const prevStep = useCallback(() => {
    setError(null);
    setStep(prev => Math.max(prev - 1, 0));
  }, []);

  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setIsLoading(true);
    try {
      const dataToSave = { ...formData, createdAt: serverTimestamp() };
      await addDoc(collection(db, "respostasQuestionario"), dataToSave);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Erro ao salvar no Firebase:", err);
      setError("Ocorreu um erro ao enviar suas respostas. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  return {
    step,
    formData,
    isLoading,
    error,
    isSubmitted,
    stepsConfig,
    totalSteps,
    handleInputChange,
    handleRadioChange,
    nextStep,
    prevStep,
    handleSubmit,
  };
};
