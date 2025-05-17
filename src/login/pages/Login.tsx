import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { clsx } from "keycloakify/tools/clsx";
import { cn } from "@/lib/utils";
import PasswordWrapper from "../PasswordWrapper";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container" className="text-sm mt-2">
                    <div id="kc-registration">
                        <span>
                            {msg("noAccount")}{" "}
                            <a tabIndex={8} href={url.registrationUrl} className="text-primary hover:underline">
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
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
                            {/* <div className="text-center text-sm text-muted-foreground mb-4">or</div> */}
                        </>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">

                    <form
                        id="kc-form-login"
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        className="space-y-4"
                        method="post"
                    >
                        {!usernameHidden && (
                            <div className="space-y-2">
                                <Label htmlFor="username">
                                    {!realm.loginWithEmailAllowed
                                        ? msg("username")
                                        : !realm.registrationEmailAsUsername
                                            ? msg("usernameOrEmail")
                                            : msg("email")}
                                </Label>
                                <Input
                                    tabIndex={2}
                                    id="username"
                                    name="username"
                                    defaultValue={login.username ?? ""}
                                    type="text"
                                    autoFocus
                                    autoComplete="username"
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                />
                                {messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className="text-sm text-red-500"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )}
                            </div>
                        )}

                        {realm.password && (
                            <div className="space-y-2">
                                <Label htmlFor="password">
                                    {msg("password")}
                                </Label>
                                <PasswordWrapper i18n={i18n} passwordInputId="password">
                                    <Input
                                        tabIndex={3}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    />
                                </PasswordWrapper>
                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className="text-sm text-red-500"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )}
                            </div>
                        )}


                        <div className="flex justify-between items-center">
                            <div id="kc-form-options">
                                {realm.rememberMe && !usernameHidden && (
                                    <div className="flex items-center">
                                        <input
                                            tabIndex={5}
                                            id="rememberMe"
                                            name="rememberMe"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 rounded"
                                            defaultChecked={!!login.rememberMe}
                                        />
                                        <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                                            {msg("rememberMe")}
                                        </label>
                                    </div>
                                )}
                            </div>
                            <div>
                                {realm.resetPasswordAllowed && (
                                    <a tabIndex={6} href={url.loginResetCredentialsUrl} className="text-sm text-blue-600 hover:underline">
                                        {msg("doForgotPassword")}
                                    </a>
                                )}
                            </div>
                        </div>

                        <div id="kc-form-buttons">
                            <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                            <Button
                                tabIndex={7}
                                disabled={isLoginButtonDisabled}
                                className={cn("w-full", isLoginButtonDisabled && "opacity-50 cursor-not-allowed")}
                                name="login"
                                id="kc-login"
                                type="submit"
                                value={msgStr("doLogIn")}
                            >
                                {msg("doLogIn")}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}

