import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { clsx } from "keycloakify/tools/clsx";
import { cn } from "@/lib/utils";
import PasswordWrapper from "../PasswordWrapper";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={"Sign in with email"}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container" className="text-sm mt-2">
                    <div id="kc-registration">
                        <span>
                            {msg("noAccount")}{" "}
                            <a tabIndex={8} href={url.registrationUrl} className="text-blue-600 hover:underline">
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className="grid grid-cols-3 gap-2">
                            {social.providers.map(p =>
                                (
                                    <a
                                        key={p.alias}
                                        id={`social-${p.alias}`}
                                        className="flex items-center justify-center p-2 border rounded-md hover:bg-gray-50 transition-colors"
                                        href={p.loginUrl}
                                    >
                                        {/* Using simple text for now, you'd replace with actual icons */}
                                        {p.alias === "google" && <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" className="h-5 w-5" />}
                                        {p.alias === "facebook" && <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="h-5 w-5" />}
                                        {p.alias === "apple" && <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-5 w-5" />}
                                        {/* Fallback for other providers */}
                                        {!["google", "facebook", "apple"].includes(p.alias) && p.iconClasses && <i className={clsx(p.iconClasses)} aria-hidden="true"></i>}
                                        {/* <span
                                        className="sr-only" // Hide text, show only icon as in inspiration
                                        dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                    ></span> */}
                                    </a>)
                            )}
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">

                    <form
                        id="kc-form-login"
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        className="space-y-4"
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
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        ✉️
                                    </span>
                                    <Input
                                        tabIndex={2}
                                        id="username"
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        placeholder="Email"
                                        autoFocus
                                        autoComplete="username"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                        className="pl-10"
                                    />
                                </div>
                                {messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className="text-sm text-red-500"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )}
                            </div>
                        )}

                        {realm.password && (
                            <div className="space-y-2">
                                <Label htmlFor="password" className="sr-only">
                                    {msg("password")}
                                </Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        🔒
                                    </span>
                                    <PasswordWrapper i18n={i18n} passwordInputId="password">
                                        <Input
                                            tabIndex={3}
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="current-password"
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                            className="pl-10"
                                        />
                                    </PasswordWrapper>
                                </div>
                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className="text-sm text-red-500"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )}
                            </div>
                        )}


                        <div className="flex justify-end items-center">
                            {realm.rememberMe && !usernameHidden && (
                                <div className="flex items-center sr-only">
                                    <input
                                        tabIndex={5}
                                        id="rememberMe"
                                        name="rememberMe"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 rounded"
                                        defaultChecked={!!login.rememberMe}
                                    />
                                    <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                                        {msg("rememberMe")}
                                    </label>
                                </div>
                            )}
                            <div>
                                {realm.resetPasswordAllowed && (
                                    <a tabIndex={6} href={url.loginResetCredentialsUrl} className="text-sm text-blue-600 hover:underline">
                                        {msg("doForgotPassword")}
                                    </a>
                                )}
                            </div>
                        </div>

                        <div id="kc-form-buttons">
                            <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                            <Button
                                tabIndex={7}
                                disabled={isLoginButtonDisabled}
                                className={cn("w-full py-2 text-lg font-semibold", isLoginButtonDisabled && "opacity-50 cursor-not-allowed")}
                                name="login"
                                id="kc-login"
                                type="submit"
                                value={msgStr("doLogIn")}
                            >
                                Get Started
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}
