import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function QuestionBarChart({ data }) {
  const points = data && data.length > 0 ? data : []

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={points} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D2DFDE" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: '#78A09E' }}
          tickLine={false}
          axisLine={{ stroke: '#D2DFDE' }}
          interval={0}
          angle={-15}
          textAnchor="end"
          height={60}
        />
        <YAxis tick={{ fontSize: 12, fill: '#78A09E' }} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{ borderRadius: 12, borderColor: '#D2DFDE', fontSize: 13 }}
          cursor={{ fill: '#F1F4F1' }}
        />
        <Bar dataKey="value" fill="#2F5C5C" radius={[6, 6, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  )
}
