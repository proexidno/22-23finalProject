import { Documentations } from "model/Documentation"
import { Fragment } from "react"

function NumbersToLists({ str }) {
    let lis = str.replaceAll(/ {8}/g, "").split(/\d:\n\n/g)
    lis.shift()
    return (
        <ol start={Number(str[0])} className="list-decimal pl-6">
            {lis.map((e, ind) => (
                <li className="mb-4 last:mb-0" key={ind} dangerouslySetInnerHTML={{ __html: e.replaceAll("\n", "<br />") }} />
            ))}
        </ol>
    )
}
export default function Page() {

    return (
        <main className="pt-48 md:pt-20 lg:pt-24 mx-auto grid-cols-1 lg:grid-cols-[20%_80%] grid-rows-1 grid xl:grid-cols-[16%_83%]">
            <div className="overflow-auto fixed xl:w-1/6 lg:w-1/5 h-screen">
                <div></div>
                <div className="lg:grid auto-rows-max grid-cols-1 mx-2 mr-4 hidden sm:hidden md:hidden">
                    {
                        Documentations.map(elem =>
                            elem.id ? <a href={`#${elem.id}`} key={`a-${elem.id}`} className="border-l-4 pl-4 border-gray-400 py-1">{elem.title}</a> : <></>
                        )
                    }
                </div>
            </div>
            <div className="hidden sm:hidden md:hidden lg:block"></div>
            <div className="pl-4 text-base sm:text-lg md:text-lg lg:text-xl sm:mx-12 md:mx-10 lg:mx-6 relative">
                <h1 className="absolute top-2 sm:text-xl md:text-xl lg:text-5xl -left-4">Maths Documentation</h1>
                {
                    Documentations.map((elem, ind) => elem.id ? (
                        <Fragment key={elem.id}>
                            {ind === 0 ? <></> : <hr className="my-12 w-full" />}
                            <div id={elem.id} className={ind === 0 ? "pt-20" : ""}>
                                <h1 className="relative right-4 mb-6">{elem.title}</h1>
                                {
                                    ["number-one-five", "numbers-six-nine"].includes(elem.id) ?
                                        <NumbersToLists str={elem.description} />
                                        : <div className="mt-3 text-base sm:text-lg md:text-lg lg:text-xl">
                                            {
                                                elem.description.split("\n\n").map((splitdelem, pind) => (
                                                    <p key={`${elem.id}-p-${pind}`} className="">
                                                        {
                                                            splitdelem.split("\n").map((elem, spanind) => (
                                                                <span key={spanind} className="mt-1 block first:mt-3 last:mt-8">{elem}</span>
                                                            ))
                                                        }
                                                    </p>
                                                ))
                                            }
                                        </div>
                                }

                            </div>
                        </Fragment>) : <></>)
                }
            </div>
        </main>
    )
}