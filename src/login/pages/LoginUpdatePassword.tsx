import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import PasswordWrapper from "../PasswordWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={"Update your password"}
        >
            <form id="kc-passwd-update-form" className="space-y-5" action={url.loginAction} method="post">
                {/* New Password Field */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <PasswordWrapper i18n={i18n} passwordInputId="password-new">
                        <Input
                            type="password"
                            id="password-new"
                            name="password-new"
                            className={cn(
                                "w-full h-14 pl-12 pt-6 pb-2 bg-white/80 dark:bg-slate-800/80",
                                "border-2 border-slate-200 dark:border-slate-700 rounded-xl",
                                "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                                "transition-all duration-200 placeholder-transparent",
                                messagesPerField.existsError("password") && "border-red-300 dark:border-red-600 focus:ring-red-500"
                            )}
                            autoFocus
                            autoComplete="new-password"
                            placeholder=" "
                            aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                        />
                    </PasswordWrapper>
                    <Label
                        htmlFor="password-new"
                        className="absolute left-12 top-2 text-xs font-medium text-blue-600 dark:text-blue-400 transition-all duration-200 pointer-events-none"
                    >
                        {msg("passwordNew")}
                    </Label>
                </div>

                {messagesPerField.existsError("password") && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
                        <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span
                            className="text-sm text-red-600 dark:text-red-400"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("password"))
                            }}
                        />
                    </div>
                )}

                {/* Confirm Password Field */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <PasswordWrapper i18n={i18n} passwordInputId="password-confirm">
                        <Input
                            type="password"
                            id="password-confirm"
                            name="password-confirm"
                            className={cn(
                                "w-full h-14 pl-12 pt-6 pb-2 bg-white/80 dark:bg-slate-800/80",
                                "border-2 border-slate-200 dark:border-slate-700 rounded-xl",
                                "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                                "transition-all duration-200 placeholder-transparent",
                                messagesPerField.existsError("password-confirm") && "border-red-300 dark:border-red-600 focus:ring-red-500"
                            )}
                            autoComplete="new-password"
                            placeholder=" "
                            aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                        />
                    </PasswordWrapper>
                    <Label
                        htmlFor="password-confirm"
                        className="absolute left-12 top-2 text-xs font-medium text-blue-600 dark:text-blue-400 transition-all duration-200 pointer-events-none"
                    >
                        {msg("passwordConfirm")}
                    </Label>
                </div>

                {messagesPerField.existsError("password-confirm") && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
                        <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span
                            className="text-sm text-red-600 dark:text-red-400"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("password-confirm"))
                            }}
                        />
                    </div>
                )}

                {/* Logout Other Sessions */}
                <div className="pt-2">
                    <LogoutOtherSessions i18n={i18n} />
                </div>

                {/* Form Buttons */}
                <div className="space-y-3 pt-4">
                    <Button
                        className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                        type="submit"
                        value={msgStr("doSubmit")}
                    >
                        {msg("doSubmit")}
                    </Button>

                    {isAppInitiatedAction && (
                        <Button
                            variant="outline"
                            className="w-full h-12 text-base font-medium rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
                            type="submit"
                            name="cancel-aia"
                            value="true"
                        >
                            {msg("doCancel")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}

function LogoutOtherSessions(props: { i18n: I18n }) {
    const { i18n } = props;
    const { msg } = i18n;

    return (
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    id="logout-sessions"
                    name="logout-sessions"
                    value="on"
                    defaultChecked={true}
                    className="mt-1 h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:checked:bg-blue-500"
                />
                <div className="flex-1">
                    <Label htmlFor="logout-sessions" className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed cursor-pointer">
                        {msg("logoutOtherSessions")}
                    </Label>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        For security, we'll sign you out of all other devices and browsers.
                    </p>
                </div>
            </div>
        </div>
    );
}