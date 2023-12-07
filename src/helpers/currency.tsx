export const basePrice = (price: number) => {
  return new Intl.NumberFormat('in-IN', { style: 'currency', currency: 'IDR' }).format(price).replaceAll(',00', '')
}

export const priceDiscount = (price: number, discount: number) => {
  return discount > 0 ? basePrice(discount) : basePrice(price)
}

export const priceLineThrough = (price: number, discount: number) => {
  return (discount > 0 && discount !== price) && basePrice(price)
}

export const Percentage = (price: number, discount: number) => {
  const different = (price - discount)
  const percetage = (different / price) * 100
  return Math.round(percetage)
}