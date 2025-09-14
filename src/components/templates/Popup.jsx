import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPopup } from "../../store/popupSlice";

/**
 * ToastContainer renders multiple popups stacked vertically.
 * Each popup has its own timer and close button.
 */
export function Popup() {
  const dispatch = useDispatch();
  const popups = useSelector((state) => state.popup.toasts || []); // array of popups

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
      {popups.map((toast) => (
        <Toast key={toast.id} toast={toast} dispatch={dispatch} />
      ))}
    </div>
  );
}

/**
 * Single Toast component
 */
function Toast({ toast, dispatch }) {
  const { id, message, type } = toast;
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const totalDuration = 6000; // 6 seconds
    const interval = 100;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress(
        Math.max(0, ((totalDuration - elapsed) / totalDuration) * 100)
      );

      if (elapsed >= totalDuration) {
        clearInterval(timer);
        dispatch(clearPopup(id));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [dispatch, id]);

  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";
  const progressBg = type === "success" ? "bg-green-800" : "bg-red-800";
  const progressFill = type === "success" ? "bg-green-100" : "bg-red-100";

  return (
    <div className="min-w-[300px] max-w-md bg-white border shadow-lg rounded-lg overflow-hidden">
      <div
        className={`flex justify-between items-center p-2 ${bgColor} text-white font-semibold`}
      >
        <span>{type === "success" ? "Success" : "Error"}</span>
        <button
          onClick={() => dispatch(clearPopup(id))}
          className="text-white font-bold text-lg"
        >
          &times;
        </button>
      </div>
      <div className="p-3 text-sm">
        <span>{message}</span>
        <div className={`mt-2 w-full h-1 rounded ${progressBg}`}>
          <div
            className={`h-1 rounded ${progressFill}`}
            style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
          />
        </div>
      </div>
    </div>
  );
}
