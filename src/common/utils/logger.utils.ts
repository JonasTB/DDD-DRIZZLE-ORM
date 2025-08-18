export interface SensitiveData {
  password?: string
  [key: string]: unknown
}

export function redactSensitiveData<T extends SensitiveData>(data: T): T {
  const redacted = { ...data }

  if (redacted.password) {
    redacted.password = '[REDACTED]'
  }

  return redacted
}

export function safeStringify<T>(data: T): string {
  return JSON.stringify(redactSensitiveData(data as Record<string, unknown>))
}
