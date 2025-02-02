import { DeveloperGrade } from "@models/enums";
import { UserProfession } from "@models/salaries/user-profession";
import { ActivatedRouteExtended } from "@shared/routes/activated-route-extended";
import { Observable, map } from "rxjs";
import { SalaryChartGlobalFiltersData } from "./salary-chart-global-filters/global-filters-form-group";
import { ActivatedRoute } from "@angular/router";
import { KazakhstanCity } from "@models/salaries/kazakhstan-city";

export class SalariesChartActivatedRoute {

    static readonly gradeRouteParamName = 'grade';
    static readonly profsIncludeRouteParamName = 'profsInclude';
    static readonly ciiesParamName = 'cities';

    private readonly activatedRoute: ActivatedRouteExtended

    constructor(activatedRoute: ActivatedRoute) {
        this.activatedRoute = new ActivatedRouteExtended(activatedRoute);
    }

    prepareQueryParamsAsString(data: SalaryChartGlobalFiltersData): string {
        let queryParams = '?';

        if (data.grade != null) {
            queryParams += `${SalariesChartActivatedRoute.gradeRouteParamName}=${data.grade}`;
        }

        if (data.profsToInclude.length > 0) {
            const profsValue = `${SalariesChartActivatedRoute.profsIncludeRouteParamName}=${data.profsToInclude.map(x => x.toString()).join(',')}`;
            queryParams += `${queryParams.length > 1 ? '&' : ''}${profsValue}`;
        }

        if (data.cities.length > 0) {
            const citiesValue = `${SalariesChartActivatedRoute.ciiesParamName}=${data.cities.map(x => x.toString()).join(',')}`;
            queryParams += `${queryParams.length > 1 ? '&' : ''}${citiesValue}`;
        }

        return queryParams;
    }

    getQueryParams(): Observable<SalaryChartGlobalFiltersData> {
        return this.activatedRoute
            .getQueryParams([
                SalariesChartActivatedRoute.gradeRouteParamName,
                SalariesChartActivatedRoute.profsIncludeRouteParamName,
                SalariesChartActivatedRoute.ciiesParamName,
            ])
            .pipe(map(queryParams => {
                const gradeString = queryParams
                    .find(x => x.key === SalariesChartActivatedRoute.gradeRouteParamName)
                    ?.value ?? null;

                let grade: DeveloperGrade | null = null;

                if (gradeString != null && gradeString !== '' && gradeString !== 'null') {
                    grade = Number(gradeString) as DeveloperGrade;
                }

                let profsInclude: Array<UserProfession> = [];
                const profsToIncludeValue = queryParams
                    .find(x => x.key === SalariesChartActivatedRoute.profsIncludeRouteParamName)
                    ?.value ?? null;

                if (profsToIncludeValue && profsToIncludeValue !== '') {
                    profsInclude = profsToIncludeValue.split(',').map(x => Number(x) as UserProfession);
                }

                let cities: Array<KazakhstanCity> = [];
                const citiesValue = queryParams
                    .find(x => x.key === SalariesChartActivatedRoute.ciiesParamName)
                    ?.value ?? null;

                if (citiesValue && citiesValue !== '') {
                    cities = citiesValue.split(',').map(x => Number(x) as KazakhstanCity);
                }

                return new SalaryChartGlobalFiltersData(grade, profsInclude, cities);
            }));
    }
}