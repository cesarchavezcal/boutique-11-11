import { ProfileCard, PageHeader, TopNavBar } from './../../components';
import { IoPersonCircleOutline } from 'react-icons/io5';

/* eslint-disable-next-line */
export interface PerfilProps {}

export function Perfil(props: PerfilProps) {
  return (
    <>
      <TopNavBar url="/" page="Inicio" />
      <section className="grid gap-4 pt-[3.875rem]">
        <PageHeader
          title="Mi Perfil"
          description="Aquí podrás ver los datos de tu perfil"
          icon={<IoPersonCircleOutline className="text-2xl" />}
        />
        <ProfileCard />
      </section>
    </>
  );
}

export default Perfil;
