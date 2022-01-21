import styled from '@emotion/styled';
import { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import reactDom from 'react-dom';
interface UpdateModalProps {
  isVisible: boolean;
  onSaveClick: MouseEventHandler<HTMLButtonElement>;
  onCancelClick: MouseEventHandler<HTMLButtonElement>;
}

type EffectCallback = () => void;

const UpdateModal = ({
  isVisible = false,
  onSaveClick,
  onCancelClick,
}: UpdateModalProps) => {
  const [element, setElement] = useState<any>(null);

  useEffect(() => {
    setElement(document.createElement('div'));
  }, []);

  useEffect(() => {
    element && document.body.appendChild(element);

    return () => {
      element && document.body.removeChild(element);
      setElement(null);
    };
  }, [element]);

  return (
    element &&
    reactDom.createPortal(
      <BackgroundScreen isVisible={isVisible}>
        <ModalContainer>
          <Header>지출내역 수정</Header>
          <Content>모달이당</Content>
          <Bottom>
            <CancelButton type="button" onClick={onCancelClick}>
              취소
            </CancelButton>
            <SaveButton type="submit" onClick={onSaveClick}>
              저장
            </SaveButton>
          </Bottom>
        </ModalContainer>
      </BackgroundScreen>,
      element,
    )
  );
};

const BackgroundScreen = styled.div`
  display: flex;
  visibility: ${(props: { isVisible: boolean }) =>
    props.isVisible ? 'visible' : 'hidden'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  visibility: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.6);
  padding: 8px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  transition: 0.1s ease-in;

  &.active {
    visibility: visible;
    transform: translate(-50%, -50%) scale(1);
    transition: 0.2s cubic-bezier(0.5, 1.75, 0.5, 1.75);
  }
`;

const Header = styled.section`
  font-size: 40px;
`;

const Content = styled.section`
  display: flex;
`;

const Bottom = styled.section`
  display: flex;
  justify-content: center;
`;

const CancelButton = styled.button`
  background-color: gray;
`;

const SaveButton = styled.button`
  background-color: orange;
`;

export default UpdateModal;
