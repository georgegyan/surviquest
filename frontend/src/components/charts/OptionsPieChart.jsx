import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#E3A23D', '#2F5C5C', '#D9614F', '#78A09E', '#9C6820', '#4E7F7E']

export default function OptionsPieChart({ data }) {
  const points = data && data.length > 0 ? data : []

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={points}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={2}
        >
          {points.map((entry, index) => (
            <Cell key={entry.label} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#D2DFDE', fontSize: 13 }} />
        <Legend
          formatter={(value) => <span className="text-xs text-ink-500">{value}</span>}
          iconType="circle"
          iconSize={8}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
