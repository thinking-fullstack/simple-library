import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './index.vue'
import Spinner from '@/components/Icons/Spinner.vue'

describe('Button', () => {
  it('should render default label', () => {
    const wrapperWithSlot = mount(Button, {
      slots: {
        default: 'Click Me'
      }
    })
    expect(wrapperWithSlot.text()).toBe('Click Me')

    const wrapperWithLabel = mount(Button, {
      props: {
        label: 'Submit'
      }
    })
    expect(wrapperWithLabel.text()).toBe('Submit')
  })

  it("should disable the button when it's not allowed", async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      }
    })
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
    expect(button.classes()).toContain('cursor-not-allowed')
    expect(button.classes()).toContain('opacity-50')
  })

  it('should show a spinner and disables the button when loading', async () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      }
    })
    const spinner = wrapper.findComponent(Spinner)
    expect(spinner.exists()).toBe(true)
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it("should emit a 'click' event when clicked", async () => {
    const wrapper = mount(Button)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
