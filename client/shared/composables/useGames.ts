import { unref } from 'vue'
import { useRuntimeConfig, useState, useAsyncData } from '#app'
import useGql from '~/shared/composables/useGql'
import type { GameAttributes } from '~/shared/models/game.model'

export default function useGames() {
  const config = useRuntimeConfig()
  const base = ((config.public?.apiBase) ?? process.env.NUXT_PUBLIC_API_BASE ?? 'http://localhost:8000').replace(/\/$/, '')
  const graphqlUrl = `${base}/graphql`

  const getAll = (params: { search: any }) => {
    const selectedRandomIds = useState<string[]>('selected-random-ids', () => [])

    const asyncData = useAsyncData<{ data: GameAttributes[] }>(
      'all-games-data',
      async () => {
        const searchTerm = unref(params.search)
        if (searchTerm) {

          const query = `
            query SearchGames($search: String) {
              games(limit: 100, search: $search) {
                games {
                  id
                  title
                  description
                  release_date
                  averageRating
                  totalReviews
                  genre {
                    id
                    name
                  }
                  developer {
                    id
                    name
                  }
                  images {
                    id
                    image_url
                    image_type
                  }
                }
              }
            }
          `
          const res = await $fetch<{ data: { games: { games: GameAttributes[] } } }>(graphqlUrl, {
            method: 'POST',
            body: {
              query,
              variables: { search: searchTerm }
            }
          })

          const games = res.data?.games?.games || []

          const filtered = games.filter(game => {
            if (!game.release_date) return false
            const year = new Date(game.release_date).getFullYear()
            return year >= 2015 && year <= 2017
          })
          return { data: filtered }
        } else {

          if (selectedRandomIds.value.length === 0) {
            const query = `
              query GetGamesByDateRange {
                gameIdsByDateRange(from: "2015-01-01", to: "2017-12-31")
              }
            `
            const res = await $fetch<{ data: { gameIdsByDateRange: string[] } }>(graphqlUrl, {
              method: 'POST',
              body: { query }
            })
            const allIds = res.data?.gameIdsByDateRange || []
            if (allIds.length > 0) {
              const shuffled = [...allIds].sort(() => 0.5 - Math.random())
              selectedRandomIds.value = shuffled.slice(0, 15)
            }
          }

          if (selectedRandomIds.value.length === 0) {
            return { data: [] }
          }


          const fields = `
            id
            title
            description
            release_date
            averageRating
            totalReviews
            genre {
              id
              name
            }
            developer {
              id
              name
            }
            images {
              id
              image_url
              image_type
            }
          `
          const query = `
            query GetRandomGames {
              ${selectedRandomIds.value.map(id => `game_${id}: game(id: "${id}") { ${fields} }`).join('\n')}
            }
          `
          const res = await $fetch<{ data: Record<string, GameAttributes> }>(graphqlUrl, {
            method: 'POST',
            body: { query }
          })
          const list = Object.values(res.data || {}).filter(Boolean) as GameAttributes[]
          return { data: list }
        }
      },
      {
        server: true,
        watch: [() => unref(params.search)],
      }
    )

    const originalRefresh = asyncData.refresh
    asyncData.refresh = async () => {

      if (!unref(params.search)) {
        selectedRandomIds.value = []
      }
      return originalRefresh()
    }

    return asyncData
  }

  const getById = (id: string) => {
    const query = `
      query GetGameDetail($id: ID!) {
        game(id: $id) {
          id
          title
          description
          release_date
          averageRating
          totalReviews
          genre {
            id
            name
          }
          developer {
            id
            name
          }
          images {
            id
            image_url
            image_type
          }
          reviews {
            id
            rating
            review_text
            user {
              id
              username
            }
          }
        }
      }
    `

    return useGql<{ game: GameAttributes }, { data: GameAttributes }>(`game:${id}`, query, {
      variables: { id },
      transform: (data) => ({ data: data.game })
    })
  }

  return { getAll, getById }
}
