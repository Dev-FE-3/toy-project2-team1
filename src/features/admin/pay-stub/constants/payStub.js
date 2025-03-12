export const BASICSALARY = 'basicSalary'
export const MEALALLOWANCE = 'mealAllowance'
export const ADDITIONALALLOWANCE = 'additionalAllowance'
export const NATIONALPENSION = 'nationalPension'
export const HEALTHINSURANCE = 'healthInsurance'
export const LONGTERMCAREINSURANCE = 'longTermCareInsurance'
export const EMPLOYMENTINSURANCE = 'employmentInsurance'
export const INCOMETAX = 'incomeTax'
export const LOCALINCOMETAX = 'localIncomeTax'

export const CALC_NATIONALPENSION = (num) => Math.ceil(num * 0.045) // 국민연금
export const CALC_HEALTHINSURANCE = (num) => Math.ceil(num * 0.03545) // 건강보험
export const CALC_LONGTERMCAREINSURANCE = (num) => Math.ceil(num * 0.00459) // 장기요양보험
export const CALC_EMPLOYMENTINSURANCE = (num) => Math.ceil(num * 0.009) // 고용보험
export const CALC_INCOMETAX = (num) => Math.ceil(num * 0.05) // 근로소득세
export const CALC_LOCALINCOMETAX = (num) => Math.ceil(num * 0.005) // 지방소득세
