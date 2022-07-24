import styles from './page-header.module.css';

/* eslint-disable-next-line */
export interface PageHeaderProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

export function PageHeader(props: PageHeaderProps) {
  return (
    <section className="grid gap-2">
      <h1 className="text-3xl text-black font-semibold inline-flex items-center gap-2">
        <i className="bg-apricot-light p-1 rounded text-white">{props.icon}</i>
        {props.title}
      </h1>
      <p className="text-base text-black-light">{props.description}</p>
    </section>
  );
}

export default PageHeader;
