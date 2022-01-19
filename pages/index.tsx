import Header from '@components/Header';
import SpendingForm from '@components/SpendingForm';
import SpendingList from '@components/SpendingList';
import styled from '@emotion/styled';

const Home = (): JSX.Element => {
  return (
    <Container>
      <Header />
      <SpendingForm />
      <Wrapper>
        <>
          <select name="year" id="year-select">
            <option value="2022">2022</option>
          </select>
          월
          <select name="month" id="month-select">
            <option value="01">01</option>
          </select>
          년<span>Total</span>
          <span>₩ 435,000</span>
        </>
        <SpendingList />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'GmarketSansMedium';
`;

const Wrapper = styled.section`
  height: 68%;
  background-color: #efefef;
  border-radius: 70px 70px 0 0;
  margin-top: auto;
  text-align: center;
  padding: 40px 0;
`;

export default Home;
