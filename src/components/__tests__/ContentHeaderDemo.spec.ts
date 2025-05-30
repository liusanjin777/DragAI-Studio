import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ContentHeaderDemo from '../demos/ContentHeaderDemo.vue'

describe('ContentHeaderDemo', () => {
  let wrapper: any = null
  beforeEach(() => {
    const props = {
      title: '项目',
      nav: [
        { label: '测试一', value: 'test1' },
        { label: '测试二', value: 'test2' }
      ],
      active: 'test2'
    }
    wrapper = mount(ContentHeaderDemo, {
      props,
      slots: { right: '<div>right</div>' }
    })
  })
  it('renders title properly', async () => {
    expect(wrapper.find('.content-title').text()).toBe('项目')
    await wrapper.setProps({ title: undefined })
    expect(wrapper.find('.content-title').text()).toBe('标题')
  })
  it('renders nav properly', () => {
    const navListItem = wrapper.findAll('.nav-list li')
    expect(navListItem.length).toBe(2)
    expect(navListItem[1].text()).toBe('测试二')
  })
  it('renders active properly', () => {
    expect(wrapper.findAll('.nav-list li')[1].classes('active')).toBe(true)
    // 错误示例
    // expect(wrapper.findAll('.nav-list li')[1].classes()).not.toContain('active')
  })
  it('emits event when nav is click', async () => {
    const navListItem = wrapper.findAll('.nav-list li')
    await navListItem[0].trigger('click')
    expect(wrapper.emitted()).toHaveProperty('checkNav')
    expect(wrapper.emitted('checkNav')[0]).toEqual([
      { label: '测试一', value: 'test1' }
    ])
    // expect(navListItem[0].classes('active')).toBe(true)
  })
  it('test slot', () => {
    expect(wrapper.html()).toContain('<div>right</div>')
  })
})
