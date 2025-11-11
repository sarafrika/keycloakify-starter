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
import { useDarkMode } from "./useDarkMode";
import { Moon, Sun, Monitor } from "lucide-react";

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

    const { theme, resolvedTheme, setTheme } = useDarkMode();

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
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-background">
            {/* Theme Selector - Left side */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger
                        aria-label="Theme"
                        className="w-auto text-sm bg-transparent border-none hover:bg-muted px-2"
                    >
                        {resolvedTheme === "dark" ? (
                            <Moon className="h-4 w-4" />
                        ) : (
                            <Sun className="h-4 w-4" />
                        )}
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">
                            <div className="flex items-center gap-2">
                                <Sun className="h-4 w-4" />
                                <span>Light</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="dark">
                            <div className="flex items-center gap-2">
                                <Moon className="h-4 w-4" />
                                <span>Dark</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="system">
                            <div className="flex items-center gap-2">
                                <Monitor className="h-4 w-4" />
                                <span>System</span>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Language Selector - Right side */}
            {enabledLanguages.length > 1 && (
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <Select
                        value={currentLanguage.languageTag}
                        onValueChange={value => {
                            window.location.href = enabledLanguages.find(lang => lang.languageTag === value)?.href ?? window.location.href;
                        }}
                    >
                        <SelectTrigger
                            tabIndex={1}
                            id="kc-current-locale-link"
                            aria-label={msgStr("languages")}
                            className="w-auto text-sm bg-transparent border-none hover:bg-muted px-2"
                        >
                            {currentLanguage.label}
                        </SelectTrigger>
                        <SelectContent>
                            {enabledLanguages.map(({ languageTag, label, href }, i) => (
                                <SelectItem value={languageTag} key={languageTag}>
                                    <a id={`language-${i + 1}`} href={href}>
                                        {label}
                                    </a>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Main centered card - Google style */}
            <div className="w-full max-w-md">
                <Card className="border border-border shadow-sm">
                    <CardHeader className="text-center space-y-4 pt-8 sm:pt-12 px-6 sm:px-12 pb-6">
                        {/* Sarafrika Logo */}
                        <div className="flex items-center justify-center">
                            <div className="flex items-center gap-3">
                                <svg width="36" height="36" viewBox="0 0 100 100">
                                    <g transform="translate(50,50)">
                                        <path d="M-8,-25 L-3,-10" stroke="oklch(0.77 0.19 130)" strokeWidth="5" strokeLinecap="round" transform="rotate(0)"/>
                                        <path d="M-8,-25 L-3,-10" stroke="oklch(0.66 0.25 330)" strokeWidth="5" strokeLinecap="round" transform="rotate(90)"/>
                                        <path d="M-8,-25 L-3,-10" stroke="oklch(0.62 0.22 262)" strokeWidth="5" strokeLinecap="round" transform="rotate(180)"/>
                                        <path d="M-8,-25 L-3,-10" stroke="oklch(0.65 0.24 290)" strokeWidth="5" strokeLinecap="round" transform="rotate(270)"/>
                                        <path d="M-8,-25 L-3,-10" stroke="oklch(0.72 0.19 70)" strokeWidth="5" strokeLinecap="round" transform="rotate(45)"/>
                                        <path d="M-8,-25 L-3,-10" stroke="oklch(0.77 0.19 130)" strokeWidth="5" strokeLinecap="round" transform="rotate(135)"/>
                                        <path d="M-8,-25 L-3,-10" stroke="oklch(0.66 0.25 330)" strokeWidth="5" strokeLinecap="round" transform="rotate(225)"/>
                                        <path d="M-8,-25 L-3,-10" stroke="oklch(0.62 0.22 262)" strokeWidth="5" strokeLinecap="round" transform="rotate(315)"/>
                                    </g>
                                </svg>
                                <span className="text-2xl font-normal text-foreground">
                                    Sarafrika
                                </span>
                            </div>
                        </div>

                        {/* Header */}
                        <div>
                            <CardTitle className="text-2xl font-normal text-foreground">
                                {headerNode}
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="px-6 sm:px-12 pb-6">
                        {/* Messages */}
                        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div className={`mb-6 p-3 rounded text-sm ${
                                message.type === "error"
                                    ? "bg-destructive/10 text-destructive"
                                    : message.type === "success"
                                        ? "bg-accent/10 text-accent-foreground"
                                        : message.type === "warning"
                                            ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                                            : "bg-primary/10 text-primary"
                            }`}>
                                <span dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                            </div>
                        )}

                        {/* Form Content */}
                        {children}

                        {/* Try Another Way Link */}
                        {auth !== undefined && auth.showTryAnotherWayLink && (
                            <form id="kc-select-try-another-way-form" action={url.loginAction} method="post" className="mt-6">
                                <input type="hidden" name="tryAnotherWay" value="on" />
                                <a
                                    href="#"
                                    id="try-another-way"
                                    onClick={() => {
                                        document.forms["kc-select-try-another-way-form" as never].submit();
                                        return false;
                                    }}
                                    className="text-primary hover:underline text-sm font-medium"
                                >
                                    {msg("doTryAnotherWay")}
                                </a>
                            </form>
                        )}
                    </CardContent>

                    {/* Social Providers or Info */}
                    {(socialProvidersNode || displayInfo || isAppInitiatedAction) && (
                        <CardFooter className="px-6 sm:px-12 pb-8 sm:pb-12 pt-0 flex-col space-y-4">
                            {/* Social Providers */}
                            {socialProvidersNode && (
                                <div className="w-full space-y-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-border" />
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="bg-card px-2 text-muted-foreground">
                                                or
                                            </span>
                                        </div>
                                    </div>
                                    {socialProvidersNode}
                                </div>
                            )}

                            {/* Info */}
                            {displayInfo && (
                                <div className="w-full text-center text-sm text-muted-foreground">
                                    {infoNode}
                                </div>
                            )}

                            {/* Back to app link */}
                            {isAppInitiatedAction && (
                                <div className="w-full text-center">
                                    <a
                                        className="text-primary hover:underline text-sm font-medium"
                                        href={url.loginUrl}
                                    >
                                        {msg("backToApplication")}
                                    </a>
                                </div>
                            )}
                        </CardFooter>
                    )}
                </Card>

                {/* Footer text - Google style */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-muted-foreground">
                        Powered by Sarafrika
                    </p>
                </div>
            </div>
        </div>
    );
}