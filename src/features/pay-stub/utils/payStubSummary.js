const payStubSummary = (data) => {
  const totalPayment = data.basicSalary + data.mealAllowance + data.additionalAllowance
  const totalDeduction =
    data.nationalPension +
    data.healthInsurance +
    data.longTermCareInsurance +
    data.employmentInsurance +
    data.incomeTax +
    data.localIncomeTax

  return { totalPayment, totalDeduction }
}

export default payStubSummary
