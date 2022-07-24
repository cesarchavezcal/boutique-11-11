import { IoAlertCircleSharp } from 'react-icons/io5';

/* eslint-disable-next-line */
export interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div
      role={'dialog'}
      className="bg-white flex justify-center items-center rounded-full p-1"
    >
      <IoAlertCircleSharp
        role={'img'}
        className="text-base mr-2 text-warning"
      />
      <p className="text-black-light">{props.message}</p>
    </div>
  );
}

export default ErrorMessage;
