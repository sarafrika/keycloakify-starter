import { useState, type ReactNode } from "react";
import type { I18n } from "./i18n";
import { Button } from "@/components/ui/button";

type PasswordWrapperProps = {
    i18n: I18n;
    passwordInputId: string;
    children: ReactNode;
};

export default function PasswordWrapper(props: PasswordWrapperProps) {
    const { i18n, passwordInputId, children } = props;
    const { msg } = i18n;
    const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);

    const togglePassword = () => {
        setIsPasswordRevealed(!isPasswordRevealed);
        const passwordInput = document.getElementById(passwordInputId) as HTMLInputElement;
        if (passwordInput) {
            passwordInput.type = isPasswordRevealed ? "password" : "text";
        }
    };

    return (
        <div className="relative">
            {children}
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-transparent focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-colors"
                onClick={togglePassword}
                tabIndex={-1}
                aria-label={isPasswordRevealed ? msg("hidePassword") : msg("showPassword")}
            >
                {isPasswordRevealed ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                )}
            </Button>
        </div>
    );
}