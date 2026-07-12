export default function AppCard({ children, className = "" }) {

    return (

        <div
            className={`
                bg-white
                rounded-3xl
                shadow-lg
                border
                border-gray-100
                p-6
                ${className}
            `}
        >

            {children}

        </div>

    );

}