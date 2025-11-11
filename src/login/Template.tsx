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
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Language Selector */}
            <div className="absolute top-5 right-5 z-10">
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
                            className="w-auto bg-white/80 backdrop-blur-sm border-white/20 shadow-lg"
                        >
                            {currentLanguage.label}
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 backdrop-blur-sm border-white/20">
                            {enabledLanguages.map(({ languageTag, label, href }, index) => (
                                <SelectItem value={languageTag} key={languageTag}>
                                    <a id={`language-${index + 1}`} href={href}>
                                        {label}
                                    </a>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>

            {/* Centered Form */}
            <div className="w-full max-w-lg mx-auto">
                <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-2xl rounded-3xl overflow-hidden">
                    <CardHeader className="text-center pb-6 pt-8 px-8">
                        {/* Sarafrika Logo */}
                        <div className="mb-6 flex items-center justify-center">
                            <div className="flex items-center space-x-3">
                                {/* Sarafrika Logo Icon */}
                                <div className="relative">
                                    <svg width="40" height="40" viewBox="0 0 100 100" className="transform hover:scale-105 transition-transform duration-300">
                                        <g transform="translate(50,50)">
                                            <path d="M-8,-25 L-3,-10" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" transform="rotate(0)" />
                                            <path d="M-8,-25 L-3,-10" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" transform="rotate(45)" />
                                            <path d="M-8,-25 L-3,-10" stroke="#f97316" strokeWidth="4" strokeLinecap="round" transform="rotate(90)" />
                                            <path d="M-8,-25 L-3,-10" stroke="#eab308" strokeWidth="4" strokeLinecap="round" transform="rotate(135)" />
                                            <path d="M-8,-25 L-3,-10" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" transform="rotate(180)" />
                                            <path d="M-8,-25 L-3,-10" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" transform="rotate(225)" />
                                            <path d="M-8,-25 L-3,-10" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" transform="rotate(270)" />
                                            <path d="M-8,-25 L-3,-10" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" transform="rotate(315)" />
                                        </g>
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                                    Sarafrika
                                </span>
                            </div>
                        </div>

                        {/* Header */}
                        <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2">{headerNode}</CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Access your educational platform</p>
                    </CardHeader>

                    <CardContent className="px-8 pb-4">
                        {/* Messages */}
                        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div
                                className={`mb-4 p-4 rounded-lg border-l-4 ${
                                    message.type === "error"
                                        ? "bg-red-50 border-red-400 text-red-800 dark:bg-red-950 dark:border-red-600 dark:text-red-200"
                                        : message.type === "success"
                                            ? "bg-green-50 border-green-400 text-green-800 dark:bg-green-950 dark:border-green-600 dark:text-green-200"
                                            : message.type === "warning"
                                                ? "bg-yellow-50 border-yellow-400 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-600 dark:text-yellow-200"
                                                : "bg-blue-50 border-blue-400 text-blue-800 dark:bg-blue-950 dark:border-blue-600 dark:text-blue-200"
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
                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                                >
                                    {msg("doTryAnotherWay")}
                                </a>
                            </form>
                        )}
                    </CardContent>

                    <CardFooter className="px-8 pb-8 pt-4">
                        {/* Social Providers */}
                        {socialProvidersNode && (
                            <div className="w-full space-y-4">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-slate-200 dark:border-slate-700" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white/70 dark:bg-slate-900/70 px-3 text-slate-500 dark:text-slate-400 font-medium">Or continue with</span>
                                    </div>
                                </div>
                                {socialProvidersNode}
                            </div>
                        )}

                        {/* Info */}
                        {displayInfo && <div className="w-full text-center text-sm text-slate-600 dark:text-slate-400 mt-4">{infoNode}</div>}

                        {/* Back to app link */}
                        {isAppInitiatedAction && (
                            <div className="w-full text-center mt-4">
                                <a className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors" href={url.loginUrl}>
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
