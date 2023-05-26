import { Documentations } from "model/Documentation"
import Link from "next/link"

export default function Page() {
    console.log(Documentations.map(e =>
        e.id ? e.id : ""
    ));
    return (
        <main className="pt-48 md:pt-20 lg:pt-24 mx-auto grid-cols-[25%_75%] grid-rows-1 grid">
            <div className="overflow-scroll fixed">
                <div></div>
                <div className="grid auto-rows-max grid-cols-1 mx-2 mr-4">
                    {
                        Documentations.map((elem, ind) =>
                            elem.id ? <Link href={`#${elem.id}`} key={`${ind + 1}`} className="border-l-4 pl-4 border-gray-400 py-1">{elem.title}</Link> : <></>
                        )
                    }
                </div>
            </div>
            <div></div>
            <div>321</div>
        </main>
    )
}