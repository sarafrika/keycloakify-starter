import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function LoginIdpLinkEmail(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, idpAlias, message, brokerContext, realm, messagesPerField } = kcContext;

    const { msg } = i18n;

    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={message !== undefined}
            headerNode={String(msg("emailLinkIdpTitle", idpAlias))}
        >
            <div className="space-y-4 text-center">
                <p className="text-gray-700 dark:text-gray-300">
                    {`You are attempting to link your account with `}
                    <strong className="text-gray-900 dark:text-gray-50">{idpAlias}</strong>
                    {`.`}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                    {`To complete the linking process, please provide the username of your existing account in ${realm.displayName}.`}
                </p>

                {message !== undefined && (
                    <div
                        className={`p-3 rounded ${message.type === "error" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" : message.type === "success" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : message.type === "warning" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"}`}
                    >
                        <span dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                    </div>
                )}

                <form id="kc-link-idp-form" action={url.loginAction} method="post" className="space-y-4" onSubmit={() => setIsFormSubmitting(true)}>
                    <div className="space-y-2">
                        <Label htmlFor="username" className="sr-only">
                            {msg("username")}
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
                            <Input
                                type="text"
                                id="username"
                                name="username"
                                defaultValue={brokerContext.username ?? ""}
                                autoFocus
                                autoComplete="username"
                                placeholder="username"
                                aria-invalid={messagesPerField.existsError("username")}
                                className="pl-10"
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
                        <Button
                            type="submit"
                            name="submitAction"
                            value="link"
                            disabled={isFormSubmitting}
                            className={cn("w-full py-2 text-lg font-semibold", isFormSubmitting && "opacity-50 cursor-not-allowed")}
                        >
                            Link Account
                        </Button>
                        <Button
                            variant="outline"
                            type="submit"
                            name="submitAction"
                            value="cancel"
                            disabled={isFormSubmitting}
                            className={cn("w-full py-2 text-lg font-semibold", isFormSubmitting && "opacity-50 cursor-not-allowed")}
                        >
                            {msg("doCancel")}
                        </Button>
                    </div>
                </form>
            </div>
        </Template>
    );
}
