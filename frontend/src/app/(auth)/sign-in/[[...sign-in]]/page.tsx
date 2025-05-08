import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return <SignIn 
                appearance={{
                    elements: {
                        formButtonPrimary: "bg-primary hover:bg-primary/90 text-sm !shadow-none",
                    },
                }} 
            />
}