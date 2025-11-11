import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SocialIcon } from "@/components/SocialIcon";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { messageHeader, url, social, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired } =
        kcContext;
    const { msg, msgStr, advancedMsg } = i18n;
    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            socialProvidersNode={
                <>
                    {social?.providers !== undefined && social.providers.length !== 0 && (
                        <div className="flex flex-col gap-3">
                            {social.providers.map(p => (
                                <a
                                    key={p.alias}
                                    id={`social-${p.alias}`}
                                    className="flex items-center justify-center gap-3 px-4 py-2.5 border border-border rounded hover:bg-muted/50 transition-colors"
                                    href={p.loginUrl}
                                >
                                    <SocialIcon provider={p.alias} className="h-5 w-5" />
                                    <span className="text-sm font-medium text-foreground">
                                        {p.alias === 'google' ? 'Sign up with Google' :
                                            p.alias === 'apple' ? 'Sign up with Apple' :
                                                p.alias === 'microsoft' ? 'Sign up with Microsoft' :
                                                    p.alias === 'facebook' ? 'Sign up with Facebook' :
                                                        p.alias === 'github' ? 'Sign up with GitHub' :
                                                            p.alias === 'twitter' || p.alias === 'x' ? 'Sign up with X' :
                                                                p.alias === 'linkedin' ? 'Sign up with LinkedIn' :
                                                                    p.alias === 'discord' ? 'Sign up with Discord' :
                                                                        `Sign up with ${p.displayName || p.alias}`}
                                    </span>
                                </a>
                            ))}
                        </div>
                    )}
                </>
            }
            headerNode={messageHeader !== undefined ? advancedMsg(messageHeader) : "Create your account"}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
        >
            <form id="kc-register-form" className="space-y-5" action={url.registrationAction} method="post">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />

                {termsAcceptanceRequired && (
                    <TermsAcceptance
                        i18n={i18n}
                        kcClsx={kcClsx}
                        messagesPerField={messagesPerField}
                        areTermsAccepted={areTermsAccepted}
                        onAreTermsAcceptedValueChange={setAreTermsAccepted}
                    />
                )}

                {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                    <div className="flex justify-center">
                        <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} data-action={recaptchaAction}></div>
                    </div>
                )}

                <div className="space-y-3 pt-2">
                    {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                        <Button
                            data-sitekey={recaptchaSiteKey}
                            data-callback={() => {
                                (document.getElementById("kc-register-form") as HTMLFormElement).submit();
                            }}
                            data-action={recaptchaAction}
                            type="submit"
                            className="w-full h-10"
                        >
                            {msg("doRegister")}
                        </Button>
                    ) : (
                        <Button
                            disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                            className="w-full h-10"
                            type="submit"
                            value={msgStr("doRegister")}
                        >
                            {msg("doRegister")}
                        </Button>
                    )}

                    <div className="text-center text-sm text-muted-foreground">
                        {msg("backToLogin")}{" "}
                        <a
                            href={url.loginUrl}
                            className="text-primary hover:underline font-medium"
                        >
                            {msgStr("doLogIn")}
                        </a>
                    </div>
                </div>
            </form>
        </Template>
    );
}

function TermsAcceptance(props: {
    i18n: I18n;
    kcClsx: KcClsx;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
    const { i18n, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;
    const { msg } = i18n;

    return (
        <div className="space-y-2">
            <div className="flex items-start gap-2">
                <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    className="mt-1 h-4 w-4 rounded border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    checked={areTermsAccepted}
                    onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
                    aria-invalid={messagesPerField.existsError("termsAccepted")}
                />
                <div className="flex-1">
                    <Label htmlFor="termsAccepted" className="text-sm text-muted-foreground font-normal cursor-pointer">
                        {msg("acceptTerms")}
                    </Label>
                </div>
            </div>
            {messagesPerField.existsError("termsAccepted") && (
                <div className="text-sm text-destructive">
                    <span
                        dangerouslySetInnerHTML={{
                            __html: kcSanitize(messagesPerField.get("termsAccepted"))
                        }}
                    />
                </div>
            )}
        </div>
    );
}