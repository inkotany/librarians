export function cleanFormData<T extends Record<string, unknown>>(
  data: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(data).filter(([value]) => value !== "")
  ) as Partial<T>;
}
