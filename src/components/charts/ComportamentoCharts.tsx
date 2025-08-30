"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import ChartCard from "@/components/ui/ChartCard";
import InsightCard from "@/components/ui/InsightCard";
import StatusChart from "@/components/charts/StatusChart";
import styles from "@/app/admin/dashboard/Dashboard.module.css";
import { Submission } from "@/types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

interface ChartEntry {
  name: string;
  value: number;
}

interface ComportamentoChartsProps {
  processedData: {
    solidaoData: ChartEntry[];
    intubacaoData: ChartEntry[];
    riscoGraveData: ChartEntry[];
    apoioComunidadeData: ChartEntry[];
    insightUsoDiario: number;
    insightUsoEmergencia: number;
    insightAcreditamUtil: number;
  };
  submissions: Submission[];
}
interface CustomizedYAxisTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
}

const CustomizedYAxisTick = ({ x, y, payload }: CustomizedYAxisTickProps) => {
  if (typeof x !== "number" || typeof y !== "number" || !payload) {
    return null;
  }
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={4} textAnchor="end" fill="#666" fontSize={12}>
        {payload.value.length > 25
          ? `${payload.value.substring(0, 25)}...`
          : payload.value}
      </text>
    </g>
  );
};

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

      <ChartCard
        title="Maiores Preocupações de Risco"
        tooltipText="Agrupamento de respostas da pergunta: 'Das situações de risco abaixo, qual mais te preocupa no dia a dia?'"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData.riscoGraveData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={150}
              tickLine={false}
              axisLine={false}
              interval={0}
              tick={<CustomizedYAxisTick />}
            />
            <Tooltip cursor={{ fill: "#f7fafc" }} />
            <Bar dataKey="value" fill="#ef4444" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Interesse na Comunidade de Apoio"
        tooltipText="Agrupamento de respostas da pergunta: 'Qual seria seu interesse em participar de uma comunidade de apoio?'"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData.apoioComunidadeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
            >
              {processedData.apoioComunidadeData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend iconSize={10} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className={styles.fullWidth}>
        <ChartCard title="Insights Comportamentais">
          <div className={styles.insightsGrid}>
            <InsightCard
              value={`${processedData.insightUsoDiario}%`}
              description="Usariam o app no dia a dia"
              color="blue"
              tooltipText="Percentagem de cuidadores que selecionaram 'No dia a dia, para organizar a rotina' como um dos principais momentos de uso do app."
            />
            <InsightCard
              value={`${processedData.insightUsoEmergencia}%`}
              description="Usariam o app em emergências"
              color="red"
              tooltipText="Percentagem de cuidadores que selecionaram 'Em uma emergência, para saber o que fazer rapidamente' como um dos principais momentos de uso do app."
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
