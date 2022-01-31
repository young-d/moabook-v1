import styled from '@emotion/styled';

const Login = () => {
  return (
    <Container>
      <Info>모아모아-</Info>
      <Wrapper>
        <SheetFirst></SheetFirst>
        <SheetSecond></SheetSecond>
        <SheetThird></SheetThird>
        <LoginSection>모아북 시작하기</LoginSection>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Info = styled.div`
  width: 50%;
`;

const Wrapper = styled.section`
  width: 40%;
  position: relative;
  height: 80vh;
`;

const SheetFirst = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #fff;
  z-index: 1;
  border-radius: 20px;
`;

const SheetSecond = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #fff;
  z-index: 2;
  border-radius: 20px;
  box-shadow: 2px 2px 10px 0 gray;
`;

const SheetThird = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 3;
  border-radius: 20px;
  box-shadow: 2px 2px 10px 0 #bfbfbf;
`;

const LoginSection = styled.article`
  position: relative;
  z-index: 100;
`;

export default Login;
