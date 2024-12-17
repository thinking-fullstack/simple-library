import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CommentItem from './index.vue'
import { useUserStore } from '@/stores'
import { nextTick } from 'vue'
import type { IBookComment } from '@/resources/interfaces'
import { createTestingPinia } from '@pinia/testing'

// Mock the alert plugin
vi.mock('@/plugins/alert', () => ({
  useAlert: () => vi.fn()
}))

describe('CommentItem', () => {
  const mockComment: IBookComment = {
    id: '1',
    content: 'Test comment',
    date: '2024-01-01',
    author: {
      id: 'user1',
      username: 'TestUser'
    }
  }

  const createWrapper = () => {
    return mount(CommentItem, {
      props: { comment: mockComment },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              user: {}
            },
            stubActions: true
          })
        ]
      }
    })
  }

  it('should renders username and content', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('Test comment')
    expect(wrapper.text()).toContain('TestUser')
    expect(wrapper.text()).toContain(new Date(mockComment.date).toLocaleDateString())
  })

  it('should renders owned comment', async () => {
    const wrapper = createWrapper()
    const userStore = useUserStore()

    userStore.$patch({
      user: {
        id: 'user1',
        username: 'TestUser'
      }
    })

    await nextTick()

    expect(wrapper.text()).toContain('You')
    expect(wrapper.text()).not.toContain('TestUser')
    expect(wrapper.find('[data-test-id="delete-comment"]').exists()).toBe(true)
  })
})
