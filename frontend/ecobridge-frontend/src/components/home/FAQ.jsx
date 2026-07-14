import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaQuestionCircle,
} from "react-icons/fa";

const faqs = [
  {
    question: "What is EcoBridge?",
    answer:
      "EcoBridge is an intelligent waste management platform that connects waste generators with verified recyclers using secure authentication and smart geo-matching.",
  },
  {
    question: "Who can use EcoBridge?",
    answer:
      "Individuals, businesses, institutions and recycling organizations can register as either Waste Generators or Recycler Partners.",
  },
  {
    question: "How does the matching system work?",
    answer:
      "Nearby recyclers are matched using location, waste category and availability to provide efficient pickup recommendations.",
  },
  {
    question: "Can I track my waste after creating a listing?",
    answer:
      "Yes. Every listing can be tracked from creation to reservation and final pickup through your personal dashboard.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. EcoBridge uses JWT authentication, role-based authorization and secure APIs to protect your information.",
  },
  {
    question: "Is EcoBridge free to use?",
    answer:
      "Yes. The platform is free for users and is focused on encouraging sustainable recycling practices.",
  },
];

export default function FAQ() {

  const [open, setOpen] = useState(0);

  return (

<section
id="faq"
className="relative overflow-hidden bg-[#101411] py-28"
>

<div className="absolute inset-0 overflow-hidden">

<div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#7A9B33]/10 blur-[150px]" />

<div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[170px]" />

</div>

<div className="relative z-10 mx-auto max-w-5xl px-6">

<motion.div

initial={{opacity:0,y:40}}

whileInView={{opacity:1,y:0}}

viewport={{once:true}}

transition={{duration:.7}}

className="text-center"

>

<span className="inline-block rounded-full border border-[#7A9B33]/30 bg-[#7A9B33]/10 px-5 py-2 text-sm font-medium text-[#C7D59F]">

FREQUENTLY ASKED QUESTIONS

</span>

<h2 className="mt-8 text-5xl font-black text-white">

Have

<span className="text-[#A4B465]"> Questions? </span>

We've Got Answers.

</h2>

<p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">

Everything you need to know before joining the EcoBridge ecosystem.

</p>

</motion.div>

<div className="mt-20 space-y-6">

{faqs.map((faq,index)=>(

<motion.div

key={index}

initial={{opacity:0,y:25}}

whileInView={{opacity:1,y:0}}

viewport={{once:true}}

transition={{

delay:index*.08,

duration:.45

}}

className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"

>

<button

onClick={()=>setOpen(open===index?null:index)}

className="flex w-full items-center justify-between px-8 py-7 text-left"

>

<div className="flex items-center gap-5">

<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7A9B33]/15 text-[#A4B465]">

<FaQuestionCircle/>

</div>

<h3 className="text-xl font-semibold text-white">

{faq.question}

</h3>

</div>

<motion.div

animate={{

rotate:open===index?180:0

}}

>

<FaChevronDown className="text-orange-400"/>

</motion.div>

</button>

<AnimatePresence>

{open===index&&(

<motion.div

initial={{height:0,opacity:0}}

animate={{height:"auto",opacity:1}}

exit={{height:0,opacity:0}}

transition={{duration:.3}}

className="overflow-hidden"

>

<p className="px-8 pb-8 leading-8 text-gray-400">

{faq.answer}

</p>

</motion.div>

)}

</AnimatePresence>

</motion.div>

))}

</div>

</div>

</section>

  );

}