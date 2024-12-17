import * as yup from 'yup'

export const bookSchema = yup.object({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  genre: yup.string().required('Genre is required'),
  publicationDate: yup
    .string()
    .required('Publication date is required')
    .test('valid-date', 'Invalid date format', (value) => {
      if (!value) return true
      return !isNaN(Date.parse(value))
    }),
  description: yup.string()
})
