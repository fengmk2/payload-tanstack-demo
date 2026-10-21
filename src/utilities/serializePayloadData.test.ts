import { describe, expect, expectTypeOf, it } from 'vite-plus/test'
import type { Page } from '../payload-types'
import { serializePayloadData } from './serializePayloadData'

describe('serializePayloadData', () => {
  it('preserves nested rich-text fields and pagination data', () => {
    const document = {
      id: 1,
      content: {
        root: {
          children: [
            {
              type: 'link',
              fields: {
                linkType: 'internal',
                doc: { relationTo: 'pages', value: { id: 2, slug: 'about' } },
                customLabel: 'About us',
              },
            },
          ],
        },
      },
    }
    const data = { docs: [document], totalDocs: 1, page: 1, totalPages: 1 }

    expect(serializePayloadData(data)).toEqual(data)
  })

  it('removes unsupported values without changing the source document', () => {
    const callback = () => 'server only'
    const data = { id: 1, fields: { label: 'Keep me', callback, symbol: Symbol('server only') } }

    expect(serializePayloadData(data)).toEqual({ id: 1, fields: { label: 'Keep me' } })
    expect(data.fields.callback).toBe(callback)
  })

  it('preserves repeated references and dates', () => {
    const media = { id: 1, url: '/image.webp' }
    const publishedAt = new Date('2026-01-01T00:00:00Z')
    const result = serializePayloadData({ hero: media, thumbnail: media, publishedAt })

    expect(result.hero).toEqual(media)
    expect(result.thumbnail).toBe(result.hero)
    expect(result.publishedAt).toEqual(publishedAt)
  })

  it('preserves missing documents and their nullable return type', () => {
    const result = serializePayloadData<Page | null>(null)

    expect(result).toBeNull()
    expectTypeOf(result).toExtend<Page | null>()
    expectTypeOf(null).toExtend<typeof result>()
  })
})
