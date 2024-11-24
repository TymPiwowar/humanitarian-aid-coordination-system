import { useCallback, useState } from 'react'

import { ToastOptions, toaster } from '@/components/ui/toaster'

type Options = {
  onErrorToast?: ToastOptions | string
  onSuccessToast?: ToastOptions | string
}

const useLoadingState = <T extends (...args: any[]) => Promise<void | unknown> | void | unknown>(
  onSubmit: T,
  options?: Options
): [T, boolean, Error | null] => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handleSubmit = useCallback(
    async (...args: Parameters<T>) => {
      setLoading(true)
      try {
        await onSubmit(...args)

        options?.onSuccessToast &&
          toaster.create(
            typeof options?.onSuccessToast === 'string'
              ? { title: options?.onSuccessToast }
              : { ...options?.onSuccessToast }
          )
      } catch (e) {
        setError(e as Error)
        console.error(e as Error)
        options?.onErrorToast &&
          toaster.create(
            typeof options?.onErrorToast === 'string'
              ? { title: options?.onErrorToast, type: 'error' }
              : { ...options?.onErrorToast, type: 'error' }
          )
      } finally {
        setLoading(false)
      }
    },
    [onSubmit, options]
  ) as T

  return [handleSubmit, loading, error]
}

export default useLoadingState
