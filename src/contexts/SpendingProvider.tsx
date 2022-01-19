import useLocalStorage from '@hooks/useLocalStorage';
import { createContext, ReactChild, useContext } from 'react';
import { v4 } from 'uuid';

interface SpendingInput {
  date: string;
  content: string;
  amount: number;
}
interface Spending extends SpendingInput {
  id: string;
}

interface ISpendingContext {
  spending: Spending[];
  addSpending({ date, content, amount }: SpendingInput): void;
  updateSpending({ id, date, content, amount }: Spending): void;
  removeSpending(props: { id: string }): void;
}

const SpendingContext = createContext<ISpendingContext>({} as ISpendingContext);
export const useSpending = () => useContext(SpendingContext);

interface ProviderProps {
  children: ReactChild;
  initialSpending?: Spending[];
}

const SpendingProvider = ({
  children,
  initialSpending = [],
}: ProviderProps) => {
  const [spending, setSpending] = useLocalStorage<Spending[]>(
    'spending',
    initialSpending,
  );

  const addSpending = ({ date, content, amount }: SpendingInput) => {
    setSpending([
      ...spending,
      {
        id: v4(),
        date,
        content,
        amount,
      },
    ]);
  };

  const updateSpending = ({ id, date, content, amount }: Spending) => {
    setSpending(
      spending.map((item: Spending) =>
        item.id === id ? { ...item, date, content, amount } : item,
      ),
    );
  };

  const removeSpending = (props: { id: string }) => {
    setSpending(spending.filter((item: Spending) => item.id !== props.id));
  };

  return (
    <SpendingContext.Provider
      value={{ spending, addSpending, updateSpending, removeSpending }}>
      {children}
    </SpendingContext.Provider>
  );
};

export default SpendingProvider;
