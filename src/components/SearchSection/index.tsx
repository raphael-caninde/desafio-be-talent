import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useEmployee } from '../../hooks/useEmployee';
import { formatDate } from '../../utils/formatDate';
import { formatPhone } from '../../utils/formatPhone';
import { FaAngleDown } from 'react-icons/fa';
import styles from './SearchSection.module.css';

export default function SearchSection() {
  const { employees } = useEmployee();
  const [expandedEmployee, setExpandedEmployee] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setExpandedEmployee(expandedEmployee === id ? null : id);
  };

  return (
    <section className={styles['search-section']}>
      <div className={styles['search-section__container']}>
        <h1 className={styles['search-section__title']}>Funcionários</h1>

        <div className={styles['search-section__input-wrapper']}>
          <input
            type='text'
            className={styles['search-section__input']}
            placeholder='Pesquisar'
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
            {employees &&
              employees.map(employee => (
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

        {employees &&
          employees.map(employee => (
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
