import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client, skipLink } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={"Something went wrong"}
        >
            <div className="space-y-6 text-center">
                {/* Error Icon */}
                <div className="flex justify-center">
                    <div className="rounded-full bg-red-100 dark:bg-red-950/30 p-4">
                        <svg className="h-12 w-12 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    </div>
                </div>

                {/* Error Message */}
                {message !== undefined && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl">
                        <div className="flex items-start gap-3">
                            <svg className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p
                                className="text-sm text-red-800 dark:text-red-200 leading-relaxed text-left"
                                dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }}
                            />
                        </div>
                    </div>
                )}

                {/* Default Error Message if no specific message */}
                {message === undefined && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                            An unexpected error occurred
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            We're sorry, but something went wrong. Please try again or contact support if the problem persists.
                        </p>
                    </div>
                )}

                {/* Back to Application Button */}
                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <div className="pt-4">
                        <a id="backToApplication" href={client.baseUrl}>
                            <Button className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
                                {msg("backToApplication")}
                            </Button>
                        </a>
                    </div>
                )}

                {/* Additional Help Text */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        If you continue to experience issues, please contact our support team.
                    </p>
                </div>
            </div>
        </Template>
    );
}