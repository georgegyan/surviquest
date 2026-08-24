import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function ResponsesLineChart({ data }) {
  const points = data && data.length > 0 ? data : []

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={points} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D2DFDE" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: '#78A09E' }}
          tickLine={false}
          axisLine={{ stroke: '#D2DFDE' }}
        />
        <YAxis tick={{ fontSize: 12, fill: '#78A09E' }} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{ borderRadius: 12, borderColor: '#D2DFDE', fontSize: 13 }}
          labelStyle={{ color: '#152A2E', fontWeight: 600 }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#E3A23D"
          strokeWidth={3}
          dot={{ r: 3, fill: '#E3A23D' }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
