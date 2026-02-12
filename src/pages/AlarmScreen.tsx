import { Button } from "@kobalte/core";
import { createSignal } from "solid-js";

interface AlarmScreenProps {
  onDismiss: () => void;
  onReschedule: () => void;
}

export const AlarmScreen = (props: AlarmScreenProps) => {
  const [now] = createSignal(new Date());

  const hours = () => now().getHours().toString().padStart(2, "0");
  const minutes = () => now().getMinutes().toString().padStart(2, "0");

  return (
    <div class="min-h-screen bg-white flex flex-col items-center justify-between px-6 py-12">
      {/* Header */}
      <div class="w-full max-w-sm">
        <p class="text-xs font-medium tracking-widest uppercase text-neutral-400">
          Vitamin Reminder
        </p>
      </div>

      {/* Center content */}
      <div class="flex flex-col items-center gap-10">
        {/* Time display */}
        <div class="flex items-baseline gap-1">
          <span class="text-8xl font-extralight tracking-tight text-black">
            {hours()}
          </span>
          <span class="text-7xl font-extralight text-neutral-300">:</span>
          <span class="text-8xl font-extralight tracking-tight text-black">
            {minutes()}
          </span>
        </div>

        {/* Label */}
        <div class="text-center space-y-2">
          <h1 class="text-lg font-semibold tracking-wide uppercase text-black">
            Time to take your vitamins
          </h1>
          <p class="text-sm text-neutral-400">
            Daily reminder
          </p>
        </div>

        {/* Pulse ring */}
        <div class="relative flex items-center justify-center">
          <div class="absolute w-28 h-28 rounded-full border border-neutral-200 animate-ping" style={{ "animation-duration": "2s" }} />
          <div class="w-20 h-20 rounded-full bg-black flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div class="w-full max-w-sm flex flex-col gap-3">
        <Button.Root
          class="w-full h-16 rounded-full bg-black hover:bg-neutral-800 active:bg-neutral-900 text-white font-medium text-base tracking-wide uppercase transition-colors"
          onClick={props.onDismiss}
        >
          I Took Them
        </Button.Root>

        <Button.Root
          class="w-full h-16 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 active:bg-neutral-100 text-black font-medium text-base tracking-wide uppercase transition-colors"
          onClick={props.onReschedule}
        >
          Reschedule
        </Button.Root>
      </div>
    </div>
  );
};
