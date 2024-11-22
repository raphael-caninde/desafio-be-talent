import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useEmployee } from '../../hooks/useEmployee';
import EmplyeeTable from '../EmployeeTable';
import EmployeeListMobile from '../EmployeeListMobile';
import styles from './SearchSection.module.css';

export default function EmployeeView() {
  const { employees } = useEmployee();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredEmployees = employees.filter(
    employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm)
  );

  return (
    <section className={styles['search-section']}>
      <div className={styles['search-section__container']}>
        <h1 className={styles['search-section__title']}>Funcionários</h1>

        <div className={styles['search-section__input-wrapper']}>
          <input
            type='text'
            className={styles['search-section__input']}
            placeholder='Pesquisar'
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
          />

          <IoSearch className={styles['search-section__input-icon']} />
        </div>
      </div>

      <EmplyeeTable filteredEmployees={filteredEmployees} />
      <EmployeeListMobile filteredEmployees={filteredEmployees} />
    </section>
  );
}
