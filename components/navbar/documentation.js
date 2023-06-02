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
import { Button } from "components/ui/button"

export default function Documentation({ className }) {
    return (
        <Sheet className="leading-loose">
            <SheetTrigger className={`hover:bg-slate-200 px-4 hover:rounded-3xl ${className}`}>Documentation</SheetTrigger>
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
                        <Button asChild className="float-right mt-4">
                            <Link href={"/docs"}>Go to full docs</Link>
                        </Button>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}