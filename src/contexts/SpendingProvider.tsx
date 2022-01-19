import useLocalStorage from '@hooks/useLocalStorage';
import { createContext, ReactChild, useContext } from 'react';
import { v4 } from 'uuid';

interface Spending {
  id: string;
  date: Date;
  content: string;
  amount: number;
}

interface ISpendingContext {
  spending: Spending[];
  addSpending(date: Date, content: string, amount: number): void;
  updateSpending(id: string, date: Date, content: string, amount: number): void;
  removeSpending(id: string): void;
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

  const addSpending = (date: Date, content: string, amount: number) => {
    setSpending([...spending, { id: v4(), date, content, amount }]);
  };

  const updateSpending = (
    id: string,
    date: Date,
    content: string,
    amount: number,
  ) => {
    setSpending(
      spending.map((item: Spending) =>
        item.id === id ? { ...item, date, content, amount } : item,
      ),
    );
  };

  const removeSpending = (id: string) => {
    setSpending(spending.filter((item: Spending) => item.id !== id));
  };

  return (
    <SpendingContext.Provider
      value={{ spending, addSpending, updateSpending, removeSpending }}>
      {children}
    </SpendingContext.Provider>
  );
};

export default SpendingProvider;
