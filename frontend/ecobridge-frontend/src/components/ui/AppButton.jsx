export default function AppButton({

    children,
    onClick,
    type = "button",
    className = "",
    disabled = false,
    variant = "primary",

}) {

    const variants = {

        primary:
            "bg-gradient-to-r from-[#7A9B33] to-[#91B03A] text-white hover:shadow-[0_0_30px_rgba(122,155,51,.35)]",

        secondary:
            "bg-white/5 border border-white/10 text-white hover:border-[#7A9B33]/40 hover:bg-[#7A9B33]/10",

        danger:
            "bg-red-600 text-white hover:bg-red-500",

    };

    return (

        <button

            type={type}
            onClick={onClick}
            disabled={disabled}

            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                px-6
                py-3.5
                font-semibold
                transition-all
                duration-300
                hover:-translate-y-1
                active:scale-[0.98]
                disabled:opacity-60
                disabled:cursor-not-allowed
                ${variants[variant]}
                ${className}
            `}

        >

            {children}

        </button>

    );

}