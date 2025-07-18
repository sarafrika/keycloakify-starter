import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;

    const { url, user } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            headerNode={"Verify your email"}
            infoNode={
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                            <p className="mb-2">{msg("emailVerifyInstruction2")}</p>
                            <p>
                                <a
                                    className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors underline"
                                    href={url.loginAction}
                                >
                                    {msg("doClickHere")}
                                </a>
                                {" "}
                                {msg("emailVerifyInstruction3")}
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-6 text-center">
                {/* Email Icon */}
                <div className="flex justify-center">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-950/30 p-4">
                        <svg className="h-12 w-12 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>

                {/* Main Message */}
                <div className="space-y-2">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {msg("emailVerifyInstruction1", user?.email ?? "")}
                    </p>
                </div>

                {/* Email Display */}
                {user?.email && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-center gap-2">
                            <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <span className="font-medium text-slate-800 dark:text-slate-200">
                                {user.email}
                            </span>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                    <a href={url.loginAction}>
                        <Button className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
                            Check Email & Continue
                        </Button>
                    </a>

                    <Button
                        variant="outline"
                        className="w-full h-12 text-base font-medium rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
                        onClick={() => window.location.reload()}
                    >
                        Resend Verification Email
                    </Button>
                </div>

                {/* Help Text */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="space-y-2">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Didn't receive the email? Check your spam folder or contact support.
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-xs text-slate-400 dark:text-slate-500">
                            <span>Email verification expires in 24 hours</span>
                            <span>•</span>
                            <span>Need help? Contact support</span>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    );
}