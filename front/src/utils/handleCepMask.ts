export function handleCepMask(
  cep: string,
  e: React.KeyboardEvent<HTMLInputElement>,
): string {
  const key = e.key

  if (
    !/\d/.test(key) &&
    key !== 'Backspace' &&
    key !== 'Delete' &&
    !e.ctrlKey && // Allow actions when Ctrl key is pressed
    !e.shiftKey
  ) {
    e.preventDefault()
    return cep
  }

  // Remove non-digits and add "-" after the fifth digit
  const cleaned = cep.replace(/\D/g, '')
  const masked = cleaned.replace(/(\d{5})(\d{0,3})/, '$1-$2')

  return masked
}
