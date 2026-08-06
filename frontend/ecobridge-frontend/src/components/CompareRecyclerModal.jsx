import AppCard from "./ui/AppCard";
import AppButton from "./ui/AppButton";
import { useEffect, useState } from "react";
import RecyclerMap from "./maps/RecyclerMap";
import {
  getNearbyRecyclers,
  getPublicRecyclers,
} from "../services/matchingService";
import { recommendRecyclers } from "../utils/recommendationEngine";

export default function CompareRecyclerModal({
  open,
  onClose,
  waste,
}) {
    const [verifiedRecyclers, setVerifiedRecyclers] = useState([]);
const [publicRecyclers, setPublicRecyclers] = useState([]);
const [loading, setLoading] = useState(false);
  
  useEffect(() => {

    if (!open || !waste) return;

    const loadRecyclers = async () => {

        try {

            setLoading(true);

            const verifiedResponse =
                await getNearbyRecyclers(
                    waste.latitude,
                    waste.longitude
                );

            const publicResponse =
                await getPublicRecyclers(
                    waste.latitude,
                    waste.longitude
                );

            const ranked =
                recommendRecyclers(
                    verifiedResponse.data.verified,
                    waste
                );

            setVerifiedRecyclers(ranked);

            setPublicRecyclers(
                publicResponse.data
            );

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    loadRecyclers();

}, [open, waste]);
if (!open || !waste) return null;
if (loading) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#A4B465] border-t-transparent" />
    </div>
  );
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
     <AppCard className="w-full max-w-7xl max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-3xl font-bold text-white">
              ♻ Smart Recycler Comparison
            </h2>

            <p className="text-gray-400 mt-2">
              {waste.title}
            </p>
            <p className="text-sm text-gray-400 mt-2">

{verifiedRecyclers.length} verified recyclers •{" "}

{publicRecyclers.length} public recycling centers

</p>

          </div>

          <AppButton onClick={onClose}>
            Close
          </AppButton>

        </div>

        <div className="space-y-3">
            {verifiedRecyclers.length > 0 && (

    <div className="mb-6 rounded-xl border border-[#A4B465] bg-[#A4B465]/10 p-5">

        <h3 className="text-2xl font-bold text-[#A4B465]">
            🏆Best Recommendation
        </h3>

        <div className="mt-4 space-y-2 text-white">

            <p>
                <strong>Company:</strong>{" "}
                {verifiedRecyclers[0].companyName}
            </p>

            <p>
                <strong>Distance:</strong>{" "}
                {verifiedRecyclers[0].distanceKm?.toFixed(2)} km
            </p>

            <p>
                <strong>Price Offered:</strong>{" "}
                ₹{verifiedRecyclers[0].offeredPrice?.toFixed(2)}/kg
            </p>

            <p>
                <strong>ETA:</strong>{" "}
                {verifiedRecyclers[0].etaMinutes} mins
            </p>

            <p>
                <strong>Rating:</strong>{" "}
                ⭐ {verifiedRecyclers[0].rating}
            </p>
            <p>

<strong>Score:</strong>

{verifiedRecyclers[0].score}

</p>

        </div>
        

    </div>
    
    

)}

          <p className="text-gray-300">
            Waste Type: <strong>{waste.wasteType}</strong>
          </p>

          <p className="text-gray-300">
            Quantity:{" "}
            <strong>
              {waste.quantity} {waste.quantityUnit}
            </strong>
          </p>

          <p className="text-gray-300">
            Coordinates:
            {" "}
            {waste.latitude},
            {" "}
            {waste.longitude}
          </p>
          <div className="mt-8">
            <RecyclerMap
    waste={waste}
    verifiedRecyclers={verifiedRecyclers}
    publicRecyclers={publicRecyclers}
/>
<div className="mt-8" />


    <h3 className="mb-4 text-2xl font-bold text-white">
        Recycler Comparison
    </h3>

    <div className="overflow-x-auto rounded-xl border border-white/10">

        <table className="min-w-full">

            <thead className="bg-[#1B221D]">

                <tr>

                    <th className="px-4 py-3 text-left text-[#A4B465]">
                        Recycler
                    </th>

                    <th className="px-4 py-3 text-left text-[#A4B465]">
                        Distance
                    </th>

                    <th className="px-4 py-3 text-left text-[#A4B465]">
                        Price
                    </th>

                    <th className="px-4 py-3 text-left text-[#A4B465]">
                        Capacity
                    </th>

                    <th className="px-4 py-3 text-left text-[#A4B465]">
                        Rating
                    </th>

                    <th className="px-4 py-3 text-left text-[#A4B465]">
                        ETA
                    </th>

                    <th className="px-4 py-3 text-left text-[#A4B465]">
                        Score
                    </th>
                    <th className="px-4 py-3 text-left text-[#A4B465]">

Action

</th>

                </tr>

            </thead>

            <tbody>

                {verifiedRecyclers.map((recycler) => (

                    <tr
                        key={recycler.recyclerId}
                        className="border-t border-white/10"
                    >

                        <td className="px-4 py-4 text-white">

                            <div className="font-semibold">
                                {recycler.companyName}
                            </div>

                            {recycler.score === verifiedRecyclers[0]?.score && (

                                <span className="mt-1 inline-block rounded-full bg-[#A4B465]/20 px-2 py-1 text-xs text-[#A4B465]">

                                    🏆 Best Match

                                </span>

                            )}

                        </td>

                        <td className="px-4 py-4 text-gray-300">
                            {recycler.distanceKm?.toFixed(2)} km
                        </td>

                        <td className="px-4 py-4 text-green-400">
                            ₹{recycler.offeredPrice?.toFixed(2)}/kg
                        </td>

                        <td className="px-4 py-4 text-gray-300">
                            {recycler.availableCapacity} kg
                        </td>

                        <td className="px-4 py-4 text-yellow-400">
                            ⭐ {recycler.rating}
                        </td>

                        <td className="px-4 py-4 text-gray-300">
                            {recycler.etaMinutes} mins
                        </td>

                        <td className="px-4 py-4 font-bold text-[#A4B465]">
                            {recycler.score}
                        </td>
                        <td className="px-4 py-4">

<a
    href={`https://www.google.com/maps/dir/?api=1&destination=${recycler.latitude},${recycler.longitude}`}
    target="_blank"
    rel="noreferrer"
>

<AppButton>

Navigate

</AppButton>

</a>

</td>

                    </tr>

                ))}

            </tbody>

        </table>

    </div>

</div>
<div className="mt-10">

<h3 className="mb-4 text-2xl font-bold text-white">

Nearby Public Recycling Centers

</h3>

<div className="overflow-x-auto rounded-xl border border-white/10">

<table className="min-w-full">

<thead className="bg-[#1B221D]">

<tr>

<th className="px-4 py-3 text-left text-[#A4B465]">

Name

</th>

<th className="px-4 py-3 text-left text-[#A4B465]">

Latitude

</th>

<th className="px-4 py-3 text-left text-[#A4B465]">

Longitude

</th>

<th className="px-4 py-3 text-left text-[#A4B465]">

Action

</th>

</tr>

</thead>

<tbody>

{publicRecyclers.length === 0 ? (

    <tr>

        <td
            colSpan={4}
            className="py-8 text-center text-gray-400"
        >
            No nearby public recycling centers found.
        </td>

    </tr>

) : (

    publicRecyclers.map((recycler, index) => (

        <tr
            key={index}
            className="border-t border-white/10"
        >

            <td className="px-4 py-4 text-white">
                {recycler.name}
            </td>

            <td className="px-4 py-4 text-gray-300">
                {recycler.latitude}
            </td>

            <td className="px-4 py-4 text-gray-300">
                {recycler.longitude}
            </td>

            <td className="px-4 py-4">

                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${recycler.latitude},${recycler.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                >

                    <AppButton>

                        Open Map

                    </AppButton>

                </a>

            </td>

        </tr>

    ))

)}

</tbody>

</table>

</div>

</div>

        </div>

      </AppCard>
    </div>

  );
}