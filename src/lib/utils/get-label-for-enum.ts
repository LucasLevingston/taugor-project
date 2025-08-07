export function getLabelForEnum<T extends string>(value: T): string {
  return (enumLabels as Record<T, string>)[value] || value.replace(/_/g, ' ')
}

const enumLabels = {}
