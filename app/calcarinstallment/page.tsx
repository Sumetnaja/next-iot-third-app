"use client";
import SauHeader from "@/components/SauHeader";
import Image from "next/image";
import carpicture from "@/assets/images/carpicture.png";
import SauFooter from "@/components/SauFooter";
import { useState } from "react";

export default function Page() {
  // สร้าง state เพื่อจัดการกับค่าข้อมูล
  const [carPrice, setCarPrice] = useState("");
  const [downPercent, setDownPercent] = useState(10);
  const [months, setMonths] = useState(12);
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPay, setMonthlyPay] = useState("0.00");

  // ฟังก์ชันคำนวณค่างวดรถยนต์
  const handleBmrCalClick = () => {
    if (!carPrice || !interestRate) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const price = Number(carPrice);
    const rate = Number(interestRate);
    const years = months / 12;

    // ยอดจัด
    const loanAmount = price - (price * downPercent) / 100;

    // ดอกเบี้ยทั้งหมด
    const totalInterest = loanAmount * (rate / 100) * years;

    // ค่างวดต่อเดือน
    const monthlyPayment = (loanAmount + totalInterest) / months;

    console.log("ยอดจัด:", loanAmount);
    console.log("ดอกเบี้ยทั้งหมด:", totalInterest);
    console.log("ค่างวดต่อเดือน:", monthlyPayment.toFixed(2));
    setMonthlyPay(monthlyPayment.toFixed(2));
  };

  return (
    <>
      {/* ส่วนของการแสดง SauHeader */}
      <SauHeader />

      <div
        className="p-10 w-3/5 mx-auto mt-20 border border-gray-100 rounded-xl
                    flex flex-col justify-center items-center
                    shadow-xl"
      >
        {/* ส่วนแสดงรูปจาก Internet */}
        <Image
          src={carpicture}
          alt="car"
          width={80}
          height={37}
          className="rounded-xl mb-10"
        />

        {/* ส่วนแสดงชื่อการคำนวณ */}
        <h1 className="text-xl text-center text-blue-600 font-bold">
          โปรแกรมคำนวณค่างวดรถยนต์
        </h1>

        {/* ส่วนของการป้อนราคารถ ดอกเบี้ยต่อปี */}
        <div className="w-3/5 mt-5">
          <div className="mb-4">
            <label htmlFor="carprice" className="block mb-1 font-medium">
              ป้อนราคารถ (บาท)
            </label>
            <input
              type="number"
              id="carprice"
              value={carPrice}
              onChange={(e) => setCarPrice(e.target.value)}
              className="bg-amber-50 p-2 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">เงินดาวน์ (%)</label>
            <div className="flex gap-4">
              {[10, 20, 30, 40].map((value) => (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={downPercent === value}
                    onChange={() => setDownPercent(value)}
                  />
                  {value}%
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">
              เลือกจำนวนเดือนผ่อนชำระ
            </label>
            <select
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="bg-amber-50 p-2 w-full rounded"
            >
              {[12, 24, 36, 48].map((m) => (
                <option key={m} value={m}>
                  {m} เดือน
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">
              ป้อนอัตราดอกเบี้ยต่อปี (%)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="bg-amber-50 p-2 w-full rounded"
            />
          </div>

          <button
            onClick={handleBmrCalClick}
            className="w-full bg-blue-500 hover:bg-blue-700
                          text-white font-bold p-2 mt-5 rounded"
          >
            คำนวณค่างวดรถยนต์
          </button>
        </div>
        {/* ส่วนของการแสดงผล BMI */}
        <div className="w-3/5 mt-5 bg-gray-300 p-5 rounded">
          <h2 className="text-lg text-center font-bold mb-1 text-gray-600">
            ค่างวดต่อเดือน
          </h2>
          <h2 className="text-3xl text-center font-bold mb-1 text-red-600">
            {monthlyPay}
          </h2>
        </div>
        {/* ส่วนของการแสดง SauFooter */}
        <SauFooter />
      </div>
    </>
  );
}