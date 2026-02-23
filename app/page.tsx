import React from 'react'
import CalculatorSection from "./components/CalculatorSection";
import Link from 'next/link';
import Image from 'next/image';

const CalculatorCard = ({ href, title, description, color, iconSrc, buttonText }: any) => (
  <Link href={href} className="group relative flex flex-col bg-white border-2 border-black rounded-[32px] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-full">
    <div className={`w-20 h-20 rounded-2xl ${color} border-[1.5px] border-black mb-6 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform`}>
      <Image src={iconSrc} alt={title} width={48} height={48} className="w-12 h-12" />
    </div>
    <h3 className="text-3xl font-black mb-4 tracking-tight">{title}</h3>
    <p className="text-slate-600 font-medium mb-8 leading-relaxed">
      {description}
    </p>
    <div className={`mt-auto w-full py-4 rounded-xl border-[1.5px] border-black font-black text-center transition-all ${color === 'bg-[#F4C700]' ? 'bg-[#F4C700] group-hover:bg-[#FFD700]' : 'bg-[#0066FF] text-white group-hover:bg-[#3385FF]'}`}>
      {buttonText}
    </div>
  </Link>
);

export default function CalculatorPage() {
  return (
    <CalculatorSection>
      <div className="flex flex-col items-center justify-center pt-8 pb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
          CHOOSE YOUR <br className="hidden md:block" />
          <span className="text-[#0066FF]">SAVINGS TOOL.</span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl font-bold max-w-2xl mb-16">
          Whether you&apos;re looking to automate tasks or optimize software costs, we have the right calculator to help you scale.
        </p>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl text-left">
          <CalculatorCard
            href="/automation"
            title="Automation Savings"
            description="Calculate how much time and money your team can save by implementing custom automation workflows and AI integrations."
            color="bg-[#F4C700]"
            iconSrc="/Images/clock.png"
            buttonText="Calculate Time Saved"
          />
          <CalculatorCard
            href="/comparison"
            title="Cost Comparison"
            description="Compare your current software stack costs against optimized alternatives to find immediate savings opportunities."
            color="bg-[#0066FF]"
            iconSrc="/Images/Price_Tag.png"
            buttonText="Compare stack costs"
          />
        </div>
      </div>
    </CalculatorSection>
  )
}
