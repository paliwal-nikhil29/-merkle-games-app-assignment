import { mount } from '@vue/test-utils'
import BaseImage from '../../src/components/BaseImage.vue'
import axe from 'axe-core'

test('BaseImage renders and passes basic accessibility checks', async () => {
  const wrapper = mount(BaseImage, { props: { src: '/non-existent.png', alt: 'Example' } })
  const results = await axe.run(wrapper.element as any)
  expect(results.violations).toHaveLength(0)
})
