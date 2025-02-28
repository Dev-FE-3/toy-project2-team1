import styled from 'styled-components'

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--box-container);
  border-radius: 1.2rem;
  box-shadow: 0px 0px 0.5rem 0.3rem rgba(0, 0, 0, 0.1);
  width: ${({ $width }) => $width};
  max-width: 90%;
  max-height: 90%;
  padding: 2.8rem;
`

export const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.h2`
  height: 24px;
  line-height: 24px;
  font-size: 2.4rem;
  font-weight: bold;
  padding-left: ${({ $isDecorated }) => ($isDecorated ? '1.5rem' : '0')};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 24px;
    background-color: var(--main);
    display: ${({ $isDecorated }) => ($isDecorated ? 'block' : 'none')};
  }
`

export const CloseIcon = styled.img.attrs({
  src: '/public/images/icon-x.svg',
  alt: '닫기',
})`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  heigh: 24px;
`

export const Content = styled.div`
  min-height: 100px;
  max-height: calc(90% - 11.2rem);
  overflow: auto;
  margin-top: ${({ $title }) => ($title ? '2.4rem' : 0)};
`
