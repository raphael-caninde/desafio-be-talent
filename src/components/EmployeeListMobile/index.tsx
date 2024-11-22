import { useState } from 'react';
import { EmployeeType } from '../../@types/employeeType';
import { formatDate } from '../../utils/formatDate';
import { formatPhone } from '../../utils/formatPhone';
import { FaAngleDown } from 'react-icons/fa';
import styles from './EmployeeListMobile.module.css';

interface Props {
  filteredEmployees: EmployeeType[];
}

export default function EmployeeListMobile({ filteredEmployees }: Props) {
  const [expandedEmployee, setExpandedEmployee] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setExpandedEmployee(expandedEmployee === id ? null : id);
  };

  return (
    <div className={styles['container-mobile']}>
      <div className={styles['container-mobile-header']}>
        <h2>Foto</h2>
        <h2>Nome</h2>
        <div className={styles['dot-white']} />
      </div>

      {!!filteredEmployees.length &&
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

      {!filteredEmployees.length && (
        <span className={styles['no-results-message']}>
          Funcionário não encontrado!
        </span>
      )}
    </div>
  );
}
