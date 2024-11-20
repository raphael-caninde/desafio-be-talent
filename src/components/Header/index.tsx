import styles from './Header.module.css';
import beTalent from '../../assets/logo/be-talent.png';

export default function Header() {
  return (
    <header className={styles.container__header}>
      <div className={styles['header--content']}>
        <img
          src={beTalent}
          alt='Logotipo BeTalent'
        />
      </div>
    </header>
  );
}
