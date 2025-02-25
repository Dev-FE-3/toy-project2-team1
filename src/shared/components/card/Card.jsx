import styled from 'styled-components'
import CardDetail from '../../../assets/icon-card-detail.png'
import CardPlus from '../../../assets/icon-card-plus.png'

const CardWrapper = styled.div`
  width: 50rem;
  height: 20rem;
  padding: 24px;
  border-radius: 1.2rem;
  box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.05);
  background-color: var(--box-container);
`
const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.4rem;
`

const CardTitle = styled.p`
  color: var(--font-main);
  font-size: 2.4rem;
  font-weight: 700;
`
const CardIcon = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  background-image: url(${(props) => (props.detail === 'detail' ? CardDetail : CardPlus)});

  &:hover {
    cursor: pointer;
  }
`
const CardBottom = styled.div`
  display: flex;
`

function Card({ children, ...props }) {
  return (
    <>
      <CardWrapper col={props.col} row={props.row}>
        <CardTop>
          <CardTitle>{props.title}</CardTitle>
          {props.detail && <CardIcon detail={props.detail}></CardIcon>}
        </CardTop>
        <CardBottom>{children}</CardBottom>
      </CardWrapper>
    </>
  )
}

export default Card
