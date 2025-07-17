import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import PasswordWrapper from "../PasswordWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
            headerNode={msg("updatePasswordTitle")}
        >
            <form id="kc-passwd-update-form" className="space-y-4" action={url.loginAction} method="post">
                <div className="space-y-2">
                    <Label htmlFor="password-new" className="sr-only">
                        {msg("passwordNew")}
                    </Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                        <PasswordWrapper i18n={i18n} passwordInputId="password-new">
                            <Input
                                type="password"
                                id="password-new"
                                name="password-new"
                                className="w-full pl-10"
                                autoFocus
                                autoComplete="new-password"
                                placeholder={msgStr("passwordNew")}
                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            />
                        </PasswordWrapper>

                        {messagesPerField.existsError("password") && (
                            <span
                                id="input-error-password"
                                className="text-red-600 dark:text-red-400 text-sm"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("password"))
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password-confirm" className="sr-only">
                        {msg("passwordConfirm")}
                    </Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                        <PasswordWrapper i18n={i18n} passwordInputId="password-confirm">
                            <Input
                                type="password"
                                id="password-confirm"
                                name="password-confirm"
                                className="w-full pl-10"
                                autoComplete="new-password"
                                placeholder={msgStr("passwordConfirm")}
                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            />
                        </PasswordWrapper>

                        {messagesPerField.existsError("password-confirm") && (
                            <span
                                id="input-error-password-confirm"
                                className="text-red-600 dark:text-red-400 text-sm"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("password-confirm"))
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className="space-y-4 mt-6">
                    <LogoutOtherSessions i18n={i18n} />
                    <div id="kc-form-buttons" className="space-y-2">
                        <Button className="w-full py-2 text-lg font-semibold" type="submit" value={msgStr("doSubmit")}>
                            {msg("doSubmit")}
                        </Button>
                        {isAppInitiatedAction && (
                            <Button variant="outline" className="w-full py-2 text-lg font-semibold" type="submit" name="cancel-aia" value="true">
                                {msg("doCancel")}
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </Template>
    );
}

function LogoutOtherSessions(props: { i18n: I18n }) {
    const { i18n } = props;

    const { msg } = i18n;

    return (
        <div id="kc-form-options" className="flex items-center space-x-2">
            <input
                type="checkbox"
                id="logout-sessions"
                name="logout-sessions"
                value="on"
                defaultChecked={true}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-blue-500"
            />
            <Label htmlFor="logout-sessions" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {msg("logoutOtherSessions")}
            </Label>
        </div>
    );
}
