import Card from '@/shared/components/card/Card'
import styled from 'styled-components'

export default function EmployeeInfo() {
  return (
    <Card title={'개인정보'}>
      <ProfileImage />
      <InfoWrap>
        <div>
          <p className="department">경영지원본부 인사팀</p>
          <div className="d-flex">
            <span className="employee-name">홍길동</span>
            <span className="position">매니저</span>
          </div>
        </div>
        <div className="d-flex etc">
          <p>1년 6개월 근무</p>
          <div className="d-flex">
            <p className="etc-phone">010-1234-5676</p>
            <p className="etc-email">gildong@mail.com</p>
          </div>
        </div>
      </InfoWrap>
    </Card>
  )
}

const ProfileImage = styled.div`
  min-width: 140px;
  min-height: 140px;
  border-radius: 50%;
  border: 1px solid var(--background-main);
  background-color: var(--point-gray);
  background: url('/public/images/home-profile.png') center/cover;
`
const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem 0 0.5rem 4.4rem;
  gap: 3rem;

  .d-flex {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.8rem;
  }
  .department {
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--font-sub);
    line-height: 1.7rem;
    margin-bottom: 0.8rem;
  }
  .employee-name {
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 2.2rem;
    margin-right: 0.8rem;
  }
  .position {
    padding: 0.3rem 0.6rem;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5rem;
    color: var(--box-container);
    border-radius: 0.4rem;
    background: var(--main);
  }
  .etc p {
    margin-right: 4rem;
  }
  .etc-phone,
  .etc-email {
    padding: 0.4rem 0 0.4rem 2.4rem;
    background-position: left center;
    background-repeat: no-repeat;
  }
  .etc-phone {
    background-image: url('/public/images/icon-user.svg');
  }
  .etc-email {
    background-image: url('/public/images/icon-mail.svg');
  }
`
