import styled from '@emotion/styled';

const Header = () => {
  return (
    <HeaderStyled>
      <Logo>MOA-BOOK</Logo>
      <LogoutButton type="button" onClick={() => console.log('logout')}>
        로그아웃
      </LogoutButton>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const Logo = styled.div`
  width: 232px;
  padding: 16px 0;
  font-size: 40px;
  font-weight: bold;
  font-family: '양진체';
  color: #fff;
  border-bottom: 4px solid #fff;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 16px;
  right: 8px;
  font-size: 12px;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
`;

export default Header;
