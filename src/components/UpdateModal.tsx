import { useSpending } from '@contexts/SpendingProvider';
import styled from '@emotion/styled';
import { Modal } from '@mui/material';
import { formattedAmount, formattedDate } from '@utils/formattedNumber';
import React, { ChangeEvent, useCallback, useState, MouseEvent } from 'react';
import { GrClose } from 'react-icons/gr';
import { FiEdit3 } from 'react-icons/fi';

const UpdateModal = (prop: { id: string }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { spending, updateSpending } = useSpending();
  const [updatedSpending, setUpdatedSpending] = useState(
    spending.find(item => item.id === prop.id) || {
      date: formattedDate(new Date(), '-'),
      content: '',
      amount: 0,
    },
  );

  const onChangeDate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e.target?.value);
      setUpdatedSpending({ ...updatedSpending, date: e.target?.value });
    },
    [updatedSpending],
  );

  const onChangeContent = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target?.value;

      setUpdatedSpending({ ...updatedSpending, content: value });
    },
    [updatedSpending],
  );

  const onChangeAmount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value?.replace(/[^0-9]|^0+/g, '');

      setUpdatedSpending({
        ...updatedSpending,
        amount: inputValue ? parseInt(inputValue) : 0,
      });
    },
    [updatedSpending],
  );

  const handleSubmit = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (
        updatedSpending.date.length !== 10 ||
        !updatedSpending.content.trim() ||
        !updatedSpending.amount
      ) {
        alert('[error] 비어있는 입력값이 있습니다.');

        return;
      }

      updateSpending({
        ...updatedSpending,
        id: prop.id,
        content: updatedSpending.content.trim(),
      });

      handleClose();
    },
    [prop.id, updateSpending, updatedSpending],
  );

  return (
    <div>
      <UpdateIcon>
        <FiEdit3 onClick={handleOpen} />
      </UpdateIcon>
      <Modal aria-labelledby="update-modal" open={open} onClose={handleClose}>
        <Container>
          <h3 id="modal-title">지출내역 수정</h3>
          <GrClose
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              cursor: 'pointer',
            }}
            onClick={() => handleClose()}
          />
          <hr />
          <DateInput
            type="date"
            name="updatedSpending-date"
            value={updatedSpending.date}
            onChange={onChangeDate}
          />
          <ContentWrapper>
            <ContentInput
              name="updatedSpending-content"
              value={updatedSpending.content}
              placeholder="내용 (최대 20자)"
              onChange={onChangeContent}
              maxLength={20}
            />
            <TextLength>{`${updatedSpending.content?.length}/20`}</TextLength>
          </ContentWrapper>
          <AmountWrapper>
            <AmountInput
              type="text"
              name="updatedSpending-amount"
              value={
                updatedSpending.amount
                  ? formattedAmount(updatedSpending.amount)
                  : ''
              }
              onChange={onChangeAmount}
              autoComplete="off"
              placeholder="0"
            />
            <AmountUnit>₩</AmountUnit>
          </AmountWrapper>
          <AddButton
            type="button"
            onClick={handleSubmit}
            style={{ backgroundColor: 'orange', fontSize: '1em' }}>
            저장
          </AddButton>
        </Container>
      </Modal>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 360px;
  background-color: #fff;
  box-shadow: 24;
  border-radius: 4px;
  padding: 16px;
`;

const UpdateIcon = styled.div`
  width: 24px;
  color: #a5a5a5;
  font-size: 1.1em;
  cursor: pointer;
`;

const DateInput = styled.input`
  width: 100%;
  height: 40px;
  outline: 1px solid #bfbfbf;
  border-radius: 4px;
  border: none;
  padding: 4px 8px;
  font-size: 1.1em;
  cursor: pointer;
  margin-bottom: 8px;
`;

const ContentWrapper = styled.article`
  width: 100%;
  height: 80px;
  position: relative;
  margin-bottom: 8px;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #bfbfbf;
  padding: 4px 8px;
  font-size: 1.1rem;
  word-wrap: break-word;
  word-break: break-all;
  resize: none;
`;

const TextLength = styled.span`
  position: absolute;
  right: 8px;
  bottom: 8px;
  font-size: 12px;
  color: #bfbfbf;
`;

const AmountWrapper = styled.article`
  width: 100%;
  height: 40px;
  position: relative;
  font-size: 1.1em;
  margin-bottom: 8px;
`;

const AmountInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  outline: 1px solid #bfbfbf;
  border: none;
  padding: 4px 8px 4px 32px;
  text-align: right;
  font-size: inherit;
`;

const AmountUnit = styled.span`
  position: absolute;
  left: 8px;
  bottom: 8px;
`;

const AddButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 1em;
  cursor: pointer;
  background-color: orange;
  padding: 8px 16px;
  border-radius: 4px;
  margin-top: auto;
`;

export default UpdateModal;
