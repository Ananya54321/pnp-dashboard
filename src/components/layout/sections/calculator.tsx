"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Calculator as CalculatorIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function Calculator() {
  const { theme } = useTheme();  
  const isDarkMode = theme === "dark";  
  const [subscribers, setSubscribers] = useState(1000);

  const twitterCost = subscribers * 0.8;
  const platformCost = subscribers * 0;

  const bgColor = isDarkMode ? "bg-black" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const cardBg = isDarkMode ? "bg-gray-800/50" : "bg-gray-100";
  const borderColor = isDarkMode ? "border-slate-500" : "border-gray-300";

  return (
    <section className={`w-full ${bgColor} py-16 md:py-24`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className={`border ${borderColor} rounded-2xl shadow-md shadow-blue-600/20 p-6 md:p-8 max-w-3xl mx-auto`}>
          <div className="flex items-center mb-6">
            <CalculatorIcon className="h-8 w-8 text-blue-600" />
            <h3 className={`ml-3 text-2xl font-bold ${textColor}`}>Cost Calculator</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="subscribers" className={`block text-sm font-medium ${textColor} mb-2`}>
                Target Subscribers
              </label>
              <Slider
                defaultValue={[subscribers]}
                min={100}
                max={10000}
                step={100}
                onValueChange={(value: number[]) => setSubscribers(value[0])}
              />
              <div className={`text-center mt-2 text-lg font-semibold ${textColor}`}>
                {subscribers.toLocaleString()} subscribers
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className={`${cardBg} p-6 rounded-xl`}>
                <h4 className={`text-lg font-semibold ${textColor} mb-2`}>Online Ads Cost</h4>
                <p className={`text-3xl font-bold ${textColor}`}>
                  ${twitterCost.toLocaleString()}
                </p>
                <p className={`text-sm ${textColor} mt-1`}>Based on average CPA</p>
              </div>

              <div className={`${cardBg} p-6 rounded-xl`}>
                <h4 className={`text-lg font-semibold ${textColor} mb-2`}>Our Platform Cost</h4>
                <p className={`text-3xl font-bold text-green-500`}>
                  ${platformCost.toLocaleString()}
                </p>
                <p className={`text-sm ${textColor} mt-1`}>No upfront costs!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
