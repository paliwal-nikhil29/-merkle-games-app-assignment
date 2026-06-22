import { useRuntimeConfig, useAsyncData } from '#app'

type GqlOpts<T, U = T> = {
  variables?: Record<string, any> | (() => Record<string, any>)
  watch?: any[]
  transform?: (data: T) => U
}

export default function useGql<T, U = T>(key: string, query: string, options: GqlOpts<T, U> = {}) {
  const config = useRuntimeConfig()
  const base = ((config.public?.apiBase) ?? process.env.NUXT_PUBLIC_API_BASE ?? 'http://localhost:8000').replace(/\/$/, '')
  const graphqlUrl = `${base}/graphql`

  const getVariables = () => {
    if (typeof options.variables === 'function') {
      return options.variables()
    }
    return options.variables ?? {}
  }

  return useAsyncData<T, any, U>(
    `gql:${key}`,
    () => {
      return $fetch<{ data: T; errors?: any[] }>(graphqlUrl, {
        method: 'POST',
        body: {
          query,
          variables: getVariables(),
        },
      }).then(res => {
        if (res.errors && res.errors.length > 0) {
          throw new Error(res.errors[0].message || 'GraphQL Error')
        }
        return res.data
      })
    },
    {
      server: true,
      watch: options.watch,
      transform: options.transform,
    }
  )
}
