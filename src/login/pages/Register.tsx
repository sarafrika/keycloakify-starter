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
import { cn } from "@/lib/utils";
import { SocialIcon } from "@/components/SocialIcon.tsx";

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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {social.providers.map(p => (
                                <a
                                    key={p.alias}
                                    id={`social-${p.alias}`}
                                    className="flex items-center justify-center gap-3 px-4 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-700/50 rounded-xl hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-slate-300/60 dark:hover:border-slate-600/60 transition-all duration-200 group shadow-sm hover:shadow-md"
                                    href={p.loginUrl}
                                >
                                    <SocialIcon
                                        provider={p.alias}
                                        className="h-5 w-5 flex-shrink-0"
                                    />
                                    <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors text-sm sm:text-base">
                                        {p.alias === 'google' ? 'Google' :
                                            p.alias === 'apple' ? 'Apple' :
                                                p.alias === 'microsoft' ? 'Microsoft' :
                                                    p.alias === 'facebook' ? 'Facebook' :
                                                        p.alias === 'github' ? 'GitHub' :
                                                            p.alias === 'twitter' || p.alias === 'x' ? 'X' :
                                                                p.alias === 'linkedin' ? 'LinkedIn' :
                                                                    p.alias === 'discord' ? 'Discord' :
                                                                        p.displayName || p.alias}
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
                            className={cn(
                                "w-full h-12 text-base font-semibold rounded-xl",
                                "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700",
                                "text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                            )}
                        >
                            {msg("doRegister")}
                        </Button>
                    ) : (
                        <Button
                            disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                            className={cn(
                                "w-full h-12 text-base font-semibold rounded-xl",
                                "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700",
                                "text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200",
                                (!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)) && "opacity-50 cursor-not-allowed transform-none"
                            )}
                            type="submit"
                            value={msgStr("doRegister")}
                        >
                            {msg("doRegister")}
                        </Button>
                    )}

                    <Button
                        variant="outline"
                        className="w-full h-12 text-base font-medium rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
                        onClick={(e) => {
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
        <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    className="mt-1 h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
                    checked={areTermsAccepted}
                    onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
                    aria-invalid={messagesPerField.existsError("termsAccepted")}
                />
                <div className="flex-1">
                    <Label htmlFor="termsAccepted" className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        I agree to the{" "}
                        <a
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                            href="#"
                            onClick={(e) => { e.preventDefault(); /* Open terms modal/page */ }}
                        >
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                            href="#"
                            onClick={(e) => { e.preventDefault(); /* Open privacy modal/page */ }}
                        >
                            Privacy Policy
                        </a>
                    </Label>
                </div>
            </div>
            {messagesPerField.existsError("termsAccepted") && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
                    <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span
                        className="text-sm text-red-600 dark:text-red-400"
                        dangerouslySetInnerHTML={{
                            __html: kcSanitize(messagesPerField.get("termsAccepted"))
                        }}
                    />
                </div>
            )}
        </div>
    );
}