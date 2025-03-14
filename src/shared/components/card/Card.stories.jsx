import Card from './Card'
import styled from 'styled-components'

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    icon: {
      control: { type: 'select' },
      options: ['more', 'plus', 'none'],
    },
    contentAlign: {
      control: { type: 'select' },
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
    },
    onClick: { action: 'clicked' },
  },
}

// Card에서 사용할 컨텐츠 예시 컴포넌트
const SampleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

const SampleText = styled.p`
  margin: 0;
  font-size: 1.6rem;
`

const SampleImage = styled.div`
  height: 120px;
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 1.4rem;
`

// 공통 카드 크기 설정을 위한 래퍼
const CardWrapper = styled.div`
  width: 320px;
  height: 280px;
`

export const 기본카드 = {
  render: () => (
    <CardWrapper>
      <Card title="기본 카드">
        <SampleContent>
          <SampleText>카드의 기본 형태입니다.</SampleText>
          <SampleText>아이콘이 없고 기본 정렬을 사용합니다.</SampleText>
          <SampleImage>샘플 이미지 영역</SampleImage>
        </SampleContent>
      </Card>
    </CardWrapper>
  ),
}

export const 더보기아이콘카드 = {
  render: () => (
    <CardWrapper>
      <Card title="더보기 아이콘 카드" icon="more" onClick={() => console.log('더보기 클릭!')}>
        <SampleContent>
          <SampleText>더보기 아이콘이 있는 카드입니다.</SampleText>
          <SampleText>아이콘을 클릭하면 액션이 실행됩니다.</SampleText>
          <SampleImage>샘플 이미지 영역</SampleImage>
        </SampleContent>
      </Card>
    </CardWrapper>
  ),
}

export const 추가아이콘카드 = {
  render: () => (
    <CardWrapper>
      <Card title="추가 아이콘 카드" icon="plus" onClick={() => console.log('추가 클릭!')}>
        <SampleContent>
          <SampleText>추가 아이콘이 있는 카드입니다.</SampleText>
          <SampleText>아이콘을 클릭하면 추가 액션이 실행됩니다.</SampleText>
          <SampleImage>샘플 이미지 영역</SampleImage>
        </SampleContent>
      </Card>
    </CardWrapper>
  ),
}

export const 가운데정렬카드 = {
  render: () => (
    <CardWrapper>
      <Card title="가운데 정렬 카드" contentAlign="center">
        <SampleContent style={{ alignItems: 'center', textAlign: 'center' }}>
          <SampleText>컨텐츠가 가운데 정렬된 카드입니다.</SampleText>
          <SampleText>contentAlign 속성으로 정렬을 변경할 수 있습니다.</SampleText>
          <SampleImage style={{ width: '100%' }}>샘플 이미지 영역</SampleImage>
        </SampleContent>
      </Card>
    </CardWrapper>
  ),
}

export const 우측정렬카드 = {
  render: () => (
    <CardWrapper>
      <Card title="우측 정렬 카드" contentAlign="flex-end">
        <SampleContent style={{ alignItems: 'flex-end', textAlign: 'right' }}>
          <SampleText>컨텐츠가 우측 정렬된 카드입니다.</SampleText>
          <SampleText>contentAlign="flex-end"로 우측 정렬됩니다.</SampleText>
          <SampleImage style={{ width: '100%' }}>샘플 이미지 영역</SampleImage>
        </SampleContent>
      </Card>
    </CardWrapper>
  ),
}

export const 사이정렬카드 = {
  render: () => (
    <CardWrapper>
      <Card title="균등 간격 카드" contentAlign="space-between" icon="more">
        <SampleContent style={{ height: '100%', justifyContent: 'space-between' }}>
          <SampleText>상단 내용</SampleText>
          <SampleImage>중간 이미지 영역</SampleImage>
          <SampleText>하단 내용 - 요소들이 균등한 간격으로 배치됩니다.</SampleText>
        </SampleContent>
      </Card>
    </CardWrapper>
  ),
}

// 버튼과 텍스트가 포함된 복합 콘텐츠 샘플
const ComplexContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 15px;
`

const ActionButton = styled.button`
  padding: 8px 16px;
  background-color: var(--main);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.4rem;

  &:hover {
    opacity: 0.9;
  }
`

export const 복합콘텐츠카드 = {
  render: () => (
    <CardWrapper>
      <Card title="복합 콘텐츠 카드" icon="more" onClick={() => console.log('더보기 클릭!')}>
        <ComplexContent>
          <SampleText>카드에 다양한 요소를 포함할 수 있습니다.</SampleText>
          <SampleImage>그래프 또는 차트가 들어갈 영역</SampleImage>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <SampleText>자세히 보기</SampleText>
            <ActionButton onClick={() => console.log('버튼 클릭!')}>더보기</ActionButton>
          </div>
        </ComplexContent>
      </Card>
    </CardWrapper>
  ),
}
