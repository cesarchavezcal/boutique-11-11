/* eslint-disable-next-line */
export interface PageSubheaderProps {
  title: string;
  description?: string;
}

export function PageSubheader(props: PageSubheaderProps) {
  return (
    <section className="grid gap-2">
      <h2 className="text-xl text-black inline-flex items-center gap-2">
        {props.title}
      </h2>
      {props.description && (
        <p className="text-base text-black-light">{props.description}</p>
      )}
    </section>
  );
}

export default PageSubheader;
