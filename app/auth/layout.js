import Logo from "components/navbar/logo";

export default function Layout({ children }) {

    return (
        <div className="grid min-h-screen place-content-center bg-gray-50">

            <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-screen sm:w-128">
                <Logo className={"mb-4 p-4 pl-0"} />
                {children}
            </div>
        </div>
    );
}