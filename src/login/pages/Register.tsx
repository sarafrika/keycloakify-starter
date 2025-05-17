import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";

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
                        <>
                            <div className="text-center text-sm text-muted-foreground mb-4">Or Sign in with</div>
                            <div id="kc-social-providers" className="flex gap-2 justify-center flex-wrap mb-4">
                                {social.providers.map(p =>
                                (
                                    <a
                                        key={p.alias}
                                        id={`social-${p.alias}`}
                                        className="flex items-center flex-1 justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
                                        href={p.loginUrl}
                                    >
                                        {p.iconClasses && <i className={clsx(p.iconClasses)} aria-hidden="true"></i>}
                                        <span
                                            className={clsx("text-sm", p.iconClasses && "ml-1")}
                                            dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                        ></span>
                                    </a>)

                                )}
                            </div>
                        </>
                    )}
                </>
            }
            headerNode={messageHeader !== undefined ? advancedMsg(messageHeader) : msg("registerTitle")}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
        >
            <form id="kc-register-form" className='space-y-4' action={url.registrationAction} method="post">
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
                    <div className="form-group">
                        <div className=''>
                            <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} data-action={recaptchaAction}></div>
                        </div>
                    </div>
                )}
                <div className='space-y-4'>
                    <div id="kc-form-options" >
                        <div className='ml-auto max-w-fit'>
                            <span>
                                <a className="text-sm text-primary hover:underline" href={url.loginUrl}>{msg("backToLogin")}</a>
                            </span>
                        </div>
                    </div>

                    {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                        <div id="kc-form-buttons" >
                            <Button
                                data-sitekey={recaptchaSiteKey}
                                data-callback={() => {
                                    (document.getElementById("kc-register-form") as HTMLFormElement).submit();
                                }}
                                data-action={recaptchaAction}
                                type="submit"
                            >
                                {msg("doRegister")}
                            </Button>
                        </div>
                    ) : (
                        <div id="kc-form-buttons" >
                            <Button
                                disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                                className='w-full'
                                type="submit"
                                value={msgStr("doRegister")}
                            >
                                {msg("doRegister")}
                            </Button>
                        </div>
                    )}
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
    const { i18n, kcClsx, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;

    const { msg } = i18n;

    return (
        <div className="space-y-2 py-2">
            <div>
                <div className='flex items-center gap-4'>
                    {msg("termsTitle")}
                    <div id="kc-registration-terms-text" className='text-primary hover:underline'>{msg("termsText")}</div>
                </div>
            </div>
            <div >
                <div className='flex items-center gap-2'>
                    <input
                        type="checkbox"
                        id="termsAccepted"
                        name="termsAccepted"
                        className={kcClsx("kcCheckboxInputClass")}
                        checked={areTermsAccepted}
                        onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
                        aria-invalid={messagesPerField.existsError("termsAccepted")}
                    />
                    <label htmlFor="termsAccepted" className={kcClsx("kcLabelClass")}>
                        {msg("acceptTerms")}
                    </label>
                </div>
                {messagesPerField.existsError("termsAccepted") && (
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <span
                            id="input-error-terms-accepted"
                            className={kcClsx("kcInputErrorMessageClass")}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("termsAccepted"))
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
