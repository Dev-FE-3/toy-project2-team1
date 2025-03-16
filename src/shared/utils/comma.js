export function formatNumberWithComma(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function removeComma(numberString) {
  return numberString.replace(/,/g, '')
}
