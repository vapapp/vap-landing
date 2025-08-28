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
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
} from "recharts";
import ChartCard from "@/components/ui/ChartCard";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
];

interface ChartEntry {
  name: string;
  value: number;
}

interface DemografiaChartsProps {
  processedData: {
    escolaridadeData: ChartEntry[];
    parentescoData: ChartEntry[];
    confiancaData: ChartEntry[];
  };
}

const DemografiaCharts = ({ processedData }: DemografiaChartsProps) => {
  return (
    <>
      <ChartCard
        title="Nível de Escolaridade"
        tooltipText="Agrupamento de respostas da pergunta: 'Qual seu nível de estudo?'"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData.escolaridadeData}>
            <XAxis
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval={0}
            />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard
        title="Parentesco com a Criança"
        tooltipText="Agrupamento de respostas da pergunta: 'Qual seu principal parentesco com a criança?'"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData.parentescoData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
            >
              {processedData.parentescoData?.map(
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
        title="Nível de Confiança nos Cuidados"
        tooltipText="Agrupamento de respostas da pergunta: 'Como você avalia sua confiança hoje no cuidado da traqueostomia?'"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={processedData.confiancaData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </>
  );
};

export default DemografiaCharts;
