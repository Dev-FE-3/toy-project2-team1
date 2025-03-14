import MenuItem from './MenuItem'
import { MemoryRouter } from 'react-router-dom'
import styled from 'styled-components'

export default {
  title: 'Components/SideMenu/MenuItem',
  component: MenuItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <MenuContainer>
          <Story />
        </MenuContainer>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text' },
    label: { control: 'text' },
    path: { control: 'text' },
    indent: { control: 'boolean' },
  },
}

const MenuContainer = styled.div`
  width: 240px;
  background-color: var(--main);
  border-radius: 8px;
  padding: 10px 0;
`

export const 기본메뉴아이템 = {
  args: {
    icon: '/public/images/icon-home.svg',
    label: '홈',
    path: '/',
    indent: false,
  },
}

export const 들여쓰기메뉴아이템 = {
  args: {
    icon: '/public/images/icon-gift.svg',
    label: '급여 관리',
    path: '/admin/pay-stub-management',
    indent: true,
  },
}

export const 긴라벨메뉴아이템 = {
  args: {
    icon: '/public/images/icon-calendar.svg',
    label: '매우 긴 메뉴 이름으로 테스트하는 경우',
    path: '/long-path',
    indent: false,
  },
}

export const 메뉴아이템목록 = {
  render: () => (
    <MenuContainer>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <MenuItem icon="/public/images/icon-home.svg" label="홈" path="/" />
        </li>
        <li>
          <MenuItem
            icon="/public/images/icon-calendar.svg"
            label="근무스케줄"
            path="/work-schedule"
          />
        </li>
        <li>
          <MenuItem icon="/public/images/icon-salary.svg" label="내 급여" path="/pay-stub" />
        </li>
        <li>
          <MenuItem
            icon="/public/images/icon-gift.svg"
            label="급여 관리"
            path="/admin/pay-stub-management"
            indent={true}
          />
        </li>
      </ul>
    </MenuContainer>
  ),
}
