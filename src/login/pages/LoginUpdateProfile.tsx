import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LoginUpdateProfileProps = PageProps<Extract<KcContext, { pageId: "login-update-profile.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function LoginUpdateProfile(props: LoginUpdateProfileProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { messagesPerField, url, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayRequiredFields
            headerNode={"Complete your profile"}
            displayMessage={messagesPerField.exists("global")}
        >
            <div className="space-y-6">
                {/* Info Banner */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                                Profile Update Required
                            </p>
                            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                Please complete your profile information to continue using Sarafrika.
                            </p>
                        </div>
                    </div>
                </div>

                <form id="kc-update-profile-form" className="space-y-6" action={url.loginAction} method="post">
                    <UserProfileFormFields
                        kcContext={kcContext}
                        i18n={i18n}
                        kcClsx={kcClsx}
                        onIsFormSubmittableValueChange={setIsFormSubmittable}
                        doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                    />

                    <div className="space-y-3 pt-4">
                        <Button
                            disabled={!isFormSubmittable}
                            className={cn(
                                'w-full h-12 text-base font-semibold rounded-xl',
                                'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
                                'text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200',
                                !isFormSubmittable && "opacity-50 cursor-not-allowed transform-none"
                            )}
                            type="submit"
                            value={msgStr("doSubmit")}
                        >
                            {!isFormSubmittable ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Please complete required fields</span>
                                </div>
                            ) : (
                                msg("doSubmit")
                            )}
                        </Button>

                        {isAppInitiatedAction && (
                            <Button
                                variant="outline"
                                type="submit"
                                className="w-full h-12 text-base font-medium rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
                                name="cancel-aia"
                                value="true"
                                formNoValidate
                            >
                                {msg("doCancel")}
                            </Button>
                        )}
                    </div>
                </form>

                {/* Progress Indicator */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Step 2 of 2: Complete your profile</span>
                    </div>
                </div>
            </div>
        </Template>
    );
}