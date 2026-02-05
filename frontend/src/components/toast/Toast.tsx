import { X, CheckCircle2 } from "lucide-react";

type ToastProps = {
  open: boolean;
  title?: string;
  message?: string;
  onClose?: () => void;
};

export function Toast({
  open,
  title = "Success",
  message = "You’re all set.",
  onClose,
}: ToastProps) {
  return (
    <div
      className={[
        "fixed bottom-6 right-6 z-50 w-[340px] sm:w-[380px]",
        "transform-gpu transition-transform duration-500 ease-in-out",
        open ? "translate-x-0" : "translate-x-[130%] pointer-events-none",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] shadow-xl">
        <div
          className={[
            "rounded-2xl border",
            "bg-[#F0F2F0]/95 backdrop-blur-md border-black/5",
            "text-[#000C40]",
            "dark:bg-[#000C40]/85 dark:border-white/10 dark:text-[#F0F2F0]",
          ].join(" ")}
        >
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div
                className={[
                  "mt-0.5 grid h-10 w-10 place-items-center rounded-xl",
                  "bg-white/70 border border-black/5",
                  "dark:bg-white/10 dark:border-white/10",
                ].join(" ")}
              >
                <CheckCircle2 className="h-5 w-5 text-[#FF7E5F]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{title}</p>
                    <p className="mt-1 text-sm text-[#000C40]/80 dark:text-purple-100 leading-snug">
                      {message}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className={[
                      "shrink-0 rounded-lg p-1.5",
                      "text-[#000C40]/70 hover:text-[#000C40] hover:bg-black/5",
                      "dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10",
                      "transition",
                    ].join(" ")}
                    aria-label="Close toast"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 h-px w-full bg-gradient-to-r from-[#FF7E5F]/60 via-[#FEB47B]/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
