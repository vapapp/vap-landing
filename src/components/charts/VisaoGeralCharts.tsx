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

interface VisaoGeralChartsProps {
  processedData: {
    momentosUsoData: ChartEntry[];
    medosData: ChartEntry[];
    buscaInfoData: ChartEntry[];
    beneficiosData: ChartEntry[];
  };
}

const VisaoGeralCharts = ({ processedData }: VisaoGeralChartsProps) => {
  return (
    <>
      <ChartCard title="Momentos de Maior Uso do App">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData.momentosUsoData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 100, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={150}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip cursor={{ fill: "#f7fafc" }} />
            <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Principais Medos em Emergência">
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

      <ChartCard title="Onde Buscam Informação">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData.buscaInfoData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 100, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={150}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip cursor={{ fill: "#f7fafc" }} />
            <Bar dataKey="value" fill="#00C49F" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Principais Benefícios Esperados">
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
