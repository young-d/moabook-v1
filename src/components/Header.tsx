import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  return (
    <HeaderStyled draggable={false}>
      <Logo onClick={() => router.push('/')}>MOA-BOOK</Logo>
      <LogoutButton type="button" onClick={() => console.log('logout')}>
        로그아웃
      </LogoutButton>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  white-space: nowrap;
  min-height: 20%;
`;

const Logo = styled.div`
  width: 232px;
  padding: 24px 0;
  font-size: 40px;
  font-weight: bold;
  font-family: '양진체';
  color: #fff;
  border-bottom: 4px solid #fff;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 12px;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
`;

export default Header;
