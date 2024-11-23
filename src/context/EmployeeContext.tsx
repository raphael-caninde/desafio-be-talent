import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { fetchData } from '../services/fatchData';
import { EmployeeType } from '../@types/employeeType';

interface EmployeeContextType {
  employees: EmployeeType[];
  loading: boolean;
  error: string | null;
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeType[]>>;
}

export const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
  loading: true,
  error: null,
  setEmployees: () => {},
});

interface EmployeeProviderProps {
  children: ReactNode;
}

export const EmployeeProvider = ({ children }: EmployeeProviderProps) => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      // await new Promise(resolve => setTimeout(resolve, 4000));

      const data = await fetchData('http://localhost:3000/employees');

      setEmployees(data);
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{ employees, loading, error, setEmployees }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
