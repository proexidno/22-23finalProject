import { Documentations } from "model/documentation"
import { Fragment } from "react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "components/ui/sheet";
import { AiOutlineMenu } from "react-icons/ai"

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

function SideBar() {
    return (
        <div className="grid auto-rows-max grid-cols-1 mx-2 mr-4">
            {
                Documentations.map(elem =>
                    elem.id ? <a href={`#${elem.id}`} key={`a-${elem.id}`} className="border-l-4 pl-4 border-gray-400 py-1 relative sm:relative md:relative -left-6 sm:-left-6 md:-left-6 lg:static sm:mb-1 mb-1 md:mb-0">{elem.title}</a> : <></>
                )
            }
        </div>
    )
}


export default function Page() {

    return (
        <main className="pt-40 md:pt-12 lg:pt-16 mx-auto grid-cols-1 md:grid-cols-1 lg:grid-cols-[20%_80%] grid-rows-1 grid xl:grid-cols-[16%_83%]">
            <div className="block sm:block md:block lg:hidden z-40 fixed sm:top-28 h-10 sm:h-10 top-16 md:top-0">
                <Sheet className="leading-loose">
                    <SheetTrigger className="hover:bg-slate-200 px-4 hover:rounded-3xl mt-2 md:mt-0 h-10 sm:h-10 md:h-12 sm:mt-4"><AiOutlineMenu className="h-10 w-6 md:w-4 sm:h-10 md:h-12" /></SheetTrigger>
                    <SheetContent position={"left"} className="w-1/3 md:w-1/4">
                        <SheetHeader>
                            <SheetTitle className="text-2xl relative -left-4 -top-4">Documentation</SheetTitle>
                            <SheetDescription className="relative -top-3">
                                <SideBar />
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="overflow-auto fixed xl:w-1/6 lg:w-1/5 h-screen hidden sm:hidden md:hidden lg:block">
                <div></div>
                <SideBar />
            </div>
            <div className="hidden sm:hidden md:hidden lg:block"></div>
            <div className="pl-4 text-base sm:text-lg md:text-lg lg:text-xl mx-8 sm:mx-12 md:mx-10 lg:mx-6 relative">
                <h1 className="absolute top-2 sm:text-xl md:text-xl lg:text-5xl -left-4">Maths Documentation</h1>
                {
                    Documentations.map((elem, ind) => elem.id ? (
                        <Fragment key={elem.id}>
                            {ind === 0 ? <></> : <hr className="my-14 w-full" id={elem.id} />}
                            <div className={ind === 0 ? "pt-20" : null} id={ind === 0 ? elem.id : null}>
                                <h1 className="relative right-4 mb-6">{elem.title}</h1>
                                {
                                    ["number-one-five", "numbers-six-nine"].includes(elem.id) ?
                                        <NumbersToLists str={elem.description} />
                                        : <div className="mt-3 text-base sm:text-lg md:text-lg lg:text-xl">
                                            {
                                                elem.description.split("\n\n").map((splitdelem, pind) => (
                                                    <p key={`${elem.id}-p-${pind}`}>
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