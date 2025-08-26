"use client";

import { useQuestionarioForm } from '@/hooks/useQuestionarioForm';
import styles from './Questionario.module.css';
import {
  nivelEstudoOptions,
  parentescoOptions,
  maiorMedoOptions,
  sentimentoApoioOptions,
  confiancaCuidadoOptions,
  buscaInformacaoOptions,
  momentoUsoAppOptions,
  importanciaAppOptions,
  maiorBeneficioOptions,
  filhoIntubadoOptions,
  sabiaRiscosIntubacaoOptions,
  explicaramRiscosTQTOptions,
  medoIntubacaoOptions,
  importanciaVozFamiliasOptions,
  pensouComprarDispositivoOptions,
  dificuldadeCompraOptions,
  utilidadeOutrasCondicoesOptions,
  funcionalidadesOptions,
  avaliacaoOptions,
  type FormData,
} from './constants';


const RadioOption = ({ name, value, checked, onChange }: { name: keyof FormData; value: string; checked: boolean; onChange: (name: keyof FormData, value: string) => void; }) => (
  <label className={`${styles.radioLabel} ${checked ? styles.checked : ''}`}>
    <input type="radio" name={name as string} value={value} checked={checked} onChange={() => onChange(name, value)} />
    {value}
  </label>
);

export default function Formulario() {
  const {
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
  } = useQuestionarioForm();


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

 
  const renderPerfilStep = () => (
    <div className={styles.formStep}>
      <h2>Seu Perfil</h2>
      <div className={styles.inputGroup}>
        <label>1. Nome</label>
        <input type="text" name="nome" value={formData.nome || ''} onChange={handleInputChange} placeholder="Seu nome completo" required />
      </div>
      <div className={styles.inputGroup}>
        <label>2. E-mail ou Telefone</label>
        <input type="text" name="contato" value={formData.contato || ''} onChange={handleInputChange} placeholder="Seu melhor contato para futuras pesquisas" required />
      </div>
      <div className={styles.inputGroup}>
        <label>3. Qual seu nível de estudo?</label>
        <div className={styles.radioGroup}>
          {nivelEstudoOptions.map(o => <RadioOption key={o} name="nivelEstudo" value={o} checked={formData.nivelEstudo === o} onChange={handleRadioChange} />)}
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
          {parentescoOptions.map(o => <RadioOption key={o} name="parentesco" value={o} checked={formData.parentesco === o} onChange={handleRadioChange} />)}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>6. Pensando em momentos de crise, qual é o seu maior medo?</label>
        <div className={styles.radioGroup}>
          {maiorMedoOptions.map(o => <RadioOption key={o} name="maiorMedo" value={o} checked={formData.maiorMedo === o} onChange={handleRadioChange} />)}
        </div>
      </div>
       <div className={styles.inputGroup}>
        <label>7. Com que frequência você se sente sozinho(a) e sem apoio?</label>
        <div className={styles.radioGroup}>
          {sentimentoApoioOptions.map(o => <RadioOption key={o} name="sentimentoApoio" value={o} checked={formData.sentimentoApoio === o} onChange={handleRadioChange} />)}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>8. Como você avalia sua confiança hoje no cuidado da traqueostomia?</label>
        <div className={styles.radioGroup}>
          {confiancaCuidadoOptions.map(o => <RadioOption key={o} name="confiancaCuidado" value={o} checked={formData.confiancaCuidado === o} onChange={handleRadioChange} />)}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>9. Quando tem uma dúvida, onde você busca informação primeiro?</label>
        <div className={styles.radioGroup}>
          {buscaInformacaoOptions.map(o => <RadioOption key={o} name="buscaInformacao" value={o} checked={formData.buscaInformacao === o} onChange={handleRadioChange} />)}
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
          {funcionalidadesOptions.map(func => (
            <div key={func.id} className={styles.tableRow}>
              <span className={styles.tableLabel}>{func.label}</span>
              <div className={styles.tableRadios}>
                {avaliacaoOptions.map(level => (
                  <label key={level} title={level}>
                    <input type="radio" name={`func_${func.id}`} value={level} checked={formData[`func_${func.id}`] === level} onChange={() => handleRadioChange(`func_${func.id}`, level)} />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>11. Em qual destes momentos você acredita que MAIS usaria o VAP-App?</label>
        <div className={styles.radioGroup}>
          {momentoUsoAppOptions.map(o => <RadioOption key={o} name="momentoUsoApp" value={o} checked={formData.momentoUsoApp === o} onChange={handleRadioChange} />)}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>12. O que seria mais importante para você em um aplicativo como este?</label>
        <div className={styles.radioGroup}>
          {importanciaAppOptions.map(o => <RadioOption key={o} name="importanciaApp" value={o} checked={formData.importanciaApp === o} onChange={handleRadioChange} />)}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>13. Qual seria o maior benefício que um aplicativo como o VAP-App poderia trazer para a sua vida?</label>
        <div className={styles.radioGroup}>
          {maiorBeneficioOptions.map(o => <RadioOption key={o} name="maiorBeneficio" value={o} checked={formData.maiorBeneficio === o} onChange={handleRadioChange} />)}
        </div>
      </div>
    </div>
  );

  const renderExperienciaSimTQTStep = () => (
    <div className={styles.formStep}>
        <h2>Sua Experiência e Acesso</h2>
        <div className={styles.inputGroup}>
            <label>1. Você acha importante que a voz das famílias seja ouvida para criar políticas públicas de cuidado?</label>
            <div className={styles.radioGroup}>
                {importanciaVozFamiliasOptions.map(o => <RadioOption key={o} name="importanciaVozFamilias" value={o} checked={formData.importanciaVozFamilias === o} onChange={handleRadioChange} />)}
            </div>
        </div>
        <div className={styles.inputGroup}>
            <label>2. Já pensou em comprar algum dispositivo de via aérea, mas não soube como?</label>
            <div className={styles.radioGroup}>
                {pensouComprarDispositivoOptions.map(o => <RadioOption key={o} name="pensouComprarDispositivo" value={o} checked={formData.pensouComprarDispositivo === o} onChange={handleRadioChange} />)}
            </div>
        </div>
        
        {formData.pensouComprarDispositivo && formData.pensouComprarDispositivo !== 'Não, nunca precisei' && formData.pensouComprarDispositivo !== 'Não sabia que era possível comprar por conta própria' && (
            <div className={styles.inputGroup}>
                <label>3. Se já pensou em comprar, qual foi a maior dificuldade?</label>
                <div className={styles.radioGroup}>
                    {dificuldadeCompraOptions.map(o => <RadioOption key={o} name="dificuldadeCompra" value={o} checked={formData.dificuldadeCompra === o} onChange={handleRadioChange} />)}
                </div>
            </div>
        )}
    </div>
  );
  
  const renderExperienciaNaoTQTStep = () => (
    <div className={styles.formStep}>
        <h2>Sua Experiência Hospitalar</h2>
        <div className={styles.inputGroup}>
            <label>1. Seu filho já foi intubado?</label>
            <div className={styles.radioGroup}>
                {filhoIntubadoOptions.map(o => <RadioOption key={o} name="filhoIntubado" value={o} checked={formData.filhoIntubado === o} onChange={handleRadioChange} />)}
            </div>
        </div>
       
        {formData.filhoIntubado && !formData.filhoIntubado.startsWith('Não') && (
            <>
                <div className={styles.inputGroup}>
                    <label>2. Antes da intubação, você sabia que existiam riscos para a criança?</label>
                    <div className={styles.radioGroup}>
                        {sabiaRiscosIntubacaoOptions.map(o => <RadioOption key={o} name="sabiaRiscosIntubacao" value={o} checked={formData.sabiaRiscosIntubacao === o} onChange={handleRadioChange} />)}
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label>3. Durante a internação, alguém explicou para você os riscos da traqueostomia?</label>
                    <div className={styles.radioGroup}>
                        {explicaramRiscosTQTOptions.map(o => <RadioOption key={o} name="explicaramRiscosTQT" value={o} checked={formData.explicaramRiscosTQT === o} onChange={handleRadioChange} />)}
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label>4. Qual foi o seu principal medo ao ver seu filho intubado?</label>
                    <div className={styles.radioGroup}>
                        {medoIntubacaoOptions.map(o => <RadioOption key={o} name="medoIntubacao" value={o} checked={formData.medoIntubacao === o} onChange={handleRadioChange} />)}
                    </div>
                </div>
            </>
        )}
    </div>
  );

  const renderCuidadosGeraisStep = () => (
    <div className={styles.formStep}>
        <h2>Cuidados Respiratórios</h2>
        <p className={styles.sectionDescription}>Sua opinião ainda é muito importante para entendermos outros cenários de cuidado.</p>
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
                {utilidadeOutrasCondicoesOptions.map(o => <RadioOption key={o} name="utilidadeOutrasCondicoes" value={o} checked={formData.utilidadeOutrasCondicoes === o} onChange={handleRadioChange} />)}
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


  const renderStepContent = () => {
    if (formData.usaTraqueostomia === 'Não') {
      switch (step) {
        case 0: return renderPerfilStep();
        case 1: return renderCuidadosGeraisStep();
        case 2: return renderExperienciaNaoTQTStep();
        case 3: return renderFinalizacaoStep();
        default: return null;
      }
    }

    switch (step) {
      case 0: return renderPerfilStep();
      case 1: return renderDesafiosStep();
      case 2: return renderSolucaoStep();
      case 3: return renderExperienciaSimTQTStep();
      case 4: return renderFinalizacaoStep();
      default: return null;
    }
  };

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