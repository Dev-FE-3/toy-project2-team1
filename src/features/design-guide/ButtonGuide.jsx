import Button from '@/shared/components/button/Button'

export default function ButtonGuide() {
  return (
    <>
      <div style={{ margin: '1rem 0', display: 'flex', gap: '.5rem' }}>
        <Button type="button" variant="secondary">
          secondary
        </Button>
        <Button type="button" variant="primary">
          primary
        </Button>
        <Button type="button" variant="danger">
          danger
        </Button>
        <Button type="button" variant="secondary" disabled>
          disabled
        </Button>
        <Button type="button" variant="secondary" onClick={() => alert('hi')}>
          onClick
        </Button>
      </div>
      <div style={{ width: '500px' }}>
        <Button type="button" isFullWidth>
          어느정도너비까지늘어나는거예요 (부모 너비에 맞게 늘어납니다)
        </Button>
      </div>
    </>
  )
}
