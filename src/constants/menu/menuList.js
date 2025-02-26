import HomeIcon from '@/assets/icon-home.svg'
import CalendarIcon from '@/assets/icon-calendar.svg'
import SalaryIcon from '@/assets/icon-salary.svg'
import ArchiveIcon from '@/assets/icon-archive.svg'
import GiftIcon from '@/assets/icon-gift.svg'
import InboxIcon from '@/assets/icon-inbox.svg'

export const MENU_LIST = [
  { label: '홈', path: '/', icon: HomeIcon },
  { label: '근무스케줄', path: '/work-schedule', icon: CalendarIcon },
  { label: '내 급여', path: '/pay-stub', icon: SalaryIcon },
  { label: '내 문서함', path: '/my-document', icon: ArchiveIcon },
]

export const ADMIN_MENUS = [
  { label: '급여 관리', path: '/admin/pay-stub-management', icon: GiftIcon },
  { label: '결재함', path: '/admin/approval', icon: InboxIcon },
]
