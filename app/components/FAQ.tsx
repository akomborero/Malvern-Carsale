'use client'; 
import { useState } from 'react';

const faqData = [
  {
    question: "How do I know I'm getting a fair price for my car?",
    answer: "At  Qaulity import cars we use real-time market data to compare thousands of similar listings. Our 'Deal Rating' system helps you see exactly how a car's price compares to the local market average."
  },
  {
    question: "Can I buy a car entirely online?",
    answer: "Yes! You can browse our inventory, apply for financing, and even arrange for home delivery. Our digital process is designed to be seamless and transparent."
  },
  {
    question: "What is the Qaulity import cars inspection process?",
    answer: "Every vehicle in our showroom undergoes a rigorous 150-point inspection by certified technicians to ensure safety, reliability, and mechanical integrity."
  },
  {
    question: "Do you offer financing for all credit types?",
    answer: "We work with a diverse network of lenders to provide financing options for a wide range of credit scores."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-20 bg-gray-50">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900 text-lg">{faq.question}</span>
                <span className={`text-2xl transition-transform ${openIndex === i ? 'rotate-45' : 'rotate-0'}`}>+</span>
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-600 font-medium">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}