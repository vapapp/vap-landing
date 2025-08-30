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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

interface ChartEntry {
  name: string;
  value: number;
}

interface AcessoChartsProps {
  processedData: {
    vozFamiliasData: ChartEntry[];
    pensouComprarData: ChartEntry[];
    dificuldadeCompraData: ChartEntry[];
  };
}

const AcessoCharts = ({ processedData }: AcessoChartsProps) => {
  return (
    <>
      <ChartCard
        title="Importância da Voz das Famílias"
        tooltipText="Agrupamento de respostas da pergunta: 'Você acha importante que a voz das famílias seja ouvida para criar políticas públicas de cuidado?'"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData.vozFamiliasData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
            >
              {processedData.vozFamiliasData.map((_entry, index) => (
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

      <ChartCard
        title="Considerou Comprar Dispositivo"
        tooltipText="Agrupamento de respostas da pergunta: 'Já pensou em comprar algum dispositivo de via aérea, mas não soube como?'"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData.pensouComprarData}>
            <XAxis
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval={0}
            />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {processedData.dificuldadeCompraData.length > 0 && (
        <ChartCard
          title="Principais Dificuldades na Compra"
          tooltipText="Agrupamento de respostas da pergunta: 'Se já pensou em comprar, qual foi a maior dificuldade?' (Mostrado apenas se houver respostas)"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={processedData.dificuldadeCompraData}>
              <XAxis
                dataKey="name"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                interval={0}
              />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#ffc658" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      )}
    </>
  );
};

export default AcessoCharts;
