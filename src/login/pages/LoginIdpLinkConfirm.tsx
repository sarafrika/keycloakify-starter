import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LoginIdpLinkConfirm(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, idpAlias, message } = kcContext;

    const { msg } = i18n;

    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={message !== undefined}
            headerNode={"Link your account"}
        >
            <div className="space-y-6 text-center">
                {/* Link Icon */}
                <div className="flex justify-center">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-950/30 p-4">
                        <svg className="h-12 w-12 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            You are attempting to link your account with{" "}
                            <strong className="text-slate-900 dark:text-slate-50 font-semibold">
                                {idpAlias}
                            </strong>
                            .
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            This will allow you to sign in using your {idpAlias} credentials.
                        </p>
                    </div>

                    {/* Message Display */}
                    {message !== undefined && (
                        <div className={cn(
                            "p-4 rounded-xl border",
                            message.type === 'error' && 'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800',
                            message.type === 'success' && 'bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800',
                            message.type === 'warning' && 'bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800',
                            (!message.type || message.type === 'info') && 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800'
                        )}>
                            <div className="flex items-start gap-3">
                                <svg className={cn(
                                    "h-5 w-5 mt-0.5 flex-shrink-0",
                                    message.type === 'error' && 'text-red-500',
                                    message.type === 'success' && 'text-green-500',
                                    message.type === 'warning' && 'text-yellow-500',
                                    (!message.type || message.type === 'info') && 'text-blue-500'
                                )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span
                                    className={cn(
                                        "text-sm leading-relaxed",
                                        message.type === 'error' && 'text-red-800 dark:text-red-200',
                                        message.type === 'success' && 'text-green-800 dark:text-green-200',
                                        message.type === 'warning' && 'text-yellow-800 dark:text-yellow-200',
                                        (!message.type || message.type === 'info') && 'text-blue-800 dark:text-blue-200'
                                    )}
                                    dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Form Actions */}
                <form
                    id="kc-idp-link-confirm-form"
                    action={url.loginAction}
                    method="post"
                    className="space-y-3"
                    onSubmit={() => setIsFormSubmitting(true)}
                >
                    <Button
                        type="submit"
                        name="submitAction"
                        value="confirm"
                        disabled={isFormSubmitting}
                        className={cn(
                            'w-full h-12 text-base font-semibold rounded-xl',
                            'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
                            'text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200',
                            isFormSubmitting && "opacity-50 cursor-not-allowed transform-none"
                        )}
                    >
                        {isFormSubmitting ? (
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Linking...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                <span>{msg("doContinue")}</span>
                            </div>
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        type="submit"
                        name="submitAction"
                        value="cancel"
                        disabled={isFormSubmitting}
                        className={cn(
                            'w-full h-12 text-base font-medium rounded-xl',
                            'border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200',
                            isFormSubmitting && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {msg("doCancel")}
                    </Button>
                </form>

                {/* Help Text */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        By linking your account, you'll be able to sign in using either method in the future.
                    </p>
                </div>
            </div>
        </Template>
    );
}