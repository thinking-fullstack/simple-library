import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BookForm from './index.vue'
import { Form } from 'vee-validate'
import FormInput from '@/components/FormInput/index.vue'
import Button from '@/components/Button/index.vue'

// Mock components
vi.mock('@/components/FormInput/index.vue', () => ({
  default: {
    name: 'FormInput',
    template: '<input />'
  }
}))

vi.mock('@/components/Button/index.vue', () => ({
  default: {
    name: 'Button',
    template: '<button><slot /></button>'
  }
}))

describe('BookForm', () => {
  const mockBook = {
    id: 1,
    title: 'Test Book',
    author: 'Test Author',
    genre: 'Test Genre',
    publicationDate: new Date('2024-01-01'),
    description: 'Test Description'
  }

  const createWrapper = (props = {}) => {
    return mount(BookForm, {
      props,
      global: {
        components: {
          Form,
          FormInput,
          Button
        }
      }
    })
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render form and inputs', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent(Form).exists()).toBe(true)
    expect(wrapper.findAllComponents(FormInput)).toHaveLength(5)
  })

  it('should show delete button in edit mode', () => {
    const wrapper = createWrapper({ book: mockBook })
    const deleteButton = wrapper.findAll('button').find((btn) => btn.text().includes('Delete'))
    expect(deleteButton).toBeDefined()
  })

  it('should emit delete event when delete button is clicked', async () => {
    const wrapper = createWrapper({ book: mockBook })
    const deleteButton = wrapper.findAll('button').find((btn) => btn.text().includes('Delete'))

    await deleteButton?.trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
  })

  it('should show loading state when submitting', () => {
    const wrapper = createWrapper({ isLoading: true })
    const submitButton = wrapper.find('[type="submit"]')
    expect(submitButton?.attributes('loading')).toBeDefined()
  })

  it('validates form inputs according to bookSchema', async () => {
    const wrapper = createWrapper()
    const form = wrapper.findComponent(Form)

    await form.trigger('submit', {})
    expect(wrapper.emitted('submit')).toBeFalsy()
  })
})
