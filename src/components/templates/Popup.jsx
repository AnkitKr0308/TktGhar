import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPopup } from "../store/popupSlice";

export function Popup({ className }) {
  const dispatch = useDispatch();
  const { message, visible, type } = useSelector((state) => state.popup);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!visible) return;

    setProgress(100);

    const totalDuration = 6000;
    const interval = 100;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const newProgress = Math.max(
        0,
        ((totalDuration - elapsed) / totalDuration) * 100
      );
      setProgress(newProgress);

      if (elapsed >= totalDuration) {
        clearInterval(timer);
        dispatch(clearPopup());
      }
    }, interval);

    return () => clearInterval(timer);
  }, [message, visible, dispatch]);

  if (!visible) return null;

  const headerText = type === "success" ? "Success" : "Error";
  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";
  const progressBg = type === "success" ? "bg-green-800" : "bg-red-800";
  const progressFill = type === "success" ? "bg-green-100" : "bg-red-100";

  const defaultClass =
    "fixed top-5 right-5 transform translate-x-0 bg-white border shadow-lg rounded-lg z-50 min-w-[300px] max-w-md";

  return (
    <div className={className || defaultClass}>
      <div className={`p-4 rounded-t-lg ${bgColor} text-white font-semibold`}>
        {headerText}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button
            onClick={() => dispatch(clearPopup())}
            className="text-white font-bold text-lg"
          >
            &times;
          </button>
        </div>

        <div className={`mt-4 w-full h-1 rounded ${progressBg}`}>
          <div
            className={`h-1 rounded ${progressFill}`}
            style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
          />
        </div>
      </div>
    </div>
  );
}
