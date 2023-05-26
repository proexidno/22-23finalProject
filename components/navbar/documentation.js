
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

export default function Documentation() {
    return (
        <Sheet className="leading-loose">
            <SheetTrigger className="hover:bg-slate-200 px-4 hover:rounded-3xl">Documentation</SheetTrigger>
            <SheetContent position={"right"} className="w-1/2 md:w-1/3">
                <SheetHeader>
                    <SheetTitle className="text-3xl">This is handy Documentation</SheetTitle>
                    <SheetDescription>
                        <Accordion type="single" collapsible>
                            {Documentations.map((elem, ind) => !elem.title ? "" : (
                                <AccordionItem value={`item-${ind + 1}`} key={`item-${ind}`}>
                                    <AccordionTrigger>{elem.title}</AccordionTrigger>
                                    <AccordionContent>
                                        {elem.short_description}
                                    </AccordionContent>
                                </AccordionItem>
                            )
                            )}
                        </Accordion>
                        <Link href={"/docs"} className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary h-10 py-2 px-4 text-white float-right">Go to full docs</Link>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}