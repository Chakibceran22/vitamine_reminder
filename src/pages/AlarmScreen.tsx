import { createSignal, onCleanup } from "solid-js";
import { Slider } from "@kobalte/core/slider";
import { Separator } from "@kobalte/core/separator";
import { Check, Clock, ArrowLeftRight } from "lucide-solid";

interface AlarmScreenProps {
  onDismiss: () => void;
  onReschedule: () => void;
}

export const AlarmScreen = (props: AlarmScreenProps) => {
  const [now, setNow] = createSignal(new Date());
  const [value, setValue] = createSignal([50]);
  const [result, setResult] = createSignal<"none" | "confirmed" | "rescheduled">("none");

  const timer = setInterval(() => setNow(new Date()), 1000);
  onCleanup(() => clearInterval(timer));

  const hours = () => now().getHours().toString().padStart(2, "0");
  const minutes = () => now().getMinutes().toString().padStart(2, "0");

  const [colonVisible, setColonVisible] = createSignal(true);
  const blink = setInterval(() => setColonVisible((v) => !v), 1000);
  onCleanup(() => clearInterval(blink));

  // Normalized progress: -1 (left/reschedule) to +1 (right/confirm)
  const progress = () => (value()[0] - 50) / 40;

  const handleChange = (val: number[]) => {
    if (result() !== "none") return;
    const clamped = Math.max(13, Math.min(87, val[0]));
    setValue([clamped]);
  };

  const handleChangeEnd = (val: number[]) => {
    if (result() !== "none") return;
    const v = val[0];

    if (v >= 85) {
      setValue([87]);
      setResult("confirmed");
      setTimeout(() => props.onDismiss(), 400);
    } else if (v <= 15) {
      setValue([13]);
      setResult("rescheduled");
      setTimeout(() => props.onReschedule(), 400);
    } else {
      setValue([50]);
    }
  };

  const glowIntensity = () => Math.abs(progress()) * 0.5;

  return (
    <div class="min-h-screen bg-black flex flex-col items-center justify-between px-6 py-16 select-none">
      

      {/* Center */}
      <div class="flex flex-col items-center gap-7 mt-24">
        {/* Time */}
        <div class="flex items-baseline">
          <span
            class="text-[112px] leading-none font-thin text-white"
            style={{ "font-variant-numeric": "tabular-nums" }}
          >
            {hours()}
          </span>
          <span
            class="text-[92px] leading-none font-thin mx-1 transition-colors duration-200"
            classList={{ "text-neutral-800": !colonVisible(), "text-neutral-500": colonVisible() }}
          >
            :
          </span>
          <span
            class="text-[112px] leading-none font-thin text-white"
            style={{ "font-variant-numeric": "tabular-nums" }}
          >
            {minutes()}
          </span>
        </div>

        <Separator class="w-8 h-px bg-neutral-800 border-none" />

        <p class="text-[13px] font-normal text-neutral-500 text-center tracking-widest uppercase">
          Time to take your vitamins
        </p>
      </div>

      {/* Bottom slider area */}
      <div class="w-full max-w-sm flex flex-col items-center gap-6">
        {/* Side labels */}
        <div class="w-full flex justify-between px-2">
          <div class="flex flex-col items-center gap-1.5">
            <Clock
              size={16}
              class="transition-colors duration-200"
              classList={{
                "text-white": result() === "rescheduled",
                "text-neutral-700": result() !== "rescheduled" && progress() >= 0,
                "text-neutral-400": result() !== "rescheduled" && progress() < 0,
              }}
            />
            <span
              class="text-[10px] font-medium tracking-[0.15em] uppercase transition-colors duration-200"
              classList={{
                "text-white": result() === "rescheduled",
                "text-neutral-700": result() !== "rescheduled" && progress() >= 0,
                "text-neutral-400": result() !== "rescheduled" && progress() < 0,
              }}
            >
              Later
            </span>
          </div>
          <div class="flex flex-col items-center gap-1.5">
            <Check
              size={16}
              class="transition-colors duration-200"
              classList={{
                "text-white": result() === "confirmed",
                "text-neutral-700": result() !== "confirmed" && progress() <= 0,
                "text-neutral-400": result() !== "confirmed" && progress() > 0,
              }}
            />
            <span
              class="text-[10px] font-medium tracking-[0.15em] uppercase transition-colors duration-200"
              classList={{
                "text-white": result() === "confirmed",
                "text-neutral-700": result() !== "confirmed" && progress() <= 0,
                "text-neutral-400": result() !== "confirmed" && progress() > 0,
              }}
            >
              Took them
            </span>
          </div>
        </div>

        {/* Kobalte Slider */}
        <Slider
          value={value()}
          onChange={handleChange}
          onChangeEnd={handleChangeEnd}
          minValue={0}
          maxValue={100}
          step={1}
          class="relative w-[80%] touch-none"
          aria-label="Alarm response slider"
        >
          <Slider.Track
            class="relative w-full h-[60px] rounded-full overflow-hidden"
            style={{
              background: "rgb(15,15,15)",
              "box-shadow": "inset 0 2px 4px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            {/* Glow container (clipped) */}
            <div class="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              {/* Right glow (confirm direction) */}
              <div
                class="absolute inset-y-0 rounded-full"
                style={{
                  left: "50%",
                  width: progress() > 0 ? `${progress() * 60}%` : "0%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1))",
                  opacity: result() === "confirmed" ? 1 : glowIntensity(),
                  transition: "opacity 0.2s",
                }}
              />

              {/* Left glow (reschedule direction) */}
              <div
                class="absolute inset-y-0 rounded-full"
                style={{
                  right: "50%",
                  width: progress() < 0 ? `${Math.abs(progress()) * 60}%` : "0%",
                  background: "linear-gradient(270deg, transparent, rgba(255,255,255,0.06))",
                  opacity: result() === "rescheduled" ? 1 : glowIntensity(),
                  transition: "opacity 0.2s",
                }}
              />

              {/* Center notch */}
              <div class="absolute top-1/2 left-1/2 -translate-x-px -translate-y-1/2 w-0.5 h-4 rounded-full bg-neutral-800" />
            </div>

            <Slider.Fill class="absolute h-full" />

            <Slider.Thumb
              class=" absolute top-[0.4rem] w-[48px] h-[48px] rounded-full flex items-center justify-center outline-none cursor-grab active:cursor-grabbing"
              style={{
                background: "rgb(255,255,255)",
                "box-shadow":
                  result() !== "none"
                    ? "0 0 24px rgba(255,255,255,0.35), 0 2px 10px rgba(0,0,0,0.4)"
                    : `0 0 ${8 + glowIntensity() * 30}px rgba(255,255,255,${0.06 + glowIntensity() * 0.35}), 0 2px 10px rgba(0,0,0,0.5)`,
                transition: "box-shadow 0.2s",
              }}
            >
              <Slider.Input />
              <div class="pointer-events-none text-black">
                {result() === "confirmed" ? (
                  <Check size={20} stroke-width={2.5} />
                ) : result() === "rescheduled" ? (
                  <Clock size={20} stroke-width={2} />
                ) : (
                  <ArrowLeftRight size={18} stroke-width={1.5} class="opacity-30" />
                )}
              </div>
            </Slider.Thumb>
          </Slider.Track>
        </Slider>

        {/* Hint */}
        <p
          class="text-[10px] text-neutral-700 tracking-[0.2em] uppercase transition-opacity duration-300"
          style={{ opacity: result() === "none" ? 1 : 0 }}
        >
          Slide to respond
        </p>
      </div>
    </div>
  );
};
