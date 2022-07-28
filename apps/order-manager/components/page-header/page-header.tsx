/* eslint-disable-next-line */
export interface PageHeaderProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

export function PageHeader(props: PageHeaderProps) {
  return (
    <section className="grid gap-2">
      <h1 className="inline-flex items-center gap-2 text-3xl font-semibold text-black">
        <i className="bg-apricot-light rounded p-1 text-white">{props.icon}</i>
        {props.title}
      </h1>
      <p className="text-black-light text-base">{props.description}</p>
    </section>
  );
}

export default PageHeader;
