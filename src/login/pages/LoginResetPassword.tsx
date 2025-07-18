import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                            {realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
                        </p>
                    </div>
                </div>
            }
            headerNode={"Reset your password"}
        >
            <form id="kc-reset-password-form" className="space-y-5" action={url.loginAction} method="post">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </div>
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        className={cn(
                            "w-full h-14 pl-12 pt-6 pb-2 bg-white/80 dark:bg-slate-800/80",
                            "border-2 border-slate-200 dark:border-slate-700 rounded-xl",
                            "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                            "transition-all duration-200 placeholder-transparent",
                            messagesPerField.existsError("username") && "border-red-300 dark:border-red-600 focus:ring-red-500"
                        )}
                        autoFocus
                        placeholder=" "
                        defaultValue={auth.attemptedUsername ?? ""}
                        aria-invalid={messagesPerField.existsError("username")}
                    />
                    <Label
                        htmlFor="username"
                        className="absolute left-12 top-2 text-xs font-medium text-blue-600 dark:text-blue-400 transition-all duration-200 pointer-events-none"
                    >
                        {!realm.loginWithEmailAllowed
                            ? msg("username")
                            : !realm.registrationEmailAsUsername
                                ? msg("usernameOrEmail")
                                : msg("email")}
                    </Label>
                </div>

                {messagesPerField.existsError("username") && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
                        <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span
                            className="text-sm text-red-600 dark:text-red-400"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("username"))
                            }}
                        />
                    </div>
                )}

                <div className="space-y-3 pt-2">
                    <Button
                        className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                        type="submit"
                        value={msgStr("doSubmit")}
                    >
                        Send Reset Email
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full h-12 text-base font-medium rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
                        onClick={e => {
                            e.preventDefault();
                            window.location.href = url.loginUrl;
                        }}
                    >
                        {msg("backToLogin")}
                    </Button>
                </div>
            </form>
        </Template>
    );
}