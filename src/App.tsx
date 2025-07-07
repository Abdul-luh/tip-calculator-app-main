import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { Form } from "./components/ui/form";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";

interface FormData {
  bill: number;
}

function App() {
  const [tipPercentage, setTipPercentage] = useState<number | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState<number | "">("");
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = ({ bill }: FormData) => {
    if (!tipPercentage || !numberOfPeople || numberOfPeople <= 0) {
      alert("Please enter all values correctly.");
      return;
    }

    const tip = (bill * tipPercentage) / 100;
    const total = bill + tip;
    const perPersonTip = tip / numberOfPeople;
    const perPersonTotal = total / numberOfPeople;

    setTipAmount(perPersonTip);
    setTotalAmount(perPersonTotal);
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
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Bill Input */}
          <div className="space-y-1">
            <Label htmlFor="bill" className="text-grey-500 uppercase text-sm">
              Bill
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-400 text-xl">
                $
              </span>
              <Input
                id="bill"
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                {...register("bill", { required: true, valueAsNumber: true })}
                className="pl-8 text-right text-xl font-bold text-green-900 bg-grey-50 w-full"
              />
            </div>
          </div>

          {/* Tip Selection */}
          <div className="space-y-2">
            <Label className="text-grey-500 uppercase text-sm">
              Select Tip %
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {[5, 10, 15, 25, 50].map((percent) => (
                <button
                  key={percent}
                  type="button"
                  className={`text-xl font-bold py-2 rounded-lg ${
                    tipPercentage === percent
                      ? "bg-green-400 text-green-900"
                      : "bg-green-900 text-white hover:bg-green-400 hover:text-green-900"
                  }`}
                  onClick={() => setTipPercentage(percent)}
                >
                  {percent}%
                </button>
              ))}
              <Input
                type="number"
                placeholder="Custom"
                value={tipPercentage ?? ""}
                onChange={(e) => setTipPercentage(Number(e.target.value))}
                className="text-center text-xl font-bold bg-grey-50"
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
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                placeholder="0"
                className="pl-8 text-right text-xl font-bold text-green-900 bg-grey-50 w-full"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-green-900 text-white font-bold py-2 rounded-lg hover:bg-green-400 hover:text-green-900 transition-colors"
          >
            Calculate
          </button>
        </Form>

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
            className="mt-8 w-full bg-green-400 text-green-900 font-bold py-2 rounded-lg hover:opacity-90"
            onClick={() => {
              reset();
              setTipPercentage(null);
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
