import { useSpending } from '@contexts/SpendingProvider';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';

const SpendingForm = () => {
  const formattedDate = (date: Date) =>
    `${date.getFullYear()}-${
      (date.getMonth() + 1).toString().length > 2
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`
    }-${date.getDate()}`;

  const [spending, setSpending] = useState({
    date: formattedDate(new Date()),
    content: '',
    amount: 0,
  });
  const { addSpending } = useSpending();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (spending.date.length !== 10 || !spending.content || !spending.amount) {
      alert('[error] 비어있는 입력값이 있습니다.');

      return;
    }
    console.log(spending.date, spending.content, spending.amount);
    addSpending(spending);
    setSpending({
      ...spending,
      content: '',
      amount: 0,
    });
  };

  const onChangeDate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSpending({ ...spending, date: e.target?.value });
    },
    [spending],
  );

  const onChangeContent = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target?.value.length > 20) {
        alert('최대 20자를 넘길 수 없어요!');

        return;
      }

      setSpending({ ...spending, content: e.target?.value });
    },
    [spending],
  );

  const onChangeAmount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (typeof parseInt(e.target?.value) !== 'number') {
        console.log(typeof parseInt(e.target.value));

        return;
      }

      const inputValue = e.target.value?.replace(/[^0-9]|^0+/g, '') || '0';
      setSpending({ ...spending, amount: parseInt(inputValue) });
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
          value={
            spending.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ||
            ''
          }
          onChange={onChangeAmount}
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
  min-height: 12%;
  justify-content: center;
  align-items: center;
  margin: 16px auto;
  display: flex;
  flex-wrap: wrap;
`;

const DateInput = styled.input`
  width: 184px;
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
  padding: 4px 8px;
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
