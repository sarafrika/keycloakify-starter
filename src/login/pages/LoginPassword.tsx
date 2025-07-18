import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordWrapper from "../PasswordWrapper";
import { cn } from "@/lib/utils";

export default function LoginPassword(props: PageProps<Extract<KcContext, { pageId: "login-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { realm, url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={"Enter your password"}
            displayMessage={!messagesPerField.existsError("password")}
        >
            <form
                id="kc-form-login"
                onSubmit={() => {
                    setIsLoginButtonDisabled(true);
                    return true;
                }}
                className="space-y-5"
                action={url.loginAction}
                method="post"
            >
                {/* Password Field */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <PasswordWrapper i18n={i18n} passwordInputId="password">
                        <Input
                            tabIndex={2}
                            id="password"
                            className={cn(
                                "w-full h-14 pl-12 pt-6 pb-2 bg-white/80 dark:bg-slate-800/80",
                                "border-2 border-slate-200 dark:border-slate-700 rounded-xl",
                                "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                                "transition-all duration-200 placeholder-transparent",
                                messagesPerField.existsError("password") && "border-red-300 dark:border-red-600 focus:ring-red-500"
                            )}
                            name="password"
                            type="password"
                            placeholder=" "
                            autoFocus
                            autoComplete="on"
                            aria-invalid={messagesPerField.existsError("password")}
                        />
                    </PasswordWrapper>
                    <Label
                        htmlFor="password"
                        className="absolute left-12 top-2 text-xs font-medium text-blue-600 dark:text-blue-400 transition-all duration-200 pointer-events-none"
                    >
                        {msg("password")}
                    </Label>
                </div>

                {messagesPerField.existsError("password") && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
                        <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span
                            className="text-sm text-red-600 dark:text-red-400"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("password"))
                            }}
                        />
                    </div>
                )}

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                    {realm.resetPasswordAllowed && (
                        <a
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            tabIndex={5}
                            href={url.loginResetCredentialsUrl}
                        >
                            {msg("doForgotPassword")}
                        </a>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <Button
                        tabIndex={4}
                        className={cn(
                            "w-full h-12 text-base font-semibold rounded-xl",
                            "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                            "text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200",
                            isLoginButtonDisabled && "opacity-50 cursor-not-allowed transform-none"
                        )}
                        name="login"
                        id="kc-login"
                        type="submit"
                        value={msgStr("doLogIn")}
                        disabled={isLoginButtonDisabled}
                    >
                        {isLoginButtonDisabled ? (
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Signing in...</span>
                            </div>
                        ) : (
                            msg("doLogIn")
                        )}
                    </Button>
                </div>
            </form>
        </Template>
    );
}