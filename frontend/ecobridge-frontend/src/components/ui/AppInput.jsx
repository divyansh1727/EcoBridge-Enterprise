export default function AppInput({

    label,
    className = "",
    ...props

}) {

    return (

        <div>

            {label && (

                <label className="mb-3 block text-sm font-semibold tracking-wide text-gray-300">

                    {label}

                </label>

            )}

            <input

                {...props}

                className={`
                    w-full
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3.5
                    text-white
                    placeholder:text-gray-500
                    outline-none
                    transition-all
                    duration-300
                    focus:border-[#A4B465]
                    focus:ring-2
                    focus:ring-[#A4B465]/20
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    ${className}
                `}

            />

        </div>

    );

}