export default function AppInput({

    label,

    ...props

}) {

    return (

        <div>

            <label className="block mb-2 font-semibold text-gray-700">

                {label}

            </label>

            <input

                {...props}

                className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-gray-50
                    px-4
                    py-3
                    focus:ring-2
                    focus:ring-green-500
                    outline-none
                "

            />

        </div>

    );

}