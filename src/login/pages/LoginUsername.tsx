import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
    const { kcContext, i18n, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration" className="text-sm mt-2">
                    <span>
                        {msg("noAccount")}&nbsp;
                        <a className="text-blue-600 hover:underline dark:text-blue-400" tabIndex={6} href={url.registrationUrl}>
                            {msg("doRegister")}
                        </a>
                    </span>
                </div>
            }
            headerNode={msg("doLogIn")}
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className="grid grid-cols-3 gap-2">
                            {social.providers.map(p => (
                                <a
                                    key={p.alias}
                                    id={`social-${p.alias}`}
                                    className="flex items-center justify-center p-2 border rounded-md hover:bg-gray-50 transition-colors"
                                    href={p.loginUrl}
                                >
                                    {p.alias === "google" && (
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                                            alt="Google"
                                            className="h-5 w-5"
                                        />
                                    )}
                                    {p.alias === "facebook" && (
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                            alt="Facebook"
                                            className="h-5 w-5"
                                        />
                                    )}
                                    {p.alias === "apple" && (
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                                            alt="Apple"
                                            className="h-5 w-5"
                                        />
                                    )}
                                    {!["google", "facebook", "apple"].includes(p.alias) && p.iconClasses && (
                                        <i className={clsx("", p.iconClasses)} aria-hidden="true"></i>
                                    )}
                                </a>
                            ))}
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            className="space-y-4"
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            {!usernameHidden && (
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="sr-only">
                                        {!realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                              ? msg("usernameOrEmail")
                                              : msg("email")}
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
                                        <Input
                                            tabIndex={2}
                                            id="username"
                                            name="username"
                                            defaultValue={login.username ?? ""}
                                            type="text"
                                            autoFocus
                                            autoComplete="username"
                                            placeholder={msgStr("usernameOrEmail")}
                                            aria-invalid={messagesPerField.existsError("username")}
                                            className="pl-10"
                                        />
                                        {messagesPerField.existsError("username") && (
                                            <span id="input-error" className="text-red-600 dark:text-red-400 text-sm" aria-live="polite">
                                                {messagesPerField.getFirstError("username")}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="space-y-2">
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="flex items-center">
                                            <input
                                                tabIndex={3}
                                                id="rememberMe"
                                                name="rememberMe"
                                                type="checkbox"
                                                defaultChecked={!!login.rememberMe}
                                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-blue-500"
                                            />
                                            <Label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                                {msg("rememberMe")}
                                            </Label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div id="kc-form-buttons">
                                <Button
                                    tabIndex={4}
                                    disabled={isLoginButtonDisabled}
                                    className={cn("w-full py-2 text-lg font-semibold", isLoginButtonDisabled && "opacity-50 cursor-not-allowed")}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                >
                                    {msg("doLogIn")}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
