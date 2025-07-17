import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordWrapper from "../PasswordWrapper";
import { cn } from "@/lib/utils"; // Assuming you have a utility for tailwind-merge or similar

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
            headerNode={msg("doLogIn")} // This will be "Sign in" or similar based on i18n
            displayMessage={!messagesPerField.existsError("password")}
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    <form
                        id="kc-form-login"
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        className='space-y-4'
                        action={url.loginAction}
                        method="post"
                    >
                        <div className='space-y-2'>
                            <Label htmlFor="password" className="sr-only">
                                {msg("password")}
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    🔒
                                </span>
                                <PasswordWrapper i18n={i18n} passwordInputId="password">
                                    <Input
                                        tabIndex={2}
                                        id="password"
                                        className='w-full pl-10' // Added pl-10 for icon padding
                                        name="password"
                                        type="password"
                                        placeholder={msgStr("password")} // Use placeholder for password
                                        autoFocus
                                        autoComplete="on"
                                        aria-invalid={messagesPerField.existsError("password")}
                                    />
                                </PasswordWrapper>
                            </div>

                            {messagesPerField.existsError("password") && (
                                <span
                                    id="input-error-password"
                                    className='text-red-600 dark:text-red-400 text-sm' // Consistent error message styling
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.get("password"))
                                    }}
                                />
                            )}
                        </div>

                        <div className="flex justify-end items-center">
                            {realm.resetPasswordAllowed && (
                                <a className='text-blue-600 hover:underline dark:text-blue-400' tabIndex={5} href={url.loginResetCredentialsUrl}>
                                    {msg("doForgotPassword")}
                                </a>
                            )}
                        </div>

                        <div id="kc-form-buttons">
                            <Button
                                tabIndex={4}
                                className={cn('w-full py-2 text-lg font-semibold', isLoginButtonDisabled && "opacity-50 cursor-not-allowed")} // Consistent button styling
                                name="login"
                                id="kc-login"
                                type="submit"
                                value={msgStr("doLogIn")}
                                disabled={isLoginButtonDisabled}
                            >
                                {msg("doLogIn")}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}
