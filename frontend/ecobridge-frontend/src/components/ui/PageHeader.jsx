export default function PageHeader({

    title,

    subtitle,

}) {

    return (

        <div className="mb-10">

            <h1 className="text-4xl md:text-5xl font-bold text-green-700">

                {title}

            </h1>

            <p className="text-gray-500 mt-2 text-lg">

                {subtitle}

            </p>

        </div>

    );

}