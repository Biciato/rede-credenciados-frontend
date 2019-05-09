import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

interface GenderChartData {
  doughnutChartLabels: Label[];
  doughnutChartData: MultiDataSet;
  doughnutChartType: ChartType;
}

export const GENDER_CHART_DATA: GenderChartData = {
  doughnutChartLabels: ['feminino', 'masculino'],
  doughnutChartData: [[50, 200],],
  doughnutChartType: 'doughnut'
}
