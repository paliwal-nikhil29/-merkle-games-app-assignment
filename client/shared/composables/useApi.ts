import { useRuntimeConfig } from '#app'

type ParamsInput = Record<string, any> | (() => Record<string, any>)

type ApiOpts = {
  params?: ParamsInput
  fetchOptions?: any
  watch?: any[]
}

export default function useApi<T>(path: string, options: ApiOpts = {}) {
  const config = useRuntimeConfig()
  const base = ((config.public?.apiBase) ?? process.env.NUXT_PUBLIC_API_BASE ?? 'http://localhost:8000').replace(/\/$/, '')

  const buildUrl = () => {
    const params = typeof options.params === 'function' ? options.params() : (options.params ?? {})
    const qs = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') return
      qs.append(k, String(v))
    })
    return qs.toString() ? `${base}${path}?${qs.toString()}` : `${base}${path}`
  }

  return useAsyncData<T>(
    `useApi:${path}`,
    () => $fetch<T>(buildUrl(), options.fetchOptions),
    { server: true, watch: options.watch },
  )
}
