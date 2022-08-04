import Image from 'next/image';
import { IoImageOutline } from 'react-icons/io5';

/* eslint-disable-next-line */
export interface ImagesCarouselProps {
  data?: string[];
  isLoading: boolean;
}

export function ImagesCarousel(props: ImagesCarouselProps) {
  return (
    <>
      {props.isLoading ? (
        <div
          role="status"
          className="bg-black-light/30 grid aspect-square w-full flex-shrink-0 animate-pulse place-content-center rounded"
        >
          <IoImageOutline className="text-black-light text-4xl" />
        </div>
      ) : (
        <section
          className={`grid snap-x snap-mandatory grid-flow-col grid-cols-none gap-2 overflow-x-auto overscroll-contain 
          ${props.data?.length > 1 ? 'auto-cols-[94%]' : 'auto-cols-[100%]'}`}
        >
          {props.data.map((image, i) => {
            return (
              <figure
                className="bg-apricot relative aspect-square w-full snap-start rounded-3xl"
                key={i}
              >
                <Image
                  key={i}
                  src={image}
                  className="rounded-3xl object-cover"
                  layout="fill"
                  alt={image}
                  priority
                />
              </figure>
            );
          })}
        </section>
      )}
    </>
  );
}

export default ImagesCarousel;
