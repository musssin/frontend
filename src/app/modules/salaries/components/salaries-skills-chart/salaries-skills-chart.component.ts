import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserSalary, UserSalaryAdminDto } from '@models/salaries/salary.model';
import { SalariesSkillsChartJsObject } from './salaries-skills-chart-js-object';
import { Skill } from '@services/skills.service';

@Component({
  selector: 'app-salaries-skills-chart',
  templateUrl: './salaries-skills-chart.component.html',
  styleUrl: './salaries-skills-chart.component.scss'
})
export class SalariesSkillsChartComponent {

  @Input()
  skills: Array<Skill> = [];

  @Input()
  currentSalary: UserSalaryAdminDto | null = null;

  @Input()
  salaries: Array<UserSalary> | null = null;

  @Output()
  editSalaryActionClick = new EventEmitter<void>();

  chartDataLocal: SalariesSkillsChartJsObject | null = null;
  showNoDataArea = false;

  readonly canvasId = 'canvas_' + Math.random().toString(36).substring(7);

  constructor() {}

  ngAfterViewInit() {
    this.initChart();
  }

  openEditSalaryAction(): void {
    this.editSalaryActionClick.emit();
  }

  changeShowNoDataAreaToggler(): void {
    this.chartDataLocal?.toggleNoDataArea(this.showNoDataArea);
  }

  private initChart(): void {
    console.log('SalariesSkillsChartComponent', this.salaries, this.skills);
    if (this.salaries == null || this.salaries.length === 0 || this.skills.length === 0) {
      return;
    }

    this.chartDataLocal = new SalariesSkillsChartJsObject(this.canvasId, this.salaries, this.skills);

    var chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? '100%';
    }
  }
}
