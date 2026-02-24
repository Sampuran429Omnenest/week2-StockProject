import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

type Props = {
  data: { name: string; value: number }[]
}

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'
];

// Helper function to format the numbers to 2 decimal places with a % sign
const formatPercent = (value: number) => `${value.toFixed(2)}%`;

export const PortfolioPieChart = ({ data }: Props) => {
  const pieData = data.map((entry, index) => ({
    ...entry,
    fill: COLORS[index % COLORS.length]
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label={({ value }) => formatPercent(value)} // Formats the text on the chart
        />
        {/* Formats the text inside the hover box */}
        <Tooltip formatter={(value: number) => formatPercent(value)} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}