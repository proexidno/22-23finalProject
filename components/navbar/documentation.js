import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "components/ui/accordion"
import { Documentations } from "model/documentation.mjs";
import Link from "next/link";

export default function Documentation({ className }) {
    return (
        <Sheet className="leading-loose">
            <SheetTrigger className={`hover:bg-slate-200 px-4 hover:rounded-3xl ${className}`}>Documentation</SheetTrigger>
            <SheetContent position={"right"} className="w-1/2 md:w-1/3 overflow-scroll">
                <SheetHeader>
                    <SheetTitle className="text-3xl">This is handy Documentation</SheetTitle>
                    <SheetDescription>
                        <Accordion type="single" collapsible>
                            {Documentations.map((elem, ind) => !elem.title ? "" : (
                                <AccordionItem value={`item-${ind + 1}`} key={`item-${ind}`}>
                                    <AccordionTrigger>{elem.title}</AccordionTrigger>
                                    <AccordionContent>
                                        <p dangerouslySetInnerHTML={{ __html: elem.short_description.replaceAll("\n", "<br />") }} />

                                    </AccordionContent>
                                </AccordionItem>
                            )
                            )}
                        </Accordion>
                        <Link href="/docs" className="inline-flex items-center justify-center rounded-md text-white bg-black h-10 py-2 px-4 float-right mt-4">Go to full docs</Link>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet >
    )
}