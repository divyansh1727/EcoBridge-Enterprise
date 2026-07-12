export default function AppButton({

    children,

    onClick,

    type = "button",

    className = "",

}) {

    return (

        <button

            type={type}

            onClick={onClick}

            className={`
                bg-green-600
                hover:bg-green-700
                text-white
                font-semibold
                rounded-xl
                px-6
                py-3
                transition
                shadow-md
                hover:shadow-xl
                ${className}
            `}

        >

            {children}

        </button>

    );

}