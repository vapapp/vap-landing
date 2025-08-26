"use client";

import { useState, useMemo } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import styles from './Questionario.module.css';


interface FormData {
  [key: string]: string | undefined; 
  nome?: string;
  contato?: string;
  nivelEstudo?: string;
  usaTraqueostomia?: 'Sim' | 'Não' | '';
  parentesco?: string;
  maiorMedo?: string;
  sentimentoApoio?: string;
  confiancaCuidado?: string;
  buscaInformacao?: string;
  momentoUsoApp?: string;
  importanciaApp?: string;
  maiorBeneficio?: string;
  cuidaOutraCondicao?: 'Sim' | 'Não';
  utilidadeOutrasCondicoes?: string;
  filhoIntubado?: string;
  sabiaRiscosIntubacao?: string;
  explicaramRiscosTQT?: string;
  medoIntubacao?: string;
  importanciaVozFamilias?: string;
  pensouComprarDispositivo?: string;
  dificuldadeCompra?: string;
}

export default function Formulario() {
  const [step, setStep] = useState(0); 
  const [formData, setFormData] = useState<FormData>({ usaTraqueostomia: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  
  const stepsConfig = useMemo(() => {
    if (formData.usaTraqueostomia === 'Não') {
      return [
        { name: 'Perfil' },
        { name: 'Cuidados Gerais' },
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

  const nextStep = () => {
    setError(null); 
    setStep(prev => Math.min(prev + 1, totalSteps - 1));
  }
  const prevStep = () => {
    setError(null); 
    setStep(prev => Math.max(prev - 1, 0));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

   
    if (formData.usaTraqueostomia === 'Não' && !formData.cuidaOutraCondicao) {
        setError("Por favor, responda a todas as perguntas antes de finalizar.");
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
  };

  if (isSubmitted) {
    return (
      <div className={styles.formContainer}>
        <div className={styles.thankYouMessage}>
          <h2>Obrigado por sua colaboração!</h2>
          <p>Suas respostas nos ajudarão a construir uma ferramenta que realmente faça a diferença.</p>
        </div>
      </div>
    );
  }
  
  const renderStepContent = () => {
    
    if (formData.usaTraqueostomia === 'Não') {
      switch (step) {
        case 0: 
          return renderPerfilStep();
        case 1: 
          return renderCuidadosGeraisStep();
        case 2: 
          return renderFinalizacaoStep();
        default:
          return null;
      }
    }

    
    switch (step) {
      case 0:
        return renderPerfilStep();
      case 1:
        return renderDesafiosStep();
      case 2:
        return renderSolucaoStep();
      case 3:
        return renderExperienciaStep();
      case 4:
        return renderFinalizacaoStep();
      default:
        return null;
    }
  };
  
  const formatTableLabel = (label: string) => {
    return label
      .replace(/_/g, ' ')
      .replace('ia', 'IA')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  const renderPerfilStep = () => (
    <div className={styles.formStep}>
      <h2>Seu Perfil</h2>
      <div className={styles.inputGroup}>
        <label>1. Nome (opcional)</label>
        <input type="text" name="nome" value={formData.nome || ''} onChange={handleInputChange} placeholder="Seu nome" />
      </div>
      <div className={styles.inputGroup}>
        <label>2. E-mail ou Telefone (Opcional)</label>
        <input type="text" name="contato" value={formData.contato || ''} onChange={handleInputChange} placeholder="Seu contato para futuras pesquisas" />
      </div>
      <div className={styles.inputGroup}>
        <label>3. Qual seu nível de estudo?</label>
        <div className={styles.radioGroup}>
          {['Não estudei', 'Ensino Fundamental incompleto', 'Ensino Fundamental completo / Médio incompleto', 'Ensino Médio completo', 'Ensino Superior (completo ou incompleto)', 'Pós-Graduação ou mais'].map(o => <RadioOption key={o} name="nivelEstudo" value={o} checked={formData.nivelEstudo === o} onChange={handleRadioChange} />)}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>4. A criança que você cuida utiliza traqueostomia?</label>
        <div className={styles.radioGroup}>
          <RadioOption name="usaTraqueostomia" value="Sim" checked={formData.usaTraqueostomia === 'Sim'} onChange={handleRadioChange} />
          <RadioOption name="usaTraqueostomia" value="Não" checked={formData.usaTraqueostomia === 'Não'} onChange={handleRadioChange} />
        </div>
      </div>
    </div>
  );

  const renderDesafiosStep = () => (
    <div className={styles.formStep}>
      <h2>Sua Realidade e Maiores Desafios</h2>
      <div className={styles.inputGroup}>
        <label>5. Qual seu principal parentesco com a criança?</label>
        <div className={styles.radioGroup}>
          {['Mãe', 'Pai', 'Avó/Avô', 'Outro familiar', 'Cuidador(a) profissional'].map(o => <RadioOption key={o} name="parentesco" value={o} checked={formData.parentesco === o} onChange={handleRadioChange} />)}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>6. Pensando em momentos de crise, qual é o seu maior medo?</label>
        <div className={styles.radioGroup}>
          {['Não saber o que fazer a tempo.', 'Não conseguir contatar um médico rapidamente.', 'Tomar a decisão errada por conta própria.', 'O equipamento (aspirador, ventilador) falhar.'].map(o => <RadioOption key={o} name="maiorMedo" value={o} checked={formData.maiorMedo === o} onChange={handleRadioChange} />)}
        </div>
      </div>
       <div className={styles.inputGroup}>
        <label>7. Com que frequência você se sente sozinho(a) e sem apoio?</label>
        <div className={styles.radioGroup}>
          {['Quase todos os dias.', 'Algumas vezes por semana.', 'Algumas vezes por mês.', 'Raramente ou nunca.'].map(o => <RadioOption key={o} name="sentimentoApoio" value={o} checked={formData.sentimentoApoio === o} onChange={handleRadioChange} />)}
        </div>
      </div>
    </div>
  );
  
  const renderSolucaoStep = () => (
     <div className={styles.formStep}>
      <h2>Validando a Solução VAP-App</h2>
      <p className={styles.sectionDescription}>Imagine um aplicativo no seu celular feito para te ajudar. O quão valiosas seriam as seguintes ferramentas?</p>
      <div className={styles.inputGroup}>
        <label>10. Avalie a importância de cada funcionalidade:</label>
        <div className={styles.table}>
          {['guia_emergencia', 'videos_curtos', 'ia_sintomas', 'diario_eventos', 'comunidade_segura'].map(func => (
            <div key={func} className={styles.tableRow}>
              <span className={styles.tableLabel}>{formatTableLabel(func)}</span>
              <div className={styles.tableRadios}>
                {['Inútil', 'Pouco Útil', 'Útil', 'Muito Útil', 'Essencial'].map(level => (
                  <label key={level} title={level}>
                    <input type="radio" name={`func_${func}`} value={level} checked={formData[`func_${func}`] === level} onChange={() => handleRadioChange(`func_${func}`, level)} />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderExperienciaStep = () => (
    <div className={styles.formStep}>
        <h2>Sua Experiência Hospitalar</h2>
        <div className={styles.inputGroup}>
            <label>1. Seu filho já foi intubado?</label>
            <div className={styles.radioGroup}>
                {['Sim, mais de uma vez', 'Sim, apenas uma vez', 'Não, nunca precisou', 'Não tenho certeza'].map(o => <RadioOption key={o} name="filhoIntubado" value={o} checked={formData.filhoIntubado === o} onChange={handleRadioChange} />)}
            </div>
        </div>
        <div className={styles.inputGroup}>
            <label>6. Já pensou em comprar algum dispositivo de via aérea mas não soube como?</label>
            <div className={styles.radioGroup}>
                {['Sim, várias vezes', 'Sim, apenas uma vez', 'Não, nunca precisei', 'Não sabia que era possível comprar por conta própria'].map(o => <RadioOption key={o} name="pensouComprarDispositivo" value={o} checked={formData.pensouComprarDispositivo === o} onChange={handleRadioChange} />)}
            </div>
        </div>
    </div>
  );
  
  const renderCuidadosGeraisStep = () => (
    <div className={styles.formStep}>
        <h2>Cuidados Respiratórios</h2>
        <p className={styles.sectionDescription}>Embora o foco principal do nosso app seja para crianças com traqueostomia, sua opinião ainda é importante.</p>
        <div className={styles.inputGroup}>
            <label>5. Você cuida de alguma criança que precise de cuidados respiratórios complexos (oxigênio, aspirador), mesmo sem traqueostomia?</label>
            <div className={styles.radioGroup}>
                <RadioOption name="cuidaOutraCondicao" value="Sim" checked={formData.cuidaOutraCondicao === 'Sim'} onChange={handleRadioChange} />
                <RadioOption name="cuidaOutraCondicao" value="Não" checked={formData.cuidaOutraCondicao === 'Não'} onChange={handleRadioChange} />
            </div>
        </div>
        <div className={styles.inputGroup}>
            <label>6. Você acredita que um app com guias de saúde e organização seria útil para cuidadores de crianças com outras condições complexas?</label>
            <div className={styles.radioGroup}>
                {['Sim, com certeza seria muito útil.', 'Talvez, dependendo da condição.', 'Não, acho que não seria necessário.'].map(o => <RadioOption key={o} name="utilidadeOutrasCondicoes" value={o} checked={formData.utilidadeOutrasCondicoes === o} onChange={handleRadioChange} />)}
            </div>
        </div>
    </div>
  );

  const renderFinalizacaoStep = () => (
    <div className={styles.formStep}>
      <h2>Estamos quase lá!</h2>
      <p className={styles.sectionDescription}>Suas respostas são confidenciais e nos ajudarão imensamente. Clique em &quot;Enviar&quot; para concluir.</p>
    </div>
  );

  const RadioOption = ({ name, value, checked, onChange }: { name: keyof FormData, value: string, checked: boolean, onChange: (name: keyof FormData, value: string) => void }) => (
    <label className={`${styles.radioLabel} ${checked ? styles.checked : ''}`}>
      <input type="radio" name={name as string} value={value} checked={checked} onChange={() => onChange(name, value)} />
      {value}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.stepperContainer}>
        <div className={styles.stepperLine} style={{ width: `${(step / (totalSteps - 1)) * 100}%` }}></div>
        {stepsConfig.map((s, index) => (
          <div key={s.name} className={`${styles.stepItem} ${index <= step ? styles.active : ''}`}>
            <div className={styles.stepDot}></div>
            <div className={styles.stepLabel}>{s.name}</div>
          </div>
        ))}
      </div>
      
      <div className={styles.formContent}>
        {renderStepContent()}
      </div>

      <div className={styles.navigationButtons}>
        <button type="button" onClick={prevStep} className={styles.prevButton} disabled={step === 0}>
          Anterior
        </button>
        {step < totalSteps - 1 ? (
          <button type="button" onClick={nextStep} className={styles.nextButton} disabled={step === 0 && !formData.usaTraqueostomia}>
            Próximo
          </button>
        ) : (
           <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar Respostas'}
          </button>
        )}
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </form>
  );
}