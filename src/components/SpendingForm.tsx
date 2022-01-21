import { useSpending } from '@contexts/SpendingProvider';
import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import { formattedAmount, formattedDate } from '@utils/formattedNumber';

const SpendingForm = () => {
  const [spending, setSpending] = useState({
    date: formattedDate(new Date(), '-'),
    content: '',
    amount: 0,
  });
  const { addSpending } = useSpending();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (
        spending.date.length !== 10 ||
        !spending.content.trim() ||
        !spending.amount
      ) {
        alert('[error] 비어있는 입력값이 있습니다.');

        return;
      }

      addSpending({ ...spending, content: spending.content.trim() });
      setSpending({
        ...spending,
        content: '',
        amount: 0,
      });
    },
    [spending, addSpending],
  );

  const onChangeDate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSpending({ ...spending, date: e.target?.value });
    },
    [spending],
  );

  const onChangeContent = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target?.value;

      setSpending({ ...spending, content: value });
    },
    [spending],
  );

  const onChangeAmount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value?.replace(/[^0-9]|^0+/g, '');

      setSpending({
        ...spending,
        amount: inputValue ? parseInt(inputValue) : 0,
      });
    },
    [spending],
  );

  return (
    <Form onSubmit={handleSubmit}>
      <DateInput
        type="date"
        name="spending-date"
        value={spending.date}
        onChange={onChangeDate}
      />
      <ContentWrapper>
        <ContentInput
          type="text"
          name="spending-content"
          value={spending.content}
          placeholder="내용 (최대 20자)"
          onChange={onChangeContent}
          maxLength={20}
          autoComplete="off"
        />
        <TextLength>{`${spending.content?.length}/20`}</TextLength>
      </ContentWrapper>
      <AmountWrapper>
        <AmountInput
          type="text"
          name="spending-amount"
          value={spending.amount ? formattedAmount(spending.amount) : ''}
          onChange={onChangeAmount}
          autoComplete="off"
          placeholder="0"
        />
        <AmountUnit>₩</AmountUnit>
      </AmountWrapper>
      <AddButton type="submit">
        <BsPlusCircleFill style={{ color: 'orange' }} />
      </AddButton>
    </Form>
  );
};

const Form = styled.form`
  width: calc(100% - 16px);
  justify-content: center;
  align-items: center;
  margin: 16px auto;
  display: flex;
  flex-wrap: wrap;
  min-height: 12%;
`;

const DateInput = styled.input`
  width: 240px;
  height: 40px;
  border-radius: 4px;
  border: none;
  padding: 4px 8px;
  font-size: 1.1em;
  margin: 4px;
  cursor: pointer;
`;

const ContentWrapper = styled.article`
  width: 400px;
  height: 40px;
  position: relative;
  margin: 4px;
`;

const ContentInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: none;
  padding: 4px 8px;
  font-size: 1.1em;
`;

const TextLength = styled.span`
  position: absolute;
  right: 8px;
  bottom: 8px;
  font-size: 12px;
  color: #bfbfbf;
`;

const AmountWrapper = styled.article`
  width: 240px;
  height: 40px;
  position: relative;
  margin: 4px;
  font-size: 1.1em;
`;

const AmountInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 4px;
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
  font-size: 2em;
  width: 40px;
  height: 40px;
  line-height: calc(40px / 3);
  cursor: pointer;
`;

export default SpendingForm;
