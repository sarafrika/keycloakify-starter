import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";

export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, message } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={"Session Expired"}
        >
            <div className="space-y-6 text-center">
                {/* Expired Session Icon */}
                <div className="flex justify-center">
                    <div className="rounded-full bg-orange-100 dark:bg-orange-950/30 p-4">
                        <svg className="h-12 w-12 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>

                {/* Main Message */}
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Your login session has expired</h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                        For your security, we've logged you out after a period of inactivity. Please start the login process again to continue.
                    </p>
                </div>

                {/* Error Message (if present) */}
                {message !== undefined && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl">
                        <div className="flex items-start gap-3">
                            <svg className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div className="text-left">
                                <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">Additional Error Information</p>
                                <p
                                    className="text-sm text-red-700 dark:text-red-300 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Session Info */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <div className="text-left">
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Why did this happen?</p>
                            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                                Sessions expire automatically after a period of inactivity to protect your account. This is a standard security
                                measure.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                    <a href={url.loginRestartFlowUrl}>
                        <Button className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                <span>Start New Login</span>
                            </div>
                        </Button>
                    </a>

                    {url.loginAction && (
                        <a href={url.loginAction}>
                            <Button
                                variant="outline"
                                className="w-full h-12 text-base font-medium rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>Continue Previous Login</span>
                                </div>
                            </Button>
                        </a>
                    )}
                </div>

                {/* Security Tips */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Security Tips</h3>
                        <div className="grid gap-3 text-left">
                            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                <div className="rounded-full bg-green-100 dark:bg-green-950/30 p-1">
                                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Stay Active</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                        Keep your session active by regularly interacting with the application
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                <div className="rounded-full bg-green-100 dark:bg-green-950/30 p-1">
                                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Secure Browsing</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                        Always log out when using shared or public computers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Need help? Contact our support team if you continue to experience issues.
                    </p>
                </div>
            </div>
        </Template>
    );
}