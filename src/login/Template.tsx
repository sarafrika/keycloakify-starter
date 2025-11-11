import { useEffect } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;
    const realmLabel = realm.displayName ?? "your account";
    const subtitleCopy = `Secure access to ${realmLabel}`;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-sky-100 via-white to-white px-4 py-12 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 dark:text-slate-100">
            {/* Background orbits */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/60 opacity-70" />
                <div className="absolute -top-16 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full border border-white/50 opacity-40" />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/70 to-transparent dark:from-slate-900" />
                <div className="absolute -bottom-24 left-12 h-64 w-64 rounded-full bg-white/70 blur-3xl dark:bg-slate-900/60" />
                <div className="absolute -top-12 right-0 h-56 w-56 rounded-full bg-blue-100/60 blur-2xl dark:bg-blue-500/20" />
            </div>

            <div className="relative z-10 w-full max-w-[420px] space-y-6">
                <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/80 text-slate-700 shadow-inner dark:bg-slate-900/60 dark:text-slate-100">
                            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                                <path
                                    d="M4 12c2-5.333 5.333-8 10-8s8 2.667 10 8c-2 5.333-5.333 8-10 8s-8-2.667-10-8z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <circle cx="14" cy="12" r="3" fill="currentColor" />
                            </svg>
                        </div>
                        <span className="tracking-[0.4em] text-slate-600 dark:text-slate-200">SARAFRIKA</span>
                    </div>

                    {enabledLanguages.length > 1 && (
                        <Select
                            value={currentLanguage.languageTag}
                            onValueChange={value => {
                                const next = enabledLanguages.find(lang => lang.languageTag === value)?.href;
                                window.location.href = next ?? window.location.href;
                            }}
                        >
                            <SelectTrigger
                                tabIndex={1}
                                id="kc-current-locale-link"
                                aria-label={msgStr("languages")}
                                className="h-9 min-w-[96px] justify-between rounded-full border border-white/50 bg-white/70 px-4 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-slate-600 shadow-sm backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-900/60 dark:text-slate-200"
                            >
                                {currentLanguage.label}
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border border-white/60 bg-white/90 shadow-xl backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/90">
                                {enabledLanguages.map(({ languageTag, label }) => (
                                    <SelectItem key={languageTag} value={languageTag} className="text-slate-600 dark:text-slate-200">
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>

                <Card className="rounded-[28px] border border-white/60 bg-white/80 shadow-[0_25px_70px_rgba(15,23,42,0.18)] backdrop-blur-3xl dark:border-slate-800/70 dark:bg-slate-900/80">
                    <CardHeader className="px-10 pb-4 pt-10">
                        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-lg shadow-blue-200/60 dark:bg-slate-900 dark:text-slate-100">
                            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                                <path
                                    d="M12 3l7 4v10l-7 4-7-4V7z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="space-y-2 text-center">
                            <CardTitle className="text-[1.65rem] font-semibold tracking-tight text-slate-900 dark:text-white">
                                {headerNode ?? msg("loginTitle", realm.displayName)}
                            </CardTitle>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{subtitleCopy}</p>
                        </div>
                    </CardHeader>

                    <CardContent className="px-10 pb-6 pt-2">
                        {/* Messages */}
                        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div
                                className={`mb-4 rounded-2xl border px-4 py-3 text-sm leading-relaxed shadow-sm ${
                                    message.type === "error"
                                        ? "border-red-200/70 bg-red-50/80 text-red-700 dark:border-red-500/50 dark:bg-red-950/60 dark:text-red-200"
                                        : message.type === "success"
                                            ? "border-emerald-200/70 bg-emerald-50/80 text-emerald-700 dark:border-emerald-500/50 dark:bg-emerald-950/60 dark:text-emerald-200"
                                            : message.type === "warning"
                                                ? "border-amber-200/70 bg-amber-50/80 text-amber-700 dark:border-amber-500/50 dark:bg-amber-950/60 dark:text-amber-200"
                                                : "border-blue-200/70 bg-blue-50/80 text-blue-700 dark:border-blue-500/50 dark:bg-blue-950/60 dark:text-blue-200"
                                }`}
                            >
                                <span dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                            </div>
                        )}

                        {/* Form Content */}
                        {children}

                        {/* Try Another Way Link */}
                        {auth !== undefined && auth.showTryAnotherWayLink && (
                            <form id="kc-select-try-another-way-form" action={url.loginAction} method="post" className="mt-6 text-center">
                                <input type="hidden" name="tryAnotherWay" value="on" />
                                <a
                                    href="#"
                                    id="try-another-way"
                                    onClick={() => {
                                        document.forms.namedItem("kc-select-try-another-way-form")?.submit();
                                        return false;
                                    }}
                                    className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    {msg("doTryAnotherWay")}
                                </a>
                            </form>
                        )}
                    </CardContent>

                    <CardFooter className="px-10 pb-10 pt-4">
                        {/* Social Providers */}
                        {socialProvidersNode && (
                            <div className="w-full space-y-4">
                                <div className="flex items-center justify-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">
                                    <span className="h-px w-12 bg-slate-200 dark:bg-slate-700" />
                                    {msg("doLogIn") || "Sign in"}
                                    <span className="h-px w-12 bg-slate-200 dark:bg-slate-700" />
                                </div>
                                {socialProvidersNode}
                            </div>
                        )}

                        {/* Info */}
                        {displayInfo && <div className="mt-6 w-full text-center text-sm text-slate-500 dark:text-slate-400">{infoNode}</div>}

                        {/* Back to app link */}
                        {isAppInitiatedAction && (
                            <div className="mt-4 w-full text-center">
                                <a className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" href={url.loginUrl}>
                                    {msg("backToApplication")}
                                </a>
                            </div>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
