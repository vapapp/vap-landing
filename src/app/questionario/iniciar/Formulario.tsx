"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useQuestionarioForm } from "@/hooks/useQuestionarioForm";
import Toast from "@/components/ui/Toast";
import styles from "./Questionario.module.css";
import { type FormData } from "@/types";
import {
  nivelEstudoOptions,
  parentescoOptions,
  maiorMedoOptions,
  riscoGraveOptions,
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
  apoioComunidadeOptions,
} from "./constants";

const RadioOption = ({
  name,
  value,
  checked,
  onChange,
}: {
  name: keyof FormData;
  value: string;
  checked: boolean;
  onChange: (name: keyof FormData, value: string) => void;
}) => (
  <label className={`${styles.radioLabel} ${checked ? styles.checked : ""}`}>
    <input
      type="radio"
      name={name as string}
      value={value}
      checked={checked}
      onChange={() => onChange(name, value)}
    />
    {value}
  </label>
);

const CheckboxOption = ({
  name,
  value,
  checked,
  onChange,
}: {
  name: keyof FormData;
  value: string;
  checked: boolean;
  onChange: (name: keyof FormData, value: string) => void;
}) => (
  <label className={`${styles.radioLabel} ${checked ? styles.checked : ""}`}>
    <input
      type="checkbox"
      name={name as string}
      value={value}
      checked={checked}
      onChange={() => onChange(name, value)}
      className={styles.multiCheckbox}
    />
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
    handleCheckboxChange,
    handleMultiCheckboxChange,
    handleCepChange,
    fetchAddressFromCEP,
    nextStep,
    prevStep,
    handleSubmit,
    clearError,
  } = useQuestionarioForm();

  const stepperWrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const stickyPlaceholderRef = useRef<HTMLDivElement>(null);

  const prevStepRef = useRef(step);

  useEffect(() => {
    const trigger = triggerRef.current;
    const stepper = stepperWrapperRef.current;
    const placeholder = stickyPlaceholderRef.current;

    if (!trigger || !stepper || !placeholder) return;

    const handler = ([entry]: IntersectionObserverEntry[]) => {
      const isSticky = !entry.isIntersecting;

      stepper.classList.toggle(styles.sticky, isSticky);

      placeholder.style.height = isSticky ? `${stepper.offsetHeight}px` : "0px";
    };

    const observer = new IntersectionObserver(handler, {
      threshold: 0,
      rootMargin: "0px",
    });

    observer.observe(trigger);

    return () => observer.disconnect();
  }, [formData.usaTraqueostomia]);

  useEffect(() => {
    if (step > prevStepRef.current) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    prevStepRef.current = step;
  }, [step]);

  if (isSubmitted) {
    return (
      <div className={styles.thankYouContainer}>
        <div className={styles.thankYouIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2 className={styles.thankYouTitle}>Muito obrigado!</h2>
        <p className={styles.thankYouText}>
          Sua colaboração é fundamental para construirmos uma ferramenta que
          realmente faça a diferença na vida de muitas famílias. Agradecemos
          imensamente pelo seu tempo e dedicação.
        </p>
      </div>
    );
  }

  const renderPerfilStep = () => (
    <div className={styles.formStep}>
      <h2>Seu Perfil</h2>
      <p className={styles.sectionDescription}>
        Primeiro, algumas perguntas rápidas para entendermos seu perfil. Todas
        as perguntas são obrigatórias.
      </p>
      <div className={styles.inputGroup}>
        <label>1. Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome || ""}
          onChange={handleInputChange}
          placeholder="Seu nome completo"
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>2. E-mail ou Telefone</label>
        <input
          type="text"
          name="contato"
          value={formData.contato || ""}
          onChange={handleInputChange}
          placeholder="Seu melhor contato para futuras pesquisas"
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>3. CEP</label>
        <input
          type="text"
          name="cep"
          value={formData.cep || ""}
          onChange={handleCepChange}
          onBlur={(e) => fetchAddressFromCEP(e.target.value)}
          placeholder="00000-000"
          maxLength={9}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>4. Qual seu nível de estudo?</label>
        <div className={styles.radioGroup}>
          {nivelEstudoOptions.map((o) => (
            <RadioOption
              key={o}
              name="nivelEstudo"
              value={o}
              checked={formData.nivelEstudo === o}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>5. A criança que você cuida utiliza traqueostomia?</label>
        <div className={styles.radioGroup}>
          <RadioOption
            name="usaTraqueostomia"
            value="Sim"
            checked={formData.usaTraqueostomia === "Sim"}
            onChange={handleRadioChange}
          />
          <RadioOption
            name="usaTraqueostomia"
            value="Não"
            checked={formData.usaTraqueostomia === "Não"}
            onChange={handleRadioChange}
          />
        </div>
      </div>

      <div className={styles.consentGroup}>
        <label className={styles.consentLabel}>
          <input
            type="checkbox"
            name="aceitouTermosPesquisa"
            checked={!!formData.aceitouTermosPesquisa}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
          />
          <span>
            Li e concordo com os{" "}
            <Link
              href="/termos-de-pesquisa"
              target="_blank"
              className={styles.consentLink}
            >
              termos da pesquisa
            </Link>
            . (Obrigatório)
          </span>
        </label>
      </div>
      <div className={styles.consentGroup}>
        <label className={styles.consentLabel}>
          <input
            type="checkbox"
            name="aceitouContatoFuturo"
            checked={!!formData.aceitouContatoFuturo}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
          />
          <span>
            Aceito receber e-mails com novidades sobre o VAP-App e futuras
            pesquisas. (Opcional)
          </span>
        </label>
      </div>
    </div>
  );

  const renderIntubacaoQuestions = () => (
    <>
      <div className={styles.inputGroup}>
        <label>Seu filho já foi intubado?</label>
        <div className={styles.radioGroup}>
          {filhoIntubadoOptions.map((o) => (
            <RadioOption
              key={o}
              name="filhoIntubado"
              value={o}
              checked={formData.filhoIntubado === o}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>
      {formData.filhoIntubado && !formData.filhoIntubado.startsWith("Não") && (
        <>
          <div className={styles.inputGroup}>
            <label>
              Antes da intubação, você sabia que existiam riscos para a criança?
            </label>
            <div className={styles.radioGroup}>
              {sabiaRiscosIntubacaoOptions.map((o) => (
                <RadioOption
                  key={o}
                  name="sabiaRiscosIntubacao"
                  value={o}
                  checked={formData.sabiaRiscosIntubacao === o}
                  onChange={handleRadioChange}
                />
              ))}
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>
              Durante a internação, alguém explicou para você os riscos da
              traqueostomia?
            </label>
            <div className={styles.radioGroup}>
              {explicaramRiscosTQTOptions.map((o) => (
                <RadioOption
                  key={o}
                  name="explicaramRiscosTQT"
                  value={o}
                  checked={formData.explicaramRiscosTQT === o}
                  onChange={handleRadioChange}
                />
              ))}
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>
              Qual foi o seu principal medo ao ver seu filho intubado?
            </label>
            <div className={styles.radioGroup}>
              {medoIntubacaoOptions.map((o) => (
                <RadioOption
                  key={o}
                  name="medoIntubacao"
                  value={o}
                  checked={formData.medoIntubacao === o}
                  onChange={handleRadioChange}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );

  const renderDesafiosStep = () => (
    <div className={styles.formStep}>
      <h2>Sua Realidade e Maiores Desafios</h2>
      <p className={styles.sectionDescription}>
        Queremos entender quem são os cuidadores e os desafios que enfrentam no
        dia a dia.
      </p>
      <div className={styles.inputGroup}>
        <label>Qual seu principal parentesco com a criança?</label>
        <div className={styles.radioGroup}>
          {parentescoOptions.map((o) => (
            <RadioOption
              key={o}
              name="parentesco"
              value={o}
              checked={formData.parentesco === o}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>Pensando em momentos de crise, qual é o seu maior medo?</label>
        <div className={styles.radioGroup}>
          {maiorMedoOptions.map((o) => (
            <RadioOption
              key={o}
              name="maiorMedo"
              value={o}
              checked={formData.maiorMedo === o}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>
          Das situações de risco abaixo, qual mais te preocupa no dia a dia?
        </label>
        <p className={styles.questionSubtitle}>
          Esta pergunta nos ajuda a entender as maiores emergências que
          cuidadores enfrentam.
        </p>
        <div className={styles.radioGroup}>
          {riscoGraveOptions.map((o) => (
            <RadioOption
              key={o}
              name="riscoGrave"
              value={o}
              checked={formData.riscoGrave === o}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>Com que frequência você se sente sozinho(a) e sem apoio?</label>
        <div className={styles.radioGroup}>
          {sentimentoApoioOptions.map((o) => (
            <RadioOption
              key={o}
              name="sentimentoApoio"
              value={o}
              checked={formData.sentimentoApoio === o}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>
          Como você avalia sua confiança hoje no cuidado da traqueostomia?
        </label>
        <div className={styles.radioGroup}>
          {confiancaCuidadoOptions.map((o) => (
            <RadioOption
              key={o}
              name="confiancaCuidado"
              value={o}
              checked={formData.confiancaCuidado === o}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>
          Quando tem uma dúvida, onde você busca informação primeiro?
        </label>
        <div className={styles.radioGroup}>
          {buscaInformacaoOptions.map((o) => (
            <RadioOption
              key={o}
              name="buscaInformacao"
              value={o}
              checked={formData.buscaInformacao === o}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>
      <hr className={styles.sectionDivider} />
      <h3>Sua Experiência Hospitalar</h3>
      {renderIntubacaoQuestions()}
    </div>
  );

  const renderComunidadeStep = () => (
    <div className={styles.formStep}>
      <h2>Comunidade e Apoio</h2>
      <p className={styles.sectionDescription}>
        Sua opinião sobre a criação de um espaço de troca é muito importante.
      </p>
      <div className={styles.inputGroup}>
        <label>
          Considerando os desafios que você enfrenta no cuidado diário, você se
          sentiria mais apoiado(a) fazendo parte de uma comunidade segura e
          moderada, onde pudesse:
        </label>
        <ul className={styles.benefitList}>
          <li>Trocar experiências com outros pais/cuidadores</li>
          <li>Tirar dúvidas sobre situações do dia a dia</li>
          <li>Receber apoio emocional de quem vive a mesma realidade</li>
          <li>Compartilhar conquistas e aprendizados</li>
        </ul>
        <p className={styles.questionSubtitle}>
          Qual seria seu interesse em participar?
        </p>
        <div className={styles.radioGroup}>
          {apoioComunidadeOptions.map((o) => (
            <RadioOption
              key={o}
              name="apoioComunidade"
              value={o}
              checked={formData.apoioComunidade === o}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderSolucaoStep = () => (
    <div className={styles.formStep}>
      <h2>Validando a Solução VAP-App</h2>
      <p className={styles.sectionDescription}>
        Agora, imagine um aplicativo no seu celular feito para te ajudar. O quão
        valiosas seriam as seguintes ferramentas?
      </p>
      <div className={styles.inputGroup}>
        <label>Avalie a importância de cada funcionalidade:</label>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderFunc}>Funcionalidade</div>
            <div className={styles.tableHeaderOptions}>
              {avaliacaoOptions.map((level) => (
                <span key={level}>{level}</span>
              ))}
            </div>
          </div>
          {funcionalidadesOptions.map((func) => (
            <div key={func.id} className={styles.tableRow}>
              <div className={styles.tableLabel}>
                <div>{func.label}</div>
                <div className={styles.tableDescription}>
                  {func.description}
                </div>
              </div>
              <div className={styles.tableRadios}>
                {avaliacaoOptions.map((level) => (
                  <label key={level} title={level}>
                    <input
                      type="radio"
                      name={`func_${func.id}`}
                      value={level}
                      checked={formData[`func_${func.id}`] === level}
                      onChange={() =>
                        handleRadioChange(`func_${func.id}`, level)
                      }
                    />
                    <span className={styles.tableRadioLabel}>{level}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>
          Em qual destes momentos você acredita que MAIS usaria o VAP-App?
          (Selecione até 2 opções)
        </label>
        <div className={styles.radioGroup}>
          {momentoUsoAppOptions.map((o) => (
            <CheckboxOption
              key={o}
              name="momentoUsoApp"
              value={o}
              checked={formData.momentoUsoApp?.includes(o) || false}
              onChange={handleMultiCheckboxChange}
            />
          ))}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>
          O que seria mais importante para você em um aplicativo como este?
        </label>
        <div className={styles.radioGroup}>
          {importanciaAppOptions.map((o) => (
            <RadioOption
              key={o}
              name="importanciaApp"
              value={o}
              checked={formData.importanciaApp === o}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>
          Qual seria o maior benefício que um aplicativo como o VAP-App poderia
          trazer para a sua vida?
        </label>
        <div className={styles.radioGroup}>
          {maiorBeneficioOptions.map((o) => (
            <RadioOption
              key={o}
              name="maiorBeneficio"
              value={o}
              checked={formData.maiorBeneficio === o}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderExperienciaSimTQTStep = () => (
    <div className={styles.formStep}>
      <h2>Sua Experiência e Acesso</h2>
      <p className={styles.sectionDescription}>
        Sua perspectiva sobre o acesso a materiais e a importância da comunidade
        é fundamental para nós.
      </p>
      <div className={styles.inputGroup}>
        <label>
          Você acha importante que a voz das famílias seja ouvida para criar
          políticas públicas de cuidado?
        </label>
        <div className={styles.radioGroup}>
          {importanciaVozFamiliasOptions.map((o) => (
            <RadioOption
              key={o}
              name="importanciaVozFamilias"
              value={o}
              checked={formData.importanciaVozFamilias === o}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>
          Já pensou em comprar algum dispositivo de via aérea, mas não soube
          como?
        </label>
        <div className={styles.radioGroup}>
          {pensouComprarDispositivoOptions.map((o) => (
            <RadioOption
              key={o}
              name="pensouComprarDispositivo"
              value={o}
              checked={formData.pensouComprarDispositivo === o}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>

      {formData.pensouComprarDispositivo &&
        formData.pensouComprarDispositivo !== "Não, nunca precisei" &&
        formData.pensouComprarDispositivo !==
          "Não sabia que era possível comprar por conta própria" && (
          <div className={styles.inputGroup}>
            <label>
              Se já pensou em comprar, qual foi a maior dificuldade?
            </label>
            <div className={styles.radioGroup}>
              {dificuldadeCompraOptions.map((o) => (
                <RadioOption
                  key={o}
                  name="dificuldadeCompra"
                  value={o}
                  checked={formData.dificuldadeCompra === o}
                  onChange={handleRadioChange}
                />
              ))}
            </div>
          </div>
        )}
    </div>
  );

  const renderCuidadosGeraisStep = () => (
    // Para quem respondeu NÃO TQT
    <div className={styles.formStep}>
      <h2>Cuidados Respiratórios</h2>
      <p className={styles.sectionDescription}>
        Agora, algumas perguntas sobre o cenário de cuidados respiratórios que
        você vivencia.
      </p>
      <div className={styles.inputGroup}>
        <label>
          Você cuida de alguma criança que precise de cuidados respiratórios
          complexos (oxigênio, aspirador), mesmo sem traqueostomia?
        </label>
        <div className={styles.radioGroup}>
          <RadioOption
            name="cuidaOutraCondicao"
            value="Sim"
            checked={formData.cuidaOutraCondicao === "Sim"}
            onChange={handleRadioChange}
          />
          <RadioOption
            name="cuidaOutraCondicao"
            value="Não"
            checked={formData.cuidaOutraCondicao === "Não"}
            onChange={handleRadioChange}
          />
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>
          Você acredita que um app com guias de saúde e organização seria útil
          para cuidadores de crianças com outras condições complexas?
        </label>
        <div className={styles.radioGroup}>
          {utilidadeOutrasCondicoesOptions.map((o) => (
            <RadioOption
              key={o}
              name="utilidadeOutrasCondicoes"
              value={o}
              checked={formData.utilidadeOutrasCondicoes === o}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderExperienciaNaoTQTStep = () => (
   
    <div className={styles.formStep}>
      <h2>Sua Experiência Hospitalar</h2>
      <p className={styles.sectionDescription}>
        Para entendermos melhor o contexto, gostaríamos de saber um pouco sobre
        sua experiência durante períodos de internação.
      </p>
      {renderIntubacaoQuestions()}
    </div>
  );

  const renderFinalizacaoStep = () => (
    <div className={styles.formStep}>
      <h2>Estamos quase lá!</h2>
      <p className={styles.sectionDescription}>
        Suas respostas são confidenciais e nos ajudarão imensamente. Clique em
        &quot;Enviar&quot; para concluir.
      </p>
    </div>
  );

  const renderStepContent = () => {
    switch (formData.usaTraqueostomia) {
      case "Sim":
        switch (step) {
          case 0:
            return renderPerfilStep();
          case 1:
            return renderDesafiosStep();
          case 2:
            return renderComunidadeStep();
          case 3:
            return renderSolucaoStep();
          case 4:
            return renderExperienciaSimTQTStep();
          case 5:
            return renderFinalizacaoStep();
          default:
            return null;
        }
      case "Não":
        switch (step) {
          case 0:
            return renderPerfilStep();
          case 1:
            return renderCuidadosGeraisStep();
          case 2:
            return renderExperienciaNaoTQTStep();
          case 3:
            return renderFinalizacaoStep();
          default:
            return null;
        }
      default:
        return renderPerfilStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {error && <Toast message={error} onClose={clearError} />}

      <div ref={triggerRef} />

      {formData.usaTraqueostomia && (
        <div ref={stepperWrapperRef} className={styles.stepperWrapper}>
          <div className={styles.stepperContainer}>
            <div
              className={styles.stepperLine}
              style={{ width: `${(step / (totalSteps - 1)) * 100}%` }}
            ></div>
            {stepsConfig.map((s, index) => (
              <div
                key={s.name}
                className={`${styles.stepItem} ${
                  index <= step ? styles.active : ""
                }`}
              >
                <div className={styles.stepDot}></div>
                <div className={styles.stepLabel}>{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div ref={stickyPlaceholderRef} className={styles.stickyPlaceholder} />

      <div className={styles.formContent}>{renderStepContent()}</div>

      <div className={styles.navigationButtons}>
        {step > 0 && (
          <button
            type="button"
            onClick={prevStep}
            className={styles.prevButton}
          >
            Anterior
          </button>
        )}
        {step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            className={styles.nextButton}
            disabled={
              (step === 0 && !formData.usaTraqueostomia) ||
              (step === 0 && !formData.aceitouTermosPesquisa)
            }
          >
            Próximo
          </button>
        ) : (
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar Respostas"}
          </button>
        )}
      </div>
    </form>
  );
}
