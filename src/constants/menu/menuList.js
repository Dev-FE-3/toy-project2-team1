import HomeIcon from '@/assets/icon-home.svg'
import CalendarIcon from '@/assets/icon-calendar.svg'
import SalaryIcon from '@/assets/icon-salary.svg'
import ArchiveIcon from '@/assets/icon-archive.svg'
import AdminCalendarIcon from '@/assets/icon-calendar-target.svg'
import GiftIcon from '@/assets/icon-gift.svg'
import InboxIcon from '@/assets/icon-inbox.svg'

export const MENU_LIST = [
  { label: '홈', path: '/', icon: HomeIcon },
  { label: '근무스케줄', path: '/schedule', icon: CalendarIcon },
  { label: '내 급여', path: '/salary', icon: SalaryIcon },
  { label: '내 문서함', path: '/documents', icon: ArchiveIcon },
]

export const ADMIN_MENUS = [
  { label: '근무스케줄 관리', path: '/admin/schedule-management', icon: AdminCalendarIcon },
  { label: '급여 관리', path: '/admin/salary-management', icon: GiftIcon },
  { label: '결재함', path: '/admin/approval', icon: InboxIcon },
]
