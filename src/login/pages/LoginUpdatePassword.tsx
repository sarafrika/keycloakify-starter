import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import PasswordWrapper from "../PasswordWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

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
            <form id="kc-passwd-update-form" className='space-y-4' action={url.loginAction} method="post">
                <div className='space-y-2'>
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <Label htmlFor="password-new" >
                            {msg("passwordNew")}
                        </Label>
                    </div>
                    <div className='space-y-1'>
                        <PasswordWrapper i18n={i18n} passwordInputId="password-new">
                            <Input
                                type="password"
                                id="password-new"
                                name="password-new"
                                className='w-full'
                                autoFocus
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            />
                        </PasswordWrapper>

                        {messagesPerField.existsError("password") && (
                            <span
                                id="input-error-password"
                                className='text-destructive'
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("password"))
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className='space-y-2'>
                    <div className='space-y-1'>
                        <Label htmlFor="password-confirm" >
                            {msg("passwordConfirm")}
                        </Label>
                    </div>
                    <div className='space-y-1'>
                        <PasswordWrapper i18n={i18n} passwordInputId="password-confirm">
                            <Input
                                type="password"
                                id="password-confirm"
                                name="password-confirm"
                                className='w-full'
                                autoFocus
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            />
                        </PasswordWrapper>

                        {messagesPerField.existsError("password-confirm") && (
                            <span
                                id="input-error-password-confirm"
                                className='text-destructive'
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("password-confirm"))
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className='space-y-4'>
                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                    <div id="kc-form-buttons" className='space-y-2'>
                        <Button
                            className='w-full'
                            type="submit"
                            value={msgStr("doSubmit")}
                        >
                            {msg("doSubmit")}
                        </Button>
                        {isAppInitiatedAction && (
                            <Button
                                variant="outline"
                                className='w-full'
                                type="submit"
                                name="cancel-aia"
                                value="true"
                            >
                                {msg("doCancel")}
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </Template>
    );
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;

    const { msg } = i18n;

    return (
        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                <div className="checkbox">
                    <Label>
                        <input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
                        {msg("logoutOtherSessions")}
                    </Label>
                </div>
            </div>
        </div>
    );
}

