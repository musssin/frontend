import { formatNumber } from "@angular/common";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeveloperGrade } from "@models/enums";
import { CompanyType } from "@models/salaries/company-type";
import { Currency } from "@models/salaries/currency";
import { KazakhstanCity } from "@models/salaries/kazakhstan-city";
import { UserSalary } from "@models/salaries/salary.model";
import { UserProfession } from "@models/salaries/user-profession";
import { CreateUserSalaryRequest } from "@services/user-salaries.service";

export class AddSalaryForm extends FormGroup {

static readonly digitsPattern = '^[0-9]*$';

    constructor(private readonly salarytoBeEdited: UserSalary | null = null) {
        const now = new Date(Date.now());
        const currentQuarter = Math.floor((now.getMonth() + 3) / 3);
        const salaryValue = salarytoBeEdited?.value != null
            ? formatNumber(salarytoBeEdited.value, 'en-US', '1.0-2')
            : null;

        super({
            value: new FormControl(
                salaryValue,
                [
                    Validators.pattern(AddSalaryForm.digitsPattern),
                    Validators.required,
                    Validators.min(75000),
                    Validators.max(10000000),
                ]),
            quarter: new FormControl(
                salarytoBeEdited?.quarter ?? currentQuarter,
                [
                    Validators.pattern(AddSalaryForm.digitsPattern),
                    Validators.min(1),
                    Validators.max(4),
                    Validators.required
                ]),
            year: new FormControl(
                salarytoBeEdited?.year ?? now.getFullYear(),
                [
                    Validators.pattern(AddSalaryForm.digitsPattern),
                    Validators.min(2000),
                    Validators.max(2100),
                    Validators.required
                ]),
            currency: new FormControl(salarytoBeEdited?.currency ?? Currency.KZT, [Validators.required]),
            company: new FormControl(salarytoBeEdited?.company ?? null, [Validators.required]),
            grade: new FormControl(salarytoBeEdited?.grade ?? null, [Validators.required]),
            profession: new FormControl(salarytoBeEdited?.profession ?? null, [Validators.required]),
            city: new FormControl(salarytoBeEdited?.city ?? null, []),
            skillId: new FormControl(salarytoBeEdited?.skillId ?? null, []),
        });
    }

    createRequestOrNull(): CreateUserSalaryRequest | null {
        if (this.valid) {
            const profession = Number(this.value.profession) as UserProfession;
            const grade = Number(this.value.grade) as DeveloperGrade;
            const city = this.value.city != null
                ? Number(this.value.city) as KazakhstanCity
                : null;

            const skillId = this.value.skillId != null
                ? Number(this.value.skillId)
                : null;

          return {
            value: Number(this.value.value),
            quarter: Number(this.value.quarter),
            year: Number(this.value.year),
            currency: Number(this.value.currency) as Currency,
            company: Number(this.value.company) as CompanyType,
            grade: grade,
            profession: profession,
            city: city != KazakhstanCity.Undefined ? city : null,
            skillId: skillId,
          };
        }
    
        this.markAllAsTouched();
        return null;
    }
}
