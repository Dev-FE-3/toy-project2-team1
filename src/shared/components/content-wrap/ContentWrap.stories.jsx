import ContentWrap from './ContentWrap'
import styled, { css } from 'styled-components'

export default {
  title: 'Components/ContentWrap',
  component: ContentWrap,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    customStyle: { control: 'object' },
  },
}

// 샘플 콘텐츠 스타일 컴포넌트
const SampleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ContentTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--font-main);
  margin: 0;
`

const ContentParagraph = styled.p`
  font-size: 1.6rem;
  line-height: 1.5;
  color: var(--font-main);
  margin: 0;
`

const ContentBox = styled.div`
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`

// 콘텐츠 래퍼 크기 제한을 위한 컨테이너
const DemoContainer = styled.div`
  width: 800px;
  height: 500px;
  position: relative;
  border: 1px dashed #ccc;
  background-color: #f9f9f9;
  padding: 20px;
`

export const 기본컨텐츠래퍼 = {
  render: () => (
    <DemoContainer>
      <ContentWrap>
        <SampleContent>
          <ContentTitle>기본 컨텐츠 래퍼</ContentTitle>
          <ContentParagraph>
            ContentWrap은 콘텐츠를 감싸는 컨테이너 컴포넌트입니다. 기본적으로 흰색 배경, 둥근
            모서리, 그림자 효과가 적용됩니다.
          </ContentParagraph>
          <ContentParagraph>
            이 컴포넌트는 화면의 주요 콘텐츠 영역을 시각적으로 구분하고 정리하는 데 사용됩니다.
          </ContentParagraph>
          <ContentBox>
            <ContentParagraph>
              내부에 다른 컴포넌트들을 자유롭게 배치할 수 있습니다.
            </ContentParagraph>
          </ContentBox>
        </SampleContent>
      </ContentWrap>
    </DemoContainer>
  ),
}

export const 커스텀스타일링 = {
  render: () => (
    <DemoContainer>
      <ContentWrap
        customStyle={css`
          background-color: #f8f9ff;
          border: 1px solid #e0e6ff;
          padding: 3rem;
          border-radius: 0.8rem;
        `}
      >
        <SampleContent>
          <ContentTitle>커스텀 스타일 적용</ContentTitle>
          <ContentParagraph>
            customStyle prop을 통해 기본 스타일을 덮어쓰거나 추가할 수 있습니다.
          </ContentParagraph>
          <ContentParagraph>
            이 예제에서는 배경색, 테두리, 패딩, 모서리 반경을 변경했습니다.
          </ContentParagraph>
          <ContentBox
            style={{
              backgroundColor: '#e0e6ff',
              borderColor: '#c0c8ff',
            }}
          >
            <ContentParagraph>
              customStyle prop은 스타일드 컴포넌트의 css 헬퍼를 사용하여 전달합니다.
            </ContentParagraph>
          </ContentBox>
        </SampleContent>
      </ContentWrap>
    </DemoContainer>
  ),
}

export const 긴콘텐츠스크롤 = {
  render: () => (
    <DemoContainer>
      <ContentWrap>
        <SampleContent>
          <ContentTitle>긴 콘텐츠 스크롤</ContentTitle>
          <ContentParagraph>
            ContentWrap은 내용이 높이를 초과할 경우 자동으로 스크롤이 생성됩니다.
          </ContentParagraph>
          {Array(15)
            .fill(0)
            .map((_, i) => (
              <ContentBox key={i}>
                <ContentParagraph>
                  추가 콘텐츠 {i + 1}: 이 예제는 ContentWrap의 스크롤 기능을 보여줍니다. 콘텐츠가
                  높이를 초과하면 자동으로 스크롤바가 생성됩니다.
                </ContentParagraph>
              </ContentBox>
            ))}
        </SampleContent>
      </ContentWrap>
    </DemoContainer>
  ),
}

export const 좁은너비 = {
  render: () => (
    <div
      style={{ width: '400px', height: '500px', position: 'relative', border: '1px dashed #ccc' }}
    >
      <ContentWrap>
        <SampleContent>
          <ContentTitle>좁은 너비 컨테이너</ContentTitle>
          <ContentParagraph>
            ContentWrap은 부모 요소의 너비에 맞춰 반응형으로 조정됩니다.
          </ContentParagraph>
          <ContentParagraph>
            이 예제에서는 부모 컨테이너의 너비를 400px로 제한했습니다.
          </ContentParagraph>
          <ContentBox>
            <ContentParagraph>
              콘텐츠는 사용 가능한 공간에 맞게 자동으로 조정됩니다.
            </ContentParagraph>
          </ContentBox>
        </SampleContent>
      </ContentWrap>
    </div>
  ),
}

export const 어두운테마 = {
  render: () => (
    <DemoContainer>
      <ContentWrap
        customStyle={css`
          background-color: #2d3648;
          color: white;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        `}
      >
        <SampleContent>
          <ContentTitle style={{ color: 'white' }}>어두운 테마</ContentTitle>
          <ContentParagraph style={{ color: '#e0e0e0' }}>
            customStyle을 사용하여 다크 모드 스타일을 적용할 수 있습니다.
          </ContentParagraph>
          <ContentParagraph style={{ color: '#e0e0e0' }}>
            이 예제에서는 어두운 배경과 밝은 텍스트를 사용했습니다.
          </ContentParagraph>
          <ContentBox
            style={{
              backgroundColor: '#3d4658',
              borderColor: '#4d5668',
              color: '#e0e0e0',
            }}
          >
            <ContentParagraph style={{ color: '#e0e0e0' }}>
              어두운 테마의 콘텐츠 영역도 쉽게 스타일링할 수 있습니다.
            </ContentParagraph>
          </ContentBox>
        </SampleContent>
      </ContentWrap>
    </DemoContainer>
  ),
}
