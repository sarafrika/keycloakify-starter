import { useEffect } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

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
        <div className="min-h-screen flex">
            {/* Left side with illustration */}
            <div className="w-1/2 bg-gray-100 items-center justify-center hidden md:flex">
                <div className="size-80">
                    <img
                        src="/assets/auth-illustration.svg"
                        alt="Security illustration"
                        className="object-contain"
                        onError={(e) => {
                            // Fallback if image doesn't exist
                            const target = e.target as HTMLImageElement;
                            target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YwZjRmOCI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjI2cHgiIGZpbGw9IiM5NGEzYjgiPkxvZ2luIElsbHVzdHJhdGlvbjwvdGV4dD48L3N2Zz4=";
                        }}
                    />
                </div>
            </div>

            {/* Right side with form */}
            <div className="w-full sm:w-3/4 md:w-1/2 mx-auto flex items-center justify-start px-8 py-6">
                <div className="w-full md:max-w-xs mx-auto">
                    {/* Language Selector */}
                    <div className=" max-w-fit absolute top-5 right-5">
                        {enabledLanguages.length > 1 && (
                            <Select value={currentLanguage.languageTag} onValueChange={(value) => {
                                window.location.href = enabledLanguages.find((lang) => lang.languageTag === value)?.href ?? window.location.href;
                            }}>
                                <div className="relative">
                                    <SelectTrigger
                                        tabIndex={1}
                                        id="kc-current-locale-link"
                                        aria-label={msgStr("languages")}
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        aria-controls="language-switch1"
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
                                </div>
                            </Select>
                        )}
                    </div>
                    {/* Header */}
                    <div className="mb-8 lg:mb-12 w-auto mx-auto flex items-center justify-center">
                        <img
                            width={150}
                            height={50}
                            src="/assets/logo.png"
                            alt="Elimika logo"
                            className="object-contain"
                            onError={(e) => {
                                // Fallback if image doesn't exist
                                const target = e.target as HTMLImageElement;
                                target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YwZjRmOCI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjI2cHgiIGZpbGw9IiM5NGEzYjgiPkxvZ2luIElsbHVzdHJhdGlvbjwvdGV4dD48L3N2Zz4=";
                            }}
                        />
                    </div>
                    <div className="text-xl font-bold mb-4">
                        {headerNode}
                    </div>



                    {/* Messages */}
                    {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                        <div className={`mb-4 p-3 rounded ${message.type === 'error' ? 'bg-red-100 text-red-800' : message.type === 'success' ? 'bg-green-100 text-green-800' : message.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                            <span dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                        </div>
                    )}

                    {/* Form Content */}
                    <div className="mb-4">
                        {children}
                    </div>

                    {/* Try Another Way Link */}
                    {auth !== undefined && auth.showTryAnotherWayLink && (
                        <form id="kc-select-try-another-way-form" action={url.loginAction} method="post" className="mt-4">
                            <input type="hidden" name="tryAnotherWay" value="on" />
                            <a
                                href="#"
                                id="try-another-way"
                                onClick={() => {
                                    document.forms["kc-select-try-another-way-form" as never].submit();
                                    return false;
                                }}
                                className="text-blue-600 hover:underline"
                            >
                                {msg("doTryAnotherWay")}
                            </a>
                        </form>
                    )}

                    {/* Social Providers */}
                    {socialProvidersNode && (
                        <div className="mb-6">
                            {socialProvidersNode}
                        </div>
                    )}

                    {/* Info */}
                    {displayInfo && (
                        <div className="mt-6">
                            {infoNode}
                        </div>
                    )}

                    {/* Back to app link */}
                    {isAppInitiatedAction && (
                        <div className="text-center mt-4">
                            <a className="text-blue-600 hover:underline" href={url.loginUrl}>
                                {msg("backToApplication")}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
