
import React from "react"

export const StarIcon = ({
    fill = 0,
    className = "w-4 h-4"
}: {
    fill?: number // 0 to 1
    className?: string
}) => {
    const id = React.useId()
    const percentage = Math.min(Math.max(fill, 0), 1) * 100

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
        >
            <defs>
                <linearGradient id={id}>
                    <stop offset={`${percentage}%`} stopColor="currentColor" />
                    <stop offset={`${percentage}%`} stopColor="transparent" />
                </linearGradient>
            </defs>
            <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                fill={`url(#${id})`}
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
