import PageSubheader from '../page-subheader/page-subheader';

/* eslint-disable-next-line */
export interface PromoCarouselProps {}

export function PromoCarousel(props: PromoCarouselProps) {
  return (
    <section className="grid gap-2">
      <PageSubheader title="Promociones" />
      <div className="bg-apricot p-4 w-full rounded-3xl" role={'banner'}>
        <h3 className="text-2xl text-white">🎉 Descuento</h3>
        <p className="text-white/80">
          ☝🏻 Canjea el codigo{' '}
          <span className="font-bold text-white">XXXXX</span> y recibe un
          descuento de 10%
        </p>
      </div>
    </section>
  );
}

export default PromoCarousel;
