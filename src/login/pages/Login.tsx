import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PasswordWrapper from "../PasswordWrapper";
import { SocialIcon } from "@/components/SocialIcon";

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
            headerNode={"Welcome back"}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div className="text-center">
                    <span className="text-slate-600 dark:text-slate-400">
                        {msg("noAccount")}{" "}
                        <a
                            tabIndex={8}
                            href={url.registrationUrl}
                            className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        >
                            {msg("doRegister")}
                        </a>
                    </span>
                </div>
            }
            socialProvidersNode={
                <>
                    {social?.providers !== undefined && social.providers.length !== 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {social.providers.map(p => (
                                <a
                                    key={p.alias}
                                    id={`social-${p.alias}`}
                                    className="flex items-center justify-center gap-3 px-4 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-700/50 rounded-xl hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-slate-300/60 dark:hover:border-slate-600/60 transition-all duration-200 group shadow-sm hover:shadow-md"
                                    href={p.loginUrl}
                                >
                                    <SocialIcon provider={p.alias} className="h-5 w-5 flex-shrink-0" />
                                    <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors text-sm sm:text-base">
                                        {p.alias === "google"
                                            ? "Google"
                                            : p.alias === "apple"
                                              ? "Apple"
                                              : p.alias === "microsoft"
                                                ? "Microsoft"
                                                : p.alias === "facebook"
                                                  ? "Facebook"
                                                  : p.alias === "github"
                                                    ? "GitHub"
                                                    : p.alias === "twitter" || p.alias === "x"
                                                      ? "X"
                                                      : p.alias === "linkedin"
                                                        ? "LinkedIn"
                                                        : p.alias === "discord"
                                                          ? "Discord"
                                                          : p.displayName || p.alias}
                                    </span>
                                </a>
                            ))}
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
                        className="space-y-5"
                        method="post"
                    >
                        {!usernameHidden && (
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                    <svg
                                        className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </div>
                                <Input
                                    tabIndex={2}
                                    id="username"
                                    name="username"
                                    defaultValue={login.username ?? ""}
                                    type="text"
                                    placeholder="Email address"
                                    autoFocus
                                    autoComplete="username"
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                    className="w-full h-14 pl-12 pt-6 pb-2 bg-white/80 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-transparent"
                                />
                                <Label
                                    htmlFor="username"
                                    className="absolute left-12 top-2 text-xs font-medium text-blue-600 dark:text-blue-400 transition-all duration-200 pointer-events-none"
                                >
                                    Email address
                                </Label>
                            </div>
                        )}

                        {realm.password && (
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                    <svg
                                        className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <PasswordWrapper i18n={i18n} passwordInputId="password">
                                    <Input
                                        tabIndex={3}
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                        className="w-full h-14 pl-12 pt-6 pb-2 bg-white/80 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-transparent"
                                    />
                                </PasswordWrapper>
                                <Label
                                    htmlFor="password"
                                    className="absolute left-12 top-2 text-xs font-medium text-blue-600 dark:text-blue-400 transition-all duration-200 pointer-events-none"
                                >
                                    Password
                                </Label>
                            </div>
                        )}

                        {/* Error Messages */}
                        {messagesPerField.existsError("username", "password") && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
                                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span
                                    className="text-sm text-red-600 dark:text-red-400"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                    }}
                                />
                            </div>
                        )}

                        <div className="flex justify-between items-center">
                            {realm.rememberMe && !usernameHidden && (
                                <div className="flex items-center space-x-2">
                                    <input
                                        tabIndex={5}
                                        id="rememberMe"
                                        name="rememberMe"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
                                        defaultChecked={!!login.rememberMe}
                                    />
                                    <Label htmlFor="rememberMe" className="text-sm text-slate-600 dark:text-slate-400">
                                        {msg("rememberMe")}
                                    </Label>
                                </div>
                            )}
                            {realm.resetPasswordAllowed && (
                                <a
                                    tabIndex={6}
                                    href={url.loginResetCredentialsUrl}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                >
                                    {msg("doForgotPassword")}
                                </a>
                            )}
                        </div>

                        <div id="kc-form-buttons" className="pt-2">
                            <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                            <Button
                                tabIndex={7}
                                disabled={isLoginButtonDisabled}
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
                            >
                                {isLoginButtonDisabled ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    "Sign in"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}