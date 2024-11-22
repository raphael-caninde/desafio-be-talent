import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useEmployee } from '../../hooks/useEmployee';
import { formatDate } from '../../utils/formatDate';
import { formatPhone } from '../../utils/formatPhone';
import { FaAngleDown } from 'react-icons/fa';
import styles from './SearchSection.module.css';

export default function EmployeeView() {
  const { employees } = useEmployee();
  const [expandedEmployee, setExpandedEmployee] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const toggleDropdown = (id: number) => {
    setExpandedEmployee(expandedEmployee === id ? null : id);
  };

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

      <div className={styles['table-wrapper']}>
        <table className={styles['employee-table']}>
          <thead>
            <tr>
              <th>FOTO</th>
              <th>NOME</th>
              <th>CARGO</th>
              <th>DATA DE ADMISSÃO</th>
              <th>TELEFONE</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <tr key={employee.id}>
                <td>
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className={styles['employee-table__image']}
                  />
                </td>
                <td>{employee.name}</td>
                <td>{employee.job}</td>
                <td>{formatDate(employee.admission_date)}</td>
                <td>{formatPhone(employee.phone)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles['container-mobile']}>
        <div className={styles['container-mobile-header']}>
          <h2>Foto</h2>
          <h2>Nome</h2>
          <div className={styles['dot-white']} />
        </div>

        {filteredEmployees &&
          filteredEmployees.map(employee => (
            <div
              key={employee.id}
              className={`${styles['employee-item']} ${
                expandedEmployee === employee.id ? styles['expanded'] : ''
              }`}
            >
              <div
                onClick={() => toggleDropdown(employee.id)}
                className={styles['employee-summary']}
              >
                <img
                  src={employee.image}
                  alt={employee.name}
                  className={styles['employee-photo']}
                />

                <p className={styles['employee-name']}>{employee.name}</p>

                <FaAngleDown
                  size={25}
                  className={styles['icon']}
                />
              </div>

              {expandedEmployee === employee.id && (
                <div className={styles['employee-details']}>
                  <p>
                    <strong>Cargo:</strong> {employee.job}
                  </p>
                  <p>
                    <strong>Data de admissão:</strong>{' '}
                    {formatDate(employee.admission_date)}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {formatPhone(employee.phone)}
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>
    </section>
  );
}
