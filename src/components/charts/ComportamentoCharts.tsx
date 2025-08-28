"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "@/components/ui/ChartCard";
import InsightCard from "@/components/ui/InsightCard";
import StatusChart from "@/components/charts/StatusChart";
import styles from "@/app/admin/dashboard/Dashboard.module.css";
import { Submission } from "@/hooks/useSubmissions";

interface ChartEntry {
  name: string;
  value: number;
}

interface ComportamentoChartsProps {
  processedData: {
    solidaoData: ChartEntry[];
    intubacaoData: ChartEntry[];
    insightUsoDiario: number;
    insightUsoEmergencia: number;
    insightAcreditamUtil: number;
  };
  submissions: Submission[];
}

const ComportamentoCharts = ({
  processedData,
  submissions,
}: ComportamentoChartsProps) => {
  const naoTqtSubmissionsCount = submissions.filter(
    (s) => s.usaTraqueostomia === "Não"
  ).length;

  return (
    <>
      <ChartCard
        title="Frequência de Solidão"
        tooltipText="Agrupamento de respostas da pergunta: 'Com que frequência você se sente sozinho(a) e sem apoio?'"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData.solidaoData}>
            <XAxis
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#ff8042" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Status Intubação (Não TQT)"
        tooltipText="Agrupamento de respostas da pergunta: 'Seu filho já foi intubado?' (Apenas para cuidadores de crianças sem traqueostomia)."
      >
        <StatusChart
          data={processedData.intubacaoData || []}
          total={naoTqtSubmissionsCount}
        />
      </ChartCard>

      <div className={styles.fullWidth}>
        <ChartCard title="Insights Comportamentais">
          <div className={styles.insightsGrid}>
            <InsightCard
              value={`${processedData.insightUsoDiario}%`}
              description="Usariam o app no dia a dia"
              color="blue"
              tooltipText="Percentagem de cuidadores que selecionaram 'No dia a dia, para organizar a rotina' como o principal momento de uso do app."
            />
            <InsightCard
              value={`${processedData.insightUsoEmergencia}%`}
              description="Usariam o app em emergências"
              color="red"
              tooltipText="Percentagem de cuidadores que selecionaram 'Em uma emergência, para saber o que fazer rapidamente' como o principal momento de uso do app."
            />
            <InsightCard
              value={`${processedData.insightAcreditamUtil}%`}
              description="Acreditam que seria útil (Não TQT)"
              color="green"
              tooltipText="Percentagem de cuidadores de crianças SEM traqueostomia que responderam 'Sim, com certeza seria muito útil' para a utilidade do app em outras condições."
            />
          </div>
        </ChartCard>
      </div>
    </>
  );
};

export default ComportamentoCharts;
