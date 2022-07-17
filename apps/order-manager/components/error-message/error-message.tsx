import { IoAlertCircleSharp } from 'react-icons/io5';

/* eslint-disable-next-line */
export interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage(props: ErrorMessageProps) {
  return (
    <p className="text-xs font-normal text-left text-white bg-red-700 flex justify-center items-center rounded-full p-1">
      <IoAlertCircleSharp className="text-base mr-2" />
      {props.message}
    </p>
  );
}

export default ErrorMessage;
