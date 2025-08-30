import { useState, useMemo, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { FormData } from '@/types';
import { funcionalidadesOptions } from '@/app/questionario/iniciar/constants';

/**
 * Hook customizado para gerenciar a lógica do formulário de questionário.
 * Encapsula o estado, validações e a submissão dos dados para o Firebase.
 */
export const useQuestionarioForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    usaTraqueostomia: '',
    aceitouTermosPesquisa: false,
    aceitouContatoFuturo: false,
    momentoUsoApp: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Mantendo os nomes originais das seções
  const stepsConfig = useMemo(() => {
    if (formData.usaTraqueostomia === 'Não') {
      return [
        { name: 'Seção 1' },
        { name: 'Seção 2' },
        { name: 'Seção 3' },
        { name: 'Finalização' },
      ];
    }
    // Fluxo para "Sim"
    return [
      { name: 'Seção 1' },
      { name: 'Seção 2' },
      { name: 'Seção 3' },
      { name: 'Seção 4' },
      { name: 'Seção 5' },
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

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  }, []);
  
  const handleMultiCheckboxChange = useCallback((name: keyof FormData, value: string) => {
    setFormData(prev => {
        const currentValues = (prev[name] as string[] | undefined) || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];

        if (newValues.length > 2) {
            setError("Você pode selecionar no máximo 2 opções.");
            return prev;
        }
        clearError();
        return { ...prev, [name]: newValues };
    });
}, [clearError]);


  const fetchAddressFromCEP = useCallback(async (cep: string) => {
    if (cep.length !== 9) return; // Formato XXXXX-XXX
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
      if (!response.ok) throw new Error('CEP não encontrado');
      const data = await response.json();
      if (data.erro) {
        setError("CEP não encontrado. Verifique o número digitado.");
        return;
      }
      setFormData(prev => ({
        ...prev,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
      }));
      clearError();
    } catch (err) {
      console.error("Erro ao buscar CEP:", err);
      setError("Não foi possível buscar o endereço. Verifique sua conexão.");
    }
  }, [clearError]);

  const handleCepChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); 
    value = value.replace(/^(\d{5})(\d)/, '$1-$2'); 
    setFormData(prev => ({ ...prev, cep: value.slice(0, 9) }));
  }, []);


  const validateStep = useCallback((currentStep: number): boolean => {
    const missingFieldMessage = "Por favor, responda a todas as perguntas para continuar.";
    const isFieldMissing = (fieldName: keyof FormData) => {
        const value = formData[fieldName];
        if (Array.isArray(value)) {
            return value.length === 0;
        }
        return !value;
    };
    
    const fieldsByStepSim: (keyof FormData)[][] = [
        ['nome', 'contato', 'cep', 'rua', 'nivelEstudo', 'usaTraqueostomia', 'aceitouTermosPesquisa'],
        ['parentesco', 'maiorMedo', 'riscoGrave', 'sentimentoApoio', 'confiancaCuidado', 'buscaInformacao', 'filhoIntubado'],
        ['apoioComunidade'],
        [...funcionalidadesOptions.map(f => `func_${f.id}` as keyof FormData), 'momentoUsoApp', 'importanciaApp', 'maiorBeneficio'],
        ['importanciaVozFamilias', 'pensouComprarDispositivo']
    ];
    
    const fieldsByStepNao: (keyof FormData)[][] = [
        ['nome', 'contato', 'cep', 'rua', 'nivelEstudo', 'usaTraqueostomia', 'aceitouTermosPesquisa'],
        ['cuidaOutraCondicao', 'utilidadeOutrasCondicoes'],
        ['filhoIntubado']
    ];

    if(currentStep === 0 && !formData.aceitouTermosPesquisa) {
        setError("Você precisa aceitar os termos da pesquisa para continuar.");
        return false;
    }

    let fieldsToValidate: (keyof FormData)[] = [];
    if(formData.usaTraqueostomia === 'Sim') {
        fieldsToValidate = fieldsByStepSim[currentStep] || [];
        if (currentStep === 1 && formData.filhoIntubado && !formData.filhoIntubado.startsWith('Não')) {
            fieldsToValidate.push('sabiaRiscosIntubacao', 'explicaramRiscosTQT', 'medoIntubacao');
        }
        if (currentStep === 4 && formData.pensouComprarDispositivo && formData.pensouComprarDispositivo !== 'Não, nunca precisei' && formData.pensouComprarDispositivo !== 'Não sabia que era possível comprar por conta própria') {
            fieldsToValidate.push('dificuldadeCompra');
        }
    } else if (formData.usaTraqueostomia === 'Não') {
        fieldsToValidate = fieldsByStepNao[currentStep] || [];
         if (currentStep === 2 && formData.filhoIntubado && !formData.filhoIntubado.startsWith('Não')) {
            fieldsToValidate.push('sabiaRiscosIntubacao', 'explicaramRiscosTQT', 'medoIntubacao');
        }
    } else if (currentStep === 0) {
        fieldsToValidate = fieldsByStepSim[0];
    }
    
    for (const field of fieldsToValidate) {
        if (isFieldMissing(field)) {
            setError(missingFieldMessage);
            return false;
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
    if(!validateStep(step)){
        return;
    }
    setError(null);
    setIsLoading(true);

    try {
      await fetchAddressFromCEP(formData.cep || '');
      // Aguarda um pequeno tempo para garantir que o estado seja atualizado com o endereço
      await new Promise(resolve => setTimeout(resolve, 500)); 

      setFormData(currentData => {
        const dataToSave = { ...currentData, createdAt: serverTimestamp() };
        addDoc(collection(db, "respostasQuestionario"), dataToSave)
          .then(() => {
            setIsSubmitted(true);
          })
          .catch(err => {
            console.error("Erro ao salvar no Firebase:", err);
            setError("Ocorreu um erro ao enviar suas respostas. Tente novamente.");
          })
          .finally(() => {
            setIsLoading(false);
          });
        return currentData; 
      });

    } catch (err) {
      console.error("Erro no processo de submissão:", err);
      setError("Ocorreu um erro ao processar o CEP. Tente novamente.");
      setIsLoading(false);
    }
  }, [formData.cep, step, validateStep, fetchAddressFromCEP]);

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
    handleCheckboxChange,
    handleMultiCheckboxChange,
    handleCepChange,
    fetchAddressFromCEP,
    nextStep,
    prevStep,
    handleSubmit,
    clearError,
  };
};