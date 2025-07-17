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
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
                        <div id="kc-social-providers" className="grid grid-cols-3 gap-2">
                            {social.providers.map(p =>
                                (
                                    <a
                                        key={p.alias}
                                        id={`social-${p.alias}`}
                                        className="flex items-center justify-center p-2 border rounded-md hover:bg-gray-50 transition-colors"
                                        href={p.loginUrl}
                                    >
                                        {p.alias === "google" && <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" className="h-5 w-5" />}
                                        {p.alias === "facebook" && <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="h-5 w-5" />}
                                        {p.alias === "apple" && <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-5 w-5" />}
                                        {!["google", "facebook", "apple"].includes(p.alias) && p.iconClasses && <i className={clsx(p.iconClasses)} aria-hidden="true"></i>}
                                    </a>)
                            )}
                        </div>
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
                <div className='flex flex-col gap-4 mt-6'>
                    <div id="kc-form-buttons" className='space-y-2'>
                        {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                            <Button
                                data-sitekey={recaptchaSiteKey}
                                data-callback={() => {
                                    (document.getElementById("kc-register-form") as HTMLFormElement).submit();
                                }}
                                data-action={recaptchaAction}
                                type="submit"
                                className='w-full py-2 text-lg font-semibold'
                            >
                                {msg("doRegister")}
                            </Button>
                        ) : (
                            <Button
                                disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                                className={cn('w-full py-2 text-lg font-semibold', (!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)) && "opacity-50 cursor-not-allowed")}
                                type="submit"
                                value={msgStr("doRegister")}
                            >
                                {msg("doRegister")}
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            className='w-full py-2 text-lg font-semibold'
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href = url.loginUrl;
                            }}
                        >
                            {msg("backToLogin")}
                        </Button>
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
        <div className="space-y-2 py-2">
            <div className='flex items-center gap-2'>
                <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-blue-500"
                    checked={areTermsAccepted}
                    onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
                    aria-invalid={messagesPerField.existsError("termsAccepted")}
                />
                <Label htmlFor="termsAccepted" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {msg("acceptTerms")}
                </Label>
                <a className="text-blue-600 hover:underline dark:text-blue-400 ml-auto" href="#" onClick={(e) => { e.preventDefault(); /* Open terms modal/page */ }}>{msg("termsText")}</a>
            </div>
            {messagesPerField.existsError("termsAccepted") && (
                <span
                    id="input-error-terms-accepted"
                    className="text-red-600 dark:text-red-400 text-sm"
                    aria-live="polite"
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(messagesPerField.get("termsAccepted"))
                    }}
                />
            )}
        </div>
    );
}
