import { Link } from "react-router-dom";

interface BottomWarningInterface {
  label: string;
  buttonText: string;
  to: string;
}

export function BottomWarning({ label, buttonText, to }: BottomWarningInterface) {
  console.log("BottomWarning rendered");
  return (
    <div className="py-2 text-sm flex justify-center">
      <span>{label}</span>
      <Link className="pl-1 underline text-blue-600 hover:text-blue-800" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}
