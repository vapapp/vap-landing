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
    riscoGrave: [],
    naoTemCep: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrorField, setValidationErrorField] = useState<keyof FormData | null>(null);

  const clearError = useCallback(() => {
    setError(null);
    setValidationErrorField(null);
  }, []);

  const stepsConfig = useMemo(() => {
    if (formData.usaTraqueostomia === 'Não') {
      return [
        { name: 'Seção 1' },
        { name: 'Seção 2' },
        { name: 'Seção 3' },
        { name: 'Finalização' },
      ];
    }
    return [
      { name: 'Seção 1' },
      { name: 'Seção 2' },
      { name: 'Seção 3' },
      { name: 'Seção 4' },
      { name: 'Seção 5' },
      { name: 'Seção 6' },
      { name: 'Finalização' },
    ];
  }, [formData.usaTraqueostomia]);

  const totalSteps = stepsConfig.length;

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValidationErrorField(null);
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  }, []);

  const handleRadioChange = useCallback((name: keyof FormData, value: string) => {
    setValidationErrorField(null);
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  }, []);

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setValidationErrorField(null);
    if (name === 'naoTemCep') {
        setFormData((prev: FormData) => ({
            ...prev,
            [name]: checked,
            cep: '',
            rua: '',
            bairro: '',
            cidade: '',
            estado: '',
        }));
        clearError();
    } else {
        setFormData((prev: FormData) => ({ ...prev, [name]: checked }));
    }
  }, [clearError]);

  const handleMultiCheckboxChange = useCallback((name: keyof FormData, value: string) => {
    setValidationErrorField(null);
    setFormData((prev: FormData) => {
        const currentValues = (prev[name] as string[] | undefined) || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];

        if (name === 'momentoUsoApp' && newValues.length > 2) {
            setError("Você pode selecionar no máximo 2 opções.");
            return prev;
        }
        clearError();
        return { ...prev, [name]: newValues };
    });
  }, [clearError]);

  const handleMultiCheckboxChangeRiscoGrave = useCallback((name: keyof FormData, value: string) => {
      setValidationErrorField(null);
      setFormData((prev: FormData) => {
          const currentValues = (prev[name] as string[] | undefined) || [];
          const newValues = currentValues.includes(value)
              ? currentValues.filter(v => v !== value)
              : [...currentValues, value];

          if (newValues.length > 3) {
              setError("Você pode selecionar no máximo 3 opções.");
              return prev;
          }
          clearError();
          return { ...prev, [name]: newValues };
      });
  }, [clearError]);

  const fetchAddressFromCEP = useCallback(async (cep: string): Promise<boolean> => {
    if (cep.length !== 9) return true;
    
    setIsLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
      if (!response.ok) throw new Error('CEP não encontrado');
      const data = await response.json();
      if (data.erro) {
        setError("CEP não encontrado. Verifique o número ou marque a opção 'Não tenho CEP' para preencher manually.");
        setValidationErrorField('cep');
        setIsLoading(false);
        return false;
      }
      setFormData((prev: FormData) => ({
        ...prev,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
      }));
      clearError();
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error("Erro ao buscar CEP:", err);
      setError("Não foi possível buscar o endereço. Verifique sua conexão ou o CEP digitado.");
      setValidationErrorField('cep');
      setIsLoading(false);
      return false;
    }
  }, [clearError]);

  const handleCepChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    setFormData((prev: FormData) => ({ ...prev, cep: value.slice(0, 9) }));
    if(value.length < 9) {
        clearError();
    }
  }, [clearError]);

  const validateStep = useCallback((currentStep: number): boolean => {
    const missingFieldMessage = "Por favor, responda a todas as perguntas para continuar.";
    const isFieldMissing = (fieldName: keyof FormData) => {
        const value = formData[fieldName];
        if (Array.isArray(value)) {
            return value.length === 0;
        }
        return !value;
    };

    const handleValidationError = (field: keyof FormData, message: string = missingFieldMessage) => {
        setError(message);
        setValidationErrorField(field);
        return false;
    };

    const fieldsByStepSim: (keyof FormData)[][] = [
        [], // Step 0 is handled separately
        ['parentesco', 'maiorMedo', 'riscoGrave', 'sentimentoApoio', 'confiancaCuidado', 'buscaInformacao', 'filhoIntubado'],
        ['apoioComunidade'],
        [...funcionalidadesOptions.map((f: {id: string}) => `func_${f.id}` as keyof FormData), 'momentoUsoApp', 'importanciaApp', 'maiorBeneficio'],
        ['importanciaVozFamilias', 'pensouComprarDispositivo']
    ];
    
    const fieldsByStepNao: (keyof FormData)[][] = [
        [], // Step 0 is handled separately
        ['cuidaOutraCondicao', 'utilidadeOutrasCondicoes'],
        ['filhoIntubado']
    ];

    if(currentStep === 0) {
        const baseFields: (keyof FormData)[] = ['nome', 'contato', 'nivelEstudo', 'usaTraqueostomia'];
        if (formData.naoTemCep) {
            baseFields.push('rua', 'bairro', 'cidade', 'estado');
        } else {
            baseFields.push('cep');
        }

        for (const field of baseFields) {
            if (isFieldMissing(field)) return handleValidationError(field);
        }
        if (!formData.aceitouTermosPesquisa) {
            return handleValidationError('aceitouTermosPesquisa', "Você precisa aceitar os termos da pesquisa para continuar.");
        }
    } else {
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
        }
        
        for (const field of fieldsToValidate) {
            if (isFieldMissing(field)) return handleValidationError(field);
        }
    }

    return true;
  }, [formData]);

  const nextStep = useCallback(async () => {
    clearError();
    let isCepValid = true;
    if (step === 0 && !formData.naoTemCep && formData.cep?.length === 9) {
        isCepValid = await fetchAddressFromCEP(formData.cep);
    }

    if (isCepValid && validateStep(step)) {
      setStep((prev: number) => Math.min(prev + 1, totalSteps - 1));
    }
  }, [step, totalSteps, validateStep, formData.cep, formData.naoTemCep, fetchAddressFromCEP, clearError]);

  const prevStep = useCallback(() => {
    clearError();
    setStep((prev: number) => Math.max(prev - 1, 0));
  }, [clearError]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!formData.naoTemCep) {
        const isValidCep = await fetchAddressFromCEP(formData.cep || '');
        if (!isValidCep) {
            return;
        }
    }

    if (!validateStep(step)) {
        return;
    }

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
  }, [formData, fetchAddressFromCEP, validateStep, step, clearError]);

  return {
    step,
    formData,
    isLoading,
    error,
    isSubmitted,
    stepsConfig,
    totalSteps,
    validationErrorField,
    handleInputChange,
    handleRadioChange,
    handleCheckboxChange,
    handleMultiCheckboxChange,
    handleMultiCheckboxChangeRiscoGrave,
    handleCepChange,
    nextStep,
    prevStep,
    handleSubmit,
    clearError,
  };
};