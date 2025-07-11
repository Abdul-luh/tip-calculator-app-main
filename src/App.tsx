// App.tsx
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

interface FormData {
  bill: number;
  tip: number;
  people: number;
}

export default function App() {
  const {
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { bill: 0, tip: 0, people: 1 },
  });

  const watchedBill = watch("bill");
  const watchedTip = watch("tip");
  const watchedPeople = watch("people");
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  const { tipAmount, totalAmount } = useMemo(() => {
    const bill = watchedBill ?? 0;
    const tip = watchedTip ?? 0;
    const people = watchedPeople > 0 ? watchedPeople : 1;
    const tipValue = (bill * tip) / 100;
    const total = bill + tipValue;
    return {
      tipAmount: tipValue / people,
      totalAmount: total / people,
    };
  }, [watchedBill, watchedTip, watchedPeople]);

  const resetAll = () => {
    reset();
    setSelectedTip(null);
  };

  return (
    <main className="min-h-screen bg-grey-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Form */}
        <form className="space-y-6">
          <div>
            <Label
              className="text-sm text-cyan-dark uppercase tracking-wide"
              htmlFor="bill"
            >
              Bill
            </Label>
            <div className="relative mt-1 p-2">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-900 text-xl">
                $
              </span>
              <Input
                id="bill"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("bill", {
                  min: { value: 0.01, message: "Must be > 0" },
                  valueAsNumber: true,
                })}
                className="pl-10 text-right font-bold text-2xl bg-grey-200 border-none rounded-lg"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm text-cyan-dark uppercase tracking-wide">
              Select Tip %
            </Label>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 mt-2">
              {[5, 10, 15, 25, 50].map((percent) => (
                <button
                  key={percent}
                  type="button"
                  onClick={() => {
                    setValue("tip", percent, { shouldValidate: true });
                    setSelectedTip(percent);
                  }}
                  className={`rounded-lg p-3 font-bold text-white text-xl transition-colors duration-200
                    ${
                      selectedTip === percent
                        ? "bg-green-400 text-green-900"
                        : "bg-green-900 hover:bg-green-400 hover:text-green-900"
                    }`}
                >
                  {percent}%
                </button>
              ))}
              <Input
                type="text"
                placeholder="Custom"
                className="rounded-lg p-3 text-center font-bold text-2xl bg-gray-100 border-none "
                {...register("tip", {
                  min: { value: 0, message: "Min 0%" },
                  valueAsNumber: true,
                })}
                onFocus={() => setSelectedTip(null)}
              />
            </div>
          </div>

          <div>
            <Label
              className="text-sm text-cyan-dark uppercase tracking-wide"
              htmlFor="people"
            >
              Number of People
            </Label>
            <div className="relative mt-1">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                👤
              </span>
              <Input
                id="people"
                type="number"
                step={1}
                min={1}
                placeholder="0"
                {...register("people", {
                  min: { value: 1, message: "Must be > 0" },
                  valueAsNumber: true,
                })}
                className="pl-10 text-right font-bold text-xl bg-grey-200 rounded-lg border-none"
              />
            </div>
          </div>
        </form>

        {/* Result */}
        <section className="bg-green-900 text-white rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm">Tip Amount</p>
                <p className="text-xs text-grey-400">/ person</p>
              </div>
              <p className="text-3xl font-bold text-green-400">
                ${tipAmount.toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="text-sm">Total</p>
                <p className="text-xs text-grey-400">/ person</p>
              </div>
              <p className="text-3xl font-bold text-green-400">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
          </div>

          <button
            disabled={tipAmount === 0 && totalAmount === 0}
            onClick={resetAll}
            className={`w-full mt-6 rounded-lg py-3 font-bold text-green-900 bg-green-400 hover:opacity-80 transition-colors
              ${
                tipAmount === 0 && totalAmount === 0
                  ? "opacity-30 cursor-not-allowed"
                  : ""
              }`}
          >
            RESET
          </button>
        </section>
      </div>
    </main>
  );
}
