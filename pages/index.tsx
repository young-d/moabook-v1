import Header from '@components/Header';
import SpendingForm from '@components/SpendingForm';
import SpendingList from '@components/SpendingList';
import styled from '@emotion/styled';

const Home = (): JSX.Element => {
  return (
    <Container>
      <Header />
      <SpendingForm />
      <SpendingList />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'GmarketSansMedium';
`;

export default Home;
