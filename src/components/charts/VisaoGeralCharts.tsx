"use client";
import React from "react";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

interface ChartEntry {
  name: string;
  value: number;
}

interface VisaoGeralChartsProps {
  processedData: {
    momentosUsoData: ChartEntry[];
    medosData: ChartEntry[];
    buscaInfoData: ChartEntry[];
    beneficiosData: ChartEntry[];
  } | null;
}

interface CustomizedYAxisTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
}

const CustomizedYAxisTick: React.FunctionComponent<CustomizedYAxisTickProps> = (
  props
) => {
  const { x, y, payload } = props;

  if (typeof x !== "number" || typeof y !== "number" || !payload) {
    return null;
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={4} textAnchor="start" fill="#666" fontSize={12}>
        {payload.value}
      </text>
    </g>
  );
};

const VisaoGeralCharts = ({ processedData }: VisaoGeralChartsProps) => {
  if (!processedData) {
    return null;
  }

  return (
    <>
      <ChartCard
        title="Momentos de Maior Uso do App"
        tooltipText="Agrupamento de respostas da pergunta: 'Em qual destes momentos você acredita que MAIS usaria o VAP-App?'"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData.momentosUsoData}
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
            <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Principais Medos em Emergência"
        tooltipText="Agrupamento de respostas da pergunta: 'Pensando em momentos de crise, qual é o seu maior medo?'"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData.medosData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
            >
              {processedData.medosData?.map(
                (_entry: ChartEntry, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                )
              )}
            </Pie>
            <Tooltip />
            <Legend iconSize={10} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Onde Buscam Informação"
        tooltipText="Agrupamento de respostas da pergunta: 'Quando tem uma dúvida, onde você busca informação primeiro?'"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData.buscaInfoData}
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
            <Bar dataKey="value" fill="#00C49F" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Principais Benefícios Esperados"
        tooltipText="Agrupamento de respostas da pergunta: 'Qual seria o maior benefício que um aplicativo como o VAP-App poderia trazer para a sua vida?'"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData.beneficiosData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
            >
              {processedData.beneficiosData?.map(
                (_entry: ChartEntry, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                )
              )}
            </Pie>
            <Tooltip />
            <Legend iconSize={10} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </>
  );
};

export default VisaoGeralCharts;
