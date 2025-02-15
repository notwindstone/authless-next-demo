import useSession from "@/hooks/use-session";
import Image from "next/image";
import nextJsLogo from "../../../public/nextjs-icon.svg";
import {REGISTRATION_INPUTS} from "@/app/configs/constants";
import Link from "next/link";

export default function Login() {
    const { login } = useSession();

    return (
        <div className="bg-white drop-shadow-xl py-4 px-12 rounded-md">
            <div className="flex flex-col items-center gap-4">
                <Image
                    className="mb-4"
                    width={48}
                    height={48}
                    src={nextJsLogo}
                    alt={"Next.js logo"}
                />
                <p className="text-xl font-bold text-black">
                    Регистрация аккаунта
                </p>
                <p className="text-center text-gray-500 font-medium">
                    Добро пожаловать! Зарегистрируйтесь, чтобы продолжить.
                </p>
                <div className="h-[1px] w-full bg-gray-200" />
                <form
                    className="w-full flex flex-col gap-4"
                    onSubmit={function (event) {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const username = formData.get("username") as string;
                        const email = formData.get("email") as string;
                        const password = formData.get("password") as string;
                        login({
                            username,
                            email,
                            password,
                        }, {
                            optimisticData: {
                                isLoggedIn: true,
                                username,
                                email,
                                password,
                            },
                        });
                    }}
                    method="POST"
                >
                    {
                        REGISTRATION_INPUTS.map((currentInput) => {
                            return (
                                <div className="flex flex-col gap-2" key={currentInput.name}>
                                    <p className="font-semibold text-gray-800">
                                        {currentInput.label}
                                    </p>
                                    <input
                                        className="shadow-sm focus:outline-gray-300 focus:-outline-offset-0 outline-transparent focus:outline-none hover:border-gray-300 border-gray-200 border-[1px] rounded-md px-2 py-1 transition-all"
                                        type={currentInput.type}
                                        name={currentInput.name}
                                        placeholder=""
                                        required
                                    />
                                </div>
                            );
                        })
                    }
                    <button type="submit">
                        Продолжить
                    </button>
                </form>
                <p className="text-gray-500 font-medium">
                    Уже есть аккаунт?{' '}
                    <Link
                        className="text-black font-medium"
                        href={"/auth"}
                    >
                        Войдите
                    </Link>
                </p>
            </div>
        </div>
    );
}