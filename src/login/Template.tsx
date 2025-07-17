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
        // Overall container, min-h-screen to ensure it takes full height, flex to center content
        // Added background image and styling for it
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundImage: `url(${"http://googleusercontent.com/file_content/0"})`, // Using the uploaded image as background
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            {/* Language Selector - positioned absolutely to be outside the card, but still relative to the flex container */}
            <div className="absolute top-5 right-5">
                {enabledLanguages.length > 1 && (
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
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-controls="language-switch1"
                            className="w-auto" // Adjust width for language selector
                        >
                            {currentLanguage.label}
                        </SelectTrigger>
                        <SelectContent
                            role="menu"
                            tabIndex={-1}
                            aria-labelledby="kc-current-locale-link"
                            aria-activedescendant=""
                            id="language-switch1"
                            className="max-h-[500px] overflow-y-auto"
                        >
                            {enabledLanguages.map(({ languageTag, label, href }, i) => (
                                <SelectItem value={languageTag} key={languageTag} role="none">
                                    <a role="menuitem" id={`language-${i + 1}`} href={href}>
                                        {label}
                                    </a>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>

            {/* The main card container, mimicking the inspiration */}
            {/* Added shadcn Card components and styling for the frosted glass effect */}
            <Card className="w-full max-w-md mx-auto p-6 rounded-2xl shadow-xl backdrop-blur-md bg-white/70 dark:bg-black/70">
                <CardHeader className="text-center pb-4">
                    {/* Elimika Logo - Placed before the header text */}
                    <div className="mb-4 w-auto mx-auto flex items-center justify-center">
                        <img
                            width={150}
                            height={50}
                            src="/assets/logo.png"
                            alt="Elimika logo"
                            className="object-contain"
                            onError={e => {
                                // Fallback if image doesn't exist
                                const target = e.target as HTMLImageElement;
                                target.src =
                                    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YwZjRmOCI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT09IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIyNnB4IiBmaWxsPSIjOTRhM2I4Ij5Mb2dpbiBJbGx1c3RyYXRpb248L2x0ZXh0Pjwvc3ZnPg==";
                            }}
                        />
                    </div>
                    {/* Arrow icon and dynamic headerNode */}
                    {/* Changed alignment to flex-start (left-aligned), reduced font size to text-xl, and boldness to font-semibold */}
                    <div className="flex items-center justify-start">
                        {" "}
                        {/* Changed justify-center to justify-start */}
                        <span className="text-xl font-semibold mr-2">→</span> {/* Reduced font size and boldness */}
                        <CardTitle className="text-xl font-semibold text-left">{headerNode}</CardTitle>{" "}
                        {/* Reduced font size and boldness, added text-left */}
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Messages */}
                    {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                        <div
                            className={`p-3 rounded ${message.type === "error" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" : message.type === "success" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : message.type === "warning" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"}`}
                        >
                            <span dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                        </div>
                    )}

                    {/* Form Content (children from Login.tsx will be rendered here) */}
                    {children}

                    {/* Try Another Way Link */}
                    {auth !== undefined && auth.showTryAnotherWayLink && (
                        <form id="kc-select-try-another-way-form" action={url.loginAction} method="post" className="mt-4 text-center">
                            <input type="hidden" name="tryAnotherWay" value="on" />
                            <a
                                href="#"
                                id="try-another-way"
                                onClick={() => {
                                    document.forms["kc-select-try-another-way-form" as never].submit();
                                    return false;
                                }}
                                className="text-blue-600 hover:underline dark:text-blue-400"
                            >
                                {msg("doTryAnotherWay")}
                            </a>
                        </form>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col gap-4 pt-4">
                    {/* Social Providers */}
                    {socialProvidersNode && (
                        <>
                            <div className="relative flex justify-center text-xs uppercase w-full">
                                <span className="bg-white px-2 text-muted-foreground dark:bg-black dark:text-gray-400">Or sign in with</span>
                            </div>
                            {socialProvidersNode}
                        </>
                    )}

                    {/* Info (e.g., "Don't have an account?") */}
                    {displayInfo && <div className="mt-2 text-center">{infoNode}</div>}

                    {/* Back to app link */}
                    {isAppInitiatedAction && (
                        <div className="text-center mt-2">
                            <a className="text-blue-600 hover:underline dark:text-blue-400" href={url.loginUrl}>
                                {msg("backToApplication")}
                            </a>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
