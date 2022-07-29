import { IoAlertCircleSharp } from 'react-icons/io5';

/* eslint-disable-next-line */
export interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div
      role={'dialog'}
      className="flex items-center justify-center rounded-full bg-white p-1"
    >
      <IoAlertCircleSharp
        role={'img'}
        className="text-warning mr-2 text-base"
      />
      <p className="text-black-light">{props.message}</p>
    </div>
  );
}

export default ErrorMessage;
