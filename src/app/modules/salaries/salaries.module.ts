import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalariesRoutingModule } from './salaries-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '@shared/shared.module';
import { SalariesChartComponent } from './components/salaries-chart/salaries-chart.component';
import { AddSalaryComponent } from './components/add-salary/add-salary.component';
import { SalariesByGradesChartComponent } from './components/salaries-by-grades-chart/salaries-by-grades-chart.component';
import { SalaryBlockValueComponent } from './components/salaries-chart/salary-block-value/salary-block-value.component';
import { SalaryBlockRemoteValueComponent } from './components/salaries-chart/salary-block-remote-value/salary-block-remote-value.component';
import { SalaryChartGlobalFiltersComponent } from './components/salaries-chart/salary-chart-global-filters/salary-chart-global-filters.component';
import { EditSalaryComponent } from './components/edit-salary/edit-salary.component';
import { CitiesDoughnutChartComponent } from './components/cities-doughnut-chart/cities-doughnut-chart.component';
import { GradesMinMaxChartComponent } from './components/grades-min-max-salaries-chart/grades-min-max-chart.component';
import { SalariesSkillsChartComponent } from './components/salaries-skills-chart/salaries-skills-chart.component';

@NgModule({
  declarations: [
    SalariesChartComponent,
    AddSalaryComponent,
    EditSalaryComponent,
    SalariesByGradesChartComponent,
    SalaryBlockValueComponent,
    SalaryBlockRemoteValueComponent,
    SalaryChartGlobalFiltersComponent,
    CitiesDoughnutChartComponent,
    GradesMinMaxChartComponent,
    SalariesByGradesChartComponent,
    SalariesSkillsChartComponent,
  ],
  imports: [
    CommonModule,
    SalariesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class SalariesModule { }
