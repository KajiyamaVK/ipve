export function generateRandomNumberWithDigits(digits: number) {
  if (digits < 1) {
    throw new Error('Number of digits must be at least 1')
  }
  // Calculate the minimum number for the specified number of digits
  const min = Math.pow(10, digits - 1)
  // Calculate the maximum number for the specified number of digits
  const max = Math.pow(10, digits) - 1

  // Generate a random number within the range [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min
}
