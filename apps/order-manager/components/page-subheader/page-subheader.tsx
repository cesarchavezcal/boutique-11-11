/* eslint-disable-next-line */
export interface PageSubheaderProps {
  title: string;
  description?: string;
}

export function PageSubheader(props: PageSubheaderProps) {
  return (
    <section className="grid gap-2">
      <h2 className="inline-flex items-center gap-2 text-xl text-black">
        {props.title}
      </h2>
      {props.description && (
        <p className="text-black-light text-base">{props.description}</p>
      )}
    </section>
  );
}

export default PageSubheader;
