import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
            infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
            headerNode={msg("emailForgotTitle")}
        >
            <form id="kc-reset-password-form" className="space-y-4" action={url.loginAction} method="post">
                <div className="space-y-2">
                    <Label htmlFor="username" className="sr-only">
                        {msg("usernameOrEmail")}
                    </Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
                        <Input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full pl-10"
                            autoFocus
                            placeholder={msgStr("usernameOrEmail")}
                            defaultValue={auth.attemptedUsername ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                        />
                        {messagesPerField.existsError("username") && (
                            <span
                                id="input-error-username"
                                className="text-red-600 dark:text-red-400 text-sm"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("username"))
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-6">
                    {" "}
                    {/* Adjusted spacing and layout for buttons */}
                    <div id="kc-form-buttons" className="space-y-2">
                        <Button className="w-full py-2 text-lg font-semibold" type="submit" value={msgStr("doSubmit")}>
                            {msg("doSubmit")}
                        </Button>
                        <Button
                            variant="outline" // Use outline variant for secondary action
                            className="w-full py-2 text-lg font-semibold" // Consistent button sizing
                            onClick={e => {
                                e.preventDefault(); // Prevent default form submission
                                window.location.href = url.loginUrl; // Navigate back
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
