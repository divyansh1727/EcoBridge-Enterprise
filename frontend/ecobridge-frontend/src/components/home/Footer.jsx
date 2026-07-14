import logo from "../../assets/logo.png";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaLeaf,
  FaArrowUp,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export default function Footer() {

  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id) => {

    if (location.pathname !== "/") {

      navigate("/");

      setTimeout(() => {

        document
          .getElementById(id)
          ?.scrollIntoView({
            behavior: "smooth",
          });

      }, 300);

    } else {

      document
        .getElementById(id)
        ?.scrollIntoView({
          behavior: "smooth",
        });

    }

  };

  return (

<footer className="relative overflow-hidden bg-[#0B0F0D] text-white">

<div className="absolute inset-0 overflow-hidden">

<div className="absolute -top-40 left-0 h-[420px] w-[420px] rounded-full bg-[#7A9B33]/10 blur-[150px]" />

<div className="absolute bottom-[-180px] right-0 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[170px]" />

</div>

<div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

<div className="grid gap-14 lg:grid-cols-4">

{/* Brand */}

<div>

<img
src={logo}
alt="EcoBridge"
className="w-20"
/>

<h2 className="mt-6 text-3xl font-black">

EcoBridge

</h2>

<p className="mt-5 leading-8 text-gray-400">

An intelligent waste management platform connecting
waste generators and recyclers through secure
microservices, geo-matching and live analytics.

</p>

<div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#7A9B33]/30 bg-[#7A9B33]/10 px-5 py-2 text-sm text-[#C7D59F]">

<FaLeaf />

Building a Greener Tomorrow

</div>

</div>

{/* Navigation */}

<div>

<h3 className="text-xl font-bold">

Navigation

</h3>

<ul className="mt-6 space-y-4 text-gray-400">

<li
onClick={() => goToSection("home")}
className="cursor-pointer transition hover:text-[#A4B465]"
>
Home
</li>

<li
onClick={() => goToSection("features")}
className="cursor-pointer transition hover:text-[#A4B465]"
>
Features
</li>

<li
onClick={() => goToSection("how-it-works")}
className="cursor-pointer transition hover:text-[#A4B465]"
>
How It Works
</li>

<li
onClick={() => goToSection("faq")}
className="cursor-pointer transition hover:text-[#A4B465]"
>
FAQ
</li>

<li
onClick={() => goToSection("contact")}
className="cursor-pointer transition hover:text-[#A4B465]"
>
Contact
</li>

</ul>

</div>

{/* Platform */}

<div>

<h3 className="text-xl font-bold">

Platform

</h3>

<ul className="mt-6 space-y-4 text-gray-400">

<li>Smart Geo Matching</li>

<li>JWT Authentication</li>

<li>Analytics Dashboard</li>

<li>Microservices Architecture</li>

<li>Docker Deployment</li>

</ul>

</div>

{/* Connect */}

<div>

<h3 className="text-xl font-bold">

Connect

</h3>

<p className="mt-6 text-gray-400">

Let's build a cleaner and smarter recycling ecosystem together.

</p>

<div className="mt-8 flex gap-5 text-2xl">

<a
href="https://github.com/divyansh1727"
target="_blank"
rel="noreferrer"
className="transition hover:text-[#A4B465]"
>

<FaGithub />

</a>

<a
href="https://linkedin.com/in/divyansh1727"
target="_blank"
rel="noreferrer"
className="transition hover:text-[#A4B465]"
>

<FaLinkedin />

</a>

<a
href="mailto:divyansh1727@gmail.com"
className="transition hover:text-orange-400"
>

<FaEnvelope />

</a>

</div>

<button

onClick={()=>window.scrollTo({

top:0,

behavior:"smooth"

})}

className="mt-10 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-3 transition-all duration-300 hover:border-[#7A9B33]/40 hover:bg-[#7A9B33]/10"

>

Back to Top

<FaArrowUp/>

</button>

</div>

</div>

<div className="my-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

<div className="flex flex-col items-center justify-between gap-6 text-center text-gray-500 md:flex-row">

<p>

© 2026 EcoBridge. All Rights Reserved.

</p>

<p>

Designed & Developed by <span className="font-semibold text-[#A4B465]">Divyansh Singh</span>

</p>

</div>

</div>

</footer>

  );

}