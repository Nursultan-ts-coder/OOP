import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { alpha, useTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

import AppCard from '@/shared/components/app-card';
import { useChartTheme } from '@/shared/hooks/use-chart-theme';
import { useIsChartJsReady } from '@/shared/hooks/use-is-chart-js-ready';

import type { HealthTrend as HealthTrendData } from '../../types/portal';
import { resolveToneColor } from '../../utils/status';
import { ChartBox, Legend, LegendItem, LegendSwatch, TrendNote } from './health-trend.styled';
import { uptimeAxisRange } from './uptime-axis';

interface HealthTrendProps {
  trend: HealthTrendData;
}

/**
 * The last 24 hours of each health signal. Drawn with Chart.js through grafana's chart theme
 * (`useChartTheme`); grafana's TrendsChart starts its axis at 0, which would flatten uptimes
 * that all sit between 95% and 100%, so the axis here fits the data.
 */
const HealthTrend = ({ trend }: HealthTrendProps) => {
  const theme = useTheme();
  const chartTheme = useChartTheme();
  const isChartReady = useIsChartJsReady();

  const colors = trend.series.map((series) => resolveToneColor(theme.palette, series.tone));
  const range = uptimeAxisRange(trend.series.flatMap((series) => series.values));

  const data = useMemo(
    () => ({
      labels: trend.hours,
      datasets: trend.series.map((series, index) => ({
        label: series.label,
        data: series.values,
        borderColor: colors[index],
        backgroundColor: alpha(colors[index], 0.15),
        // The first series is the one in trouble: filled and drawn thicker.
        fill: index === 0,
        borderWidth: index === 0 ? 2 : 1,
        pointRadius: 0,
        tension: 0.35,
      })),
    }),
    [trend, colors.join()]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index' as const, intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: chartTheme.tooltip.background,
          titleColor: chartTheme.tooltip.title,
          bodyColor: chartTheme.tooltip.body,
          borderColor: chartTheme.tooltip.border,
          borderWidth: 1,
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: chartTheme.tick, maxTicksLimit: 7 } },
        y: {
          min: range.min,
          max: range.max,
          grid: { color: chartTheme.grid },
          ticks: { color: chartTheme.tick, callback: (value: string | number) => `${value}%` },
        },
      },
    }),
    [chartTheme, range.min, range.max]
  );

  return (
    <AppCard title="Health trend" subtitle="Uptime, last 24 hours">
      <ChartBox>
        {isChartReady && (
          <Line
            data={data}
            options={options}
            role="img"
            aria-label={`Uptime trend: ${trend.series.map((series) => series.label).join(', ')}`}
          />
        )}
      </ChartBox>
      <Legend>
        {trend.series.map((series, index) => (
          <LegendItem key={series.label}>
            <LegendSwatch swatchColor={colors[index]} isFocal={index === 0} aria-hidden="true" />
            {series.label}
          </LegendItem>
        ))}
      </Legend>
      {trend.note && (
        <TrendNote>
          <WarningAmberIcon color="warning" fontSize="small" aria-hidden="true" />
          {trend.note}
        </TrendNote>
      )}
    </AppCard>
  );
};

export default HealthTrend;
