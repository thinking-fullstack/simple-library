import { mount } from '@vue/test-utils'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import FormInput from './index.vue'
import { describe, it, expect } from 'vitest'
import flushPromises from 'flush-promises'

describe('FormInput.vue with Form component', () => {
  it('validates the required field using Yup schema', async () => {
    // Define the validation schema with Yup
    const schema = Yup.object({
      name: Yup.string().required('Name is required')
    })

    // Mount the Form component with your FormInput
    const wrapper = mount({
      template: `
        <Form :validation-schema="schema">
          <FormInput
            name="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
          />
          <button type="submit">Submit</button>
        </Form>
      `,
      components: { FormInput, Form },
      data() {
        return {
          schema
        }
      }
    })

    // should be no errors initially
    expect(wrapper.find('[data-test-id="error-message"]').exists()).toBeFalsy()

    await wrapper.find('button').trigger('click')

    await flushPromises()

    // Find the input and type a valid name
    const input = wrapper.find('textarea') // Since type is 'text', it renders a <textarea>
    await input.setValue('John Doe')

    // Submit the form again
    await wrapper.find('button').trigger('click')

    // The error message should disappear
    expect(wrapper.find('[data-test-id="error-message"]').exists()).toBeFalsy()
  })
})
