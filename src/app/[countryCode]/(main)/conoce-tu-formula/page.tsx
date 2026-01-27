import { getRegion } from "@lib/data/regions"
import QuizRoot from "@modules/quiz/templates/quiz-root"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function QuizPage(props: {
    params: Promise<{ countryCode: string }>
}) {
    const params = await props.params
    const { countryCode } = params
    const region = await getRegion(countryCode)

    if (!region) {
        return notFound()
    }

    return (
        <div className="bg-[#0f1717] min-h-screen">
            <QuizRoot countryCode={countryCode} region={region} />
        </div>
    )
}
