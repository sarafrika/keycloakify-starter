import { useMemo, useState } from "react";
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
    const getProviderLabel = useMemo(
        () =>
            (alias: string, fallback?: string) => {
                switch (alias.toLowerCase()) {
                    case "google":
                        return "Google";
                    case "apple":
                        return "Apple";
                    case "microsoft":
                        return "Microsoft";
                    case "facebook":
                        return "Facebook";
                    case "github":
                        return "GitHub";
                    case "twitter":
                    case "x":
                        return "X";
                    case "linkedin":
                        return "LinkedIn";
                    case "discord":
                        return "Discord";
                    default:
                        return fallback ?? alias;
                }
            },
        []
    );

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
                <div className="text-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                        {msg("noAccount")}{" "}
                        <a
                            tabIndex={8}
                            href={url.registrationUrl}
                            className="font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            {msg("doRegister")}
                        </a>
                    </span>
                </div>
            }
            socialProvidersNode={
                social?.providers !== undefined &&
                social.providers.length !== 0 && (
                    <div className="flex flex-wrap justify-center gap-3">
                        {social.providers.map(p => (
                            <a
                                key={p.alias}
                                id={`social-${p.alias}`}
                                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-200"
                                href={p.loginUrl}
                                title={`Continue with ${getProviderLabel(p.alias, p.displayName)}`}
                            >
                                <SocialIcon provider={p.alias} className="h-5 w-5" />
                                <span className="sr-only">Continue with {getProviderLabel(p.alias, p.displayName)}</span>
                            </a>
                        ))}
                    </div>
                )
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
                                <Label htmlFor="username" className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                    {msg("username")}
                                </Label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M2 8a6 6 0 1112 0v2a6 6 0 11-12 0V8z" />
                                            <path d="M20 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                                        </svg>
                                    </div>
                                    <Input
                                        tabIndex={2}
                                        id="username"
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        placeholder={msgStr("username")}
                                        autoComplete="username"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white/80 pl-11 pr-4 text-sm text-slate-700 shadow-inner focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
                                    />
                                </div>
                            </div>
                        )}

                        {realm.password && (
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                    {msg("password")}
                                </Label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M6 10V8a6 6 0 1112 0v2" />
                                            <rect x="5" y="10" width="14" height="10" rx="2" />
                                            <path d="M12 15v2" />
                                        </svg>
                                    </div>
                                    <PasswordWrapper i18n={i18n} passwordInputId="password">
                                        <Input
                                            tabIndex={3}
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder={msgStr("password")}
                                            autoComplete="current-password"
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                            className="h-12 w-full rounded-2xl border border-slate-200 bg-white/80 pl-11 pr-12 text-sm text-slate-700 shadow-inner focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
                                        />
                                    </PasswordWrapper>
                                </div>
                            </div>
                        )}

                        {/* Error Messages */}
                        {messagesPerField.existsError("username", "password") && (
                            <div className="flex items-center gap-2 rounded-2xl border border-red-200/80 bg-red-50/80 px-4 py-3 text-sm text-red-600 dark:border-red-800/70 dark:bg-red-950/60 dark:text-red-300">
                                <svg className="h-5 w-5 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                    }}
                                />
                            </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
                            {realm.rememberMe && !usernameHidden && (
                                <label className="inline-flex cursor-pointer items-center gap-2">
                                    <input
                                        tabIndex={5}
                                        id="rememberMe"
                                        name="rememberMe"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400 dark:border-slate-600 dark:bg-slate-800"
                                        defaultChecked={!!login.rememberMe}
                                    />
                                    <span>{msg("rememberMe")}</span>
                                </label>
                            )}
                            {realm.resetPasswordAllowed && (
                                <a
                                    tabIndex={6}
                                    href={url.loginResetCredentialsUrl}
                                    className="font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    {msg("doForgotPassword")}
                                </a>
                            )}
                        </div>

                        <div id="kc-form-buttons" className="pt-1">
                            <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                            <Button
                                tabIndex={7}
                                disabled={isLoginButtonDisabled}
                                className={cn(
                                    "flex h-11 w-full items-center justify-center rounded-2xl text-sm font-semibold tracking-wide text-white shadow-lg transition",
                                    "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-600",
                                    isLoginButtonDisabled && "opacity-70 hover:translate-y-0"
                                )}
                                name="login"
                                id="kc-login"
                                type="submit"
                                value={msgStr("doLogIn")}
                            >
                                {isLoginButtonDisabled ? (
                                    <div className="flex items-center gap-2">
                                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                                            <path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                        <span className="text-xs uppercase tracking-[0.3em]">Working…</span>
                                    </div>
                                ) : (
                                    "Get started"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}
