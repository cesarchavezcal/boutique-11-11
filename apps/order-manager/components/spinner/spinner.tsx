/* eslint-disable-next-line */
export interface SpinnerProps {}

export function Spinner(props: SpinnerProps) {
  return (
    <div className="bg-apricot/50 fixed inset-0 z-50 grid h-full w-full place-content-center">
      <div className="shadow-black-light/5 rounded bg-white p-4 shadow-2xl">
        <svg
          className="text-apricot-dark h-8 w-8 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Spinner;
