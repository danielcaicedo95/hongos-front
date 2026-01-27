
"use client"

import { Review } from "@lib/data/reviews"
import { StarIcon } from "./star-icon"

export const RatingSummary = ({ reviews }: { reviews: Review[] }) => {
    if (!reviews || !reviews.length) return null

    const average = reviews.length > 0
        ? reviews.reduce((acc, r) => acc + (Number(r.rating_score) || Number(r.rating) || 0), 0) / reviews.length
        : 0

    return (
        <a
            href="#reviews"
            className="flex items-center gap-3 my-2 w-fit hover:opacity-80 transition-opacity cursor-pointer group"
            onClick={(e) => {
                e.preventDefault();
                document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
            }}
        >
            <div className="flex text-[#e67e22]">
                {[1, 2, 3, 4, 5].map((starIndex) => {
                    const fill = Math.min(Math.max(average - (starIndex - 1), 0), 1)
                    return (
                        <StarIcon
                            key={starIndex}
                            fill={fill}
                            className="w-[1.2rem] h-[1.2rem]"
                        />
                    )
                })}
            </div>
            <div className="flex items-center gap-1.5 leading-none">
                <span className="text-[1.15rem] font-bold text-gray-800">
                    {average.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[1.15rem] text-slate-500 font-normal group-hover:underline">({reviews.length})</span>
            </div>
        </a>
    )
}
