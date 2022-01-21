import styled from '@emotion/styled';
import { VALID_YEAR_OLDEST, VALID_YEAR_LATEST } from '@utils/constants';
import { ChangeEvent, useEffect, useState } from 'react';
import { Spending, useSpending } from '@contexts/SpendingProvider';
import { formattedAmount } from '@utils/formattedNumber';
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

const SpendingList = () => {
  const date = new Date();
  const currYear = date.getFullYear();
  const currMonth = date.getMonth() + 1;
  const [selectedDate, setSelectedDate] = useState({
    year: `${currYear}`,
    month: `${currMonth >= 10 ? currMonth : `0${currMonth}`}`,
  });
  const years = [];
  const months = [];
  const { spending, removeSpending } = useSpending();
  const [filteredSpending, setFilteredSpending] = useState<Spending[]>();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setFilteredSpending(() =>
      spending
        .filter(
          ({ date }) =>
            date.substr(0, 4) === selectedDate.year &&
            date.substr(5, 2) === selectedDate.month,
        )
        .sort(
          (a, b) =>
            parseInt(a.date.substr(8, 2)) - parseInt(b.date.substr(8, 2)),
        ),
    );
  }, [selectedDate.month, selectedDate.year, spending]);

  useEffect(() => {
    const total = filteredSpending?.reduce((acc, { amount }) => {
      return (acc += amount);
    }, 0);

    total && setTotalAmount(total);
  }, [filteredSpending]);

  for (let i = VALID_YEAR_LATEST; i >= VALID_YEAR_OLDEST; i--) {
    years.push(`${i}`);
  }

  let validMonth = 1;

  while (validMonth <= 12) {
    if (selectedDate.year === `${currYear}` && validMonth > currMonth) {
      break;
    }

    months.push(`${validMonth >= 10 ? validMonth++ : `0${validMonth++}`}`);
  }

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate({ ...selectedDate, year: e.target?.value });
  };

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate({ ...selectedDate, month: e.target?.value });
  };

  return (
    <ListContainer>
      <Wrapper>
        <SelectorGroup>
          <Select
            name="year"
            id="year-select"
            onChange={handleYearChange}
            defaultValue={selectedDate.year}>
            {years.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </Select>
          <SelectLabel>년</SelectLabel>
          <Select
            name="month"
            id="month-select"
            onChange={handleMonthChange}
            defaultValue={selectedDate.month}>
            {months.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </Select>
          <SelectLabel>월</SelectLabel>
        </SelectorGroup>
        <TotalAmount>
          <AmountLabel>Total</AmountLabel>
          <Amount>{formattedAmount(totalAmount)} 원</Amount>
        </TotalAmount>
      </Wrapper>
      {filteredSpending && filteredSpending.length > 0 && (
        <List>
          {filteredSpending.map(({ id, date, content, amount }) => {
            return (
              <Item key={id}>
                <Inner>
                  <SpendingDate>{date.split('-').join('.')}</SpendingDate>
                  <SpendingContent>{content}</SpendingContent>
                  <SpendingAmount value={amount}>
                    ₩ {formattedAmount(amount)}
                  </SpendingAmount>
                </Inner>
                <IconGroup>
                  <FiEdit3 />
                  <AiOutlineDelete onClick={() => id && removeSpending(id)} />
                </IconGroup>
              </Item>
            );
          })}
        </List>
      )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 100%;
  flex-basis: 68%;
  background-color: #efefef;
  border-radius: 70px 70px 0 0;
  margin-top: auto;
  padding: 40px 0;
  overflow: hidden;
`;

const Wrapper = styled.section`
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SelectorGroup = styled.article`
  display: flex;
  align-items: center;
  margin: 4px 0;
  font-size: 1.5em;
`;

const Select = styled.select`
  font-size: 1em;
  padding: 4px;
  cursor: pointer;
  border-color: #a5a5a5;
  border-radius: 3px;
`;

const SelectLabel = styled.label`
  margin: 0 8px 0 4px;
`;

const TotalAmount = styled.section`
  display: flex;
  align-items: center;
  margin: 4px 0;
`;

const AmountLabel = styled.label`
  font-size: 0.9em;
  margin-right: 16px;
`;

const Amount = styled.article`
  color: #f93f77;
  font-size: 1.5em;
  white-space: nowrap;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
`;

const List = styled.ul`
  width: 80%;
  margin: 8px auto;
  padding: 0;
  height: calc(100% - 32px);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Item = styled.li`
  width: 100%;
  display: flex;
  margin: 8px 0;
  box-shadow: 2px 2px 4px #bebebe;
  border-radius: 4px;
  align-items: center;
  background-color: #fff;
`;

const Inner = styled.div`
  width: calc(100% - 48px);
  display: flex;
  padding: 0 8px;
  min-height: 40px;
  line-height: 40px;

  @media (max-width: 874px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

const SpendingDate = styled.div`
  flex-basis: 20%;
  text-align: center;
  color: #a5a5a5;
  font-size: 0.9em;
`;

const SpendingContent = styled.div`
  flex-basis: 50%;
  word-break: break-word;
`;

const SpendingAmount = styled.div`
  flex-basis: 34%;
  text-align: right;
  ${(props: { value: number }) => props.value >= 100000 && 'color: #F93F77'};
  white-space: nowrap;
  font-weight: bold;
`;

const IconGroup = styled.div`
  width: 48px;
  color: #a5a5a5;
  display: flex;
  justify-content: center;
  margin: 0 auto;

  & > * {
    cursor: pointer;
    margin: 0 2px;
  }

  @media (max-width: 874px) {
    align-self: flex-start;
    margin-top: 8px;
  }
`;

export default SpendingList;
