import { EmployeeType } from '../../@types/employeeType';
import { formatDate } from '../../utils/formatDate';
import { formatPhone } from '../../utils/formatPhone';
import styles from './EmployeeTable.module.css';

interface Props {
  filteredEmployees: EmployeeType[];
}

export default function EmplyeeTable({ filteredEmployees }: Props) {
  return (
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
  );
}
