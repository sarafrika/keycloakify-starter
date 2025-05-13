import type { ReactNode } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

export type TemplateProps = {
    kcContext: KcContext;
    i18n: I18n;
    doUseDefaultCss: boolean;
    classes?: Record<string, string>;
    children?: ReactNode;
    displayInfo?: boolean;
    displayMessage?: boolean;
    displayRequiredFields?: boolean;
    displayWide?: boolean;
    showAnotherWayIfPresent?: boolean;
    headerNode: ReactNode;
    infoNode?: ReactNode;
    formNode?: ReactNode;
    socialProvidersNode?: ReactNode;
};

export default function Template(props: TemplateProps) {
    const {
        kcContext,
        i18n,
        // Keeping these unused props in the type definition for compatibility
        // but not destructuring them to avoid linter errors
        // doUseDefaultCss,
        // classes,
        children,
        displayInfo = false,
        displayMessage = true,
        headerNode,
        infoNode,
        socialProvidersNode
    } = props;

    const { msg } = i18n;
    const { message, isAppInitiatedAction } = kcContext;

    return (
        <div className="min-h-screen flex">
            {/* Left side with illustration */}
            <div className="w-1/2 bg-gray-100  items-center justify-center  hidden md:flex">
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
                    {/* Header */}
                    <div className="mb-8 lg:mb-12 w-auto mx-auto flex items-center justify-center ">
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
                    <div className="text-2xl font-bold my-4">
                        {headerNode}
                    </div>
                    {/* Messages */}
                    {displayMessage && message !== undefined && (
                        <div className={`mb-4 p-3 rounded ${message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            <span dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                        </div>
                    )}

                    {/* Social Providers */}
                    {socialProvidersNode && (
                        <div className="mb-6">
                            {socialProvidersNode}
                        </div>
                    )}

                    {/* Form Content */}
                    <div className="mb-4 ">
                        {children}
                    </div>

                    {/* Info */}
                    <div className="text-muted-foreground">
                        {displayInfo && infoNode}
                    </div>

                    {/* Back to app link */}
                    {isAppInitiatedAction && (
                        <div className="text-center mt-4">
                            <a className="text-blue-600 hover:underline" href={kcContext.url.loginUrl}>
                                {msg("backToApplication")}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 