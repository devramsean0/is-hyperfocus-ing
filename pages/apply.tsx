import { ServiceLayout } from "@/components/ServiceLayout";
import { TextInput } from "@/components/TextInput";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BACKEND_API_ENDPOINT } from "@/constants";

export default function Apply() {
    const searchParams = useSearchParams();

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    useEffect(() => {
        // Set the username to the value of the username query parameter in a way that doesn't cause an infinite loop of updates
        setUsername(searchParams.get("username") || "");
    }, [searchParams]);
    return (
        <ServiceLayout
            subtitle="We just need a few details from you!"
        >
            <main className="mainContent verticalCenter">
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    console.log("submitting form");
                    if (password !== passwordConfirm) {
                        alert("Passwords do not match");
                        return;
                    }
                    const res = await fetch(`/api/application`, {
                        method: "POST",
                        body: JSON.stringify({
                            username,
                            name,
                            email,
                            password
                        })
                    })
                    console.log(res);
                }}>
                    <TextInput label="your name" id="name" required onChange={(ctx) => {
                        setName(ctx.currentTarget.value);
                    }}/>
                    <TextInput label="your username" value={username} id="username" required onChange={(ctx) => {
                        setUsername(ctx.currentTarget.value);
                    }}/>
                    <TextInput label="your email" id="email" required type="email" onChange={(ctx) => {
                        setEmail(ctx.currentTarget.value);
                    }}/>
                    <TextInput label="your password" id="password" required type="password" onChange={(ctx) => {
                        setPassword(ctx.currentTarget.value);
                    }}/>
                    <TextInput label="your password again" id="password-confirm" required type="password" onChange={(ctx) => {
                        setPasswordConfirm(ctx.currentTarget.value);
                    }}/>

                    <div className="py-5">
                        your site will be {username}.is.hyperfocus.ing
                        <br />
                        your email will be {username}@is.hyperfocus.ing
                    </div>
                    <div className="h-10 w-[30rem] rounded-full pl-2 p-0 m-0 flex bg-action text-black text-xl">
                        <button type="submit" className="h-10 w-[28rem] rounded-full">Apply</button>
                        <div className="h-10 w-10 p-0 m-0">
                            <svg xmlns="http://www.w3.org/2000/svg" height="2.5rem" viewBox="0 -960 960 960" width="2.5rem">
                                <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/>
                            </svg>
                        </div>
                    </div>
                </form>
            </main>
        </ServiceLayout>
    )   
}