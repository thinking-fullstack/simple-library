import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import Comments from './index.vue'
import Button from '@/components/Button/index.vue'
import CommentItem from '../Item/index.vue'
import { createTestingPinia } from '@pinia/testing'
import { useBookStore } from '@/stores'
import type { IBookComment } from '@/resources/interfaces'

// Mock the alert plugin
vi.mock('@/plugins/alert', () => ({
  useAlert: () => vi.fn()
}))

describe('Comments.vue', () => {
  const createWrapper = () => {
    return mount(Comments, {
      props: {
        bookId: '123'
      },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              comments: []
            },
            stubActions: true
          })
        ],
        components: {
          Button,
          CommentItem
        }
      }
    })
  }

  it('should render correctly', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('should disable submit button when comment text is empty', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('should call addComment when form is submitted', async () => {
    const wrapper = createWrapper()

    const bookStore = useBookStore()

    await wrapper.find('textarea').setValue('Test comment')
    await wrapper.find('button').trigger('click')

    await nextTick()

    expect(bookStore.addComment).toHaveBeenCalled()
    expect(wrapper.vm.commentText).toBe('')
  })

  it('should render comment items for each comment in the store', async () => {
    const mockComments: IBookComment[] = [
      { id: '1', content: 'Comment 1', date: '2024-01-01', author: { id: '1', username: 'test' } },
      { id: '2', content: 'Comment 2', date: '2024-01-01', author: { id: '1', username: 'test' } }
    ]

    const wrapper = createWrapper()

    const bookStore = useBookStore()
    bookStore.$patch({
      comments: mockComments
    })

    await nextTick()

    expect(wrapper.findAllComponents(CommentItem)).toHaveLength(2)
  })
})
