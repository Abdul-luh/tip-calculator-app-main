import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
// import { Form } from "./components/ui/form";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";

interface FormData {
  bill: number;
  tip: number;
  people: number;
}

function App() {
  const [numberOfPeople, setNumberOfPeople] = useState<number | "">("");
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmitData = ({ bill, tip, people }: FormData) => {
    if (!bill || !tip || !people) {
      return;
    }
    const tipValue = (bill * tip) / 100;
    const total = bill + tipValue;
    setTipAmount(tipValue / people);
    setTotalAmount(total / people);
  };

  return (
    <main className="bg-grey-200 min-h-screen w-full flex flex-col items-center justify-center gap-6">
      <p className="font-space text-grey-500 text-center text-xl tracking-widest uppercase">
        spli
        <br />
        tter
      </p>

      <div className="bg-white p-6 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Left side: Form */}
        <form onSubmit={handleSubmit(onSubmitData)} className="space-y-6">
          {/* Bill Input */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label htmlFor="bill" className="text-grey-500 uppercase text-sm">
                Bill
              </Label>

              {errors.bill && (
                <p className="text-red-500 text-sm">{errors.bill.message}</p>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-400 text-xl ">
                $
              </span>
              <Input
                id="bill"
                type="number"
                min={0.5}
                step="0.5"
                placeholder="0.00"
                {...register("bill", {
                  min: {
                    value: 0.5,
                    message: "must be greater than 0.4",
                  },
                  valueAsNumber: true,
                })}
                className={`pl-8 text-right text-xl font-bold text-green-900 bg-grey-50 w-full border-2 ${
                  errors.bill
                    ? "border-red-500"
                    : " focus:border-green-400 hover:border-green-400"
                }`}
              />
            </div>
          </div>

          {/* Tip Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-grey-500 uppercase text-sm">
                Select Tip %
              </Label>

              {errors.tip && (
                <p className="text-red-500 text-sm">{errors.tip.message}</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[5, 10, 15, 25, 50].map((percent) => (
                <button
                  key={percent}
                  type="button"
                  className={`bg-green-900 text-white font-bold p-4 rounded-lg hover:bg-grey-200 hover:text-green-900`}
                  onClick={() =>
                    setValue("tip", percent, { shouldValidate: true })
                  }
                >
                  {percent}%
                </button>
              ))}
              <Input
                type="number"
                placeholder="Custom"
                className={`rounded-lg p-5 h-full w-full font-bold text-grey-400 text-center border-2 ${
                  errors.tip
                    ? "border-red-500"
                    : " focus:border-green-400 hover:border-green-400"
                }`}
                {...register("tip", {
                  required: "Tip is required",
                  min: { value: 1, message: "Tip must be at least 1%" },
                })}
              />
            </div>
          </div>

          {/* Number of People */}
          <div className="space-y-1">
            <Label htmlFor="people" className="text-grey-500 uppercase text-sm">
              Number of People
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-400">
                👤
              </span>
              <Input
                id="people"
                type="number"
                min={1}
                step={1}
                {...register("people", {
                  required: "Number of people is required",
                  min: { value: 1, message: "Can't be zero" },
                  valueAsNumber: true,
                })}
                placeholder="0"
                className="pl-8 text-right text-xl font-bold text-green-900 bg-grey-50 w-full"
              />
            </div>
            {errors.people && (
              <p className="text-red-500 text-sm">{errors.people.message}</p>
            )}
          </div>

          {/* Submit Button */}
          {/* <button
            type="submit"
            className="mt-4 w-full bg-green-900 text-white font-bold py-2 rounded-lg hover:bg-green-400 hover:text-green-900 transition-colors"
          >
            Calculate
          </button> */}
        </form>

        {/* Right side: Output */}
        <section className="bg-green-900 text-white p-6 rounded-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">Tip Amount</p>
                <p className="text-xs text-grey-400">/ person</p>
              </div>
              <p className="text-3xl font-bold text-green-400">
                ${tipAmount.toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between items-center">
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
            className={`mt-8 w-full bg-green-400 text-green-900 font-bold py-2 rounded-lg hover:opacity-90  ${
              tipAmount === 0 && totalAmount === 0
                ? "bg-green-400/50 text-green-900/50 cursor-not-allowed"
                : "bg-green-400 text-green-900 hover:opacity-90"
            } `}
            disabled={tipAmount === 0 && totalAmount === 0}
            onClick={() => {
              reset();
              setNumberOfPeople("");
              setTipAmount(0);
              setTotalAmount(0);
            }}
          >
            RESET
          </button>
        </section>
      </div>
    </main>
  );
}

export default App;
