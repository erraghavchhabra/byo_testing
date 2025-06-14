import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'p241tuh3', // 🔁 Replace with your own
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
})
