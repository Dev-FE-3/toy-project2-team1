import Card from '@/shared/components/card/Card'

function CardGuide() {
  return (
    <>
      <div style={{ display: 'flex', gap: '2.4rem', flexWrap: 'wrap' }}>
        <Card title="사이즈 3" size="3" icon="add">
          이곳에서 아무거나 만드세요!
        </Card>
        <Card title="사이즈 4" size="4" icon="more">
          이곳에서 아무거나 만드세요!
        </Card>
        <Card title="사이즈 5" size="5" icon="">
          이곳에서 아무거나 만드세요!
        </Card>
        <Card title="사이즈 7" size="7" icon="more">
          이곳에서 아무거나 만드세요!
        </Card>
        <Card title="사이즈 5" size="5" icon="add">
          이곳에서 아무거나 만드세요!
        </Card>
      </div>
    </>
  )
}

export default CardGuide
