import { isString } from '@vue/shared'

class UIError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UIError'
  }
}

export function throwError(scope: string, msg: string): never {
  throw new UIError(`[${scope}] ${msg}`)
}

export function debugWarn(err: Error): void
export function debugWarn(scope: string, message: string): void
export function debugWarn(scope: string | Error, message?: string): void {
  if (process.env.NODE_ENV !== 'production') {
    const error: Error = isString(scope)
      ? new UIError(`[${scope}] ${message}`)
      : scope
    // eslint-disable-next-line no-console
    console.warn(error)
  }
}
