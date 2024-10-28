import { FC } from 'react';
import { useSelector, RootState } from '../../../services/store';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = () => {
  const userName = useSelector((state: RootState) => state.user.user?.name);

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to='/' className={styles.link}>
            {({ isActive }) =>
              isActive ? (
                <>
                  <BurgerIcon type={'primary'} />
                  <p
                    className={`${styles.link_active} text text_type_main-default ml-2 mr-10`}
                  >
                    Конструктор
                  </p>
                </>
              ) : (
                <>
                  <BurgerIcon type={'secondary'} />
                  <p className='text text_type_main-default ml-2 mr-10'>
                    Конструктор
                  </p>
                </>
              )
            }
          </NavLink>
          <NavLink to='/feed' className={styles.link}>
            {({ isActive }) =>
              isActive ? (
                <>
                  <ListIcon type={'primary'} />
                  <p
                    className={`${styles.link_active} text text_type_main-default ml-2`}
                  >
                    Лента заказов
                  </p>
                </>
              ) : (
                <>
                  <ListIcon type={'secondary'} />
                  <p className='text text_type_main-default ml-2'>
                    Лента заказов
                  </p>
                </>
              )
            }
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo className={''} />
        </div>
        <NavLink
          to='/profile'
          className={`${styles.link_position_last} ${styles.link}`}
        >
          {({ isActive }) =>
            isActive ? (
              <>
                <ProfileIcon type={'primary'} />
                <p
                  className={`${styles.link_active} text text_type_main-default ml-2`}
                >
                  {userName || 'Личный кабинет'}
                </p>
              </>
            ) : (
              <>
                <ProfileIcon type={'secondary'} />
                <p className='text text_type_main-default ml-2'>
                  {userName || 'Личный кабинет'}
                </p>
              </>
            )
          }
        </NavLink>
      </nav>
    </header>
  );
};
