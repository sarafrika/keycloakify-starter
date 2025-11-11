import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PasswordWrapper from "../PasswordWrapper";
import { SocialIcon } from "@/components/SocialIcon";

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
            headerNode={"Welcome back"}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div className="text-center">
                    <span className="text-muted-foreground text-sm">
                        {msg("noAccount")}{" "}
                        <a
                            tabIndex={8}
                            href={url.registrationUrl}
                            className="text-primary hover:underline font-medium"
                        >
                            {msg("doRegister")}
                        </a>
                    </span>
                </div>
            }
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
                                        {p.alias === "google"
                                            ? "Continue with Google"
                                            : p.alias === "apple"
                                              ? "Continue with Apple"
                                              : p.alias === "microsoft"
                                                ? "Continue with Microsoft"
                                                : p.alias === "facebook"
                                                  ? "Continue with Facebook"
                                                  : p.alias === "github"
                                                    ? "Continue with GitHub"
                                                    : p.alias === "twitter" || p.alias === "x"
                                                      ? "Continue with X"
                                                      : p.alias === "linkedin"
                                                        ? "Continue with LinkedIn"
                                                        : p.alias === "discord"
                                                          ? "Continue with Discord"
                                                          : `Continue with ${p.displayName || p.alias}`}
                                    </span>
                                </a>
                            ))}
                        </div>
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
                                <Label htmlFor="username" className="text-sm font-medium text-foreground">
                                    Email
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
                                    className={cn(
                                        "h-11",
                                        messagesPerField.existsError("username", "password") && "border-destructive focus-visible:ring-destructive"
                                    )}
                                />
                            </div>
                        )}

                        {realm.password && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                        Password
                                    </Label>
                                    {realm.resetPasswordAllowed && (
                                        <a
                                            tabIndex={6}
                                            href={url.loginResetCredentialsUrl}
                                            className="text-sm font-medium text-primary hover:underline"
                                        >
                                            {msg("doForgotPassword")}
                                        </a>
                                    )}
                                </div>
                                <PasswordWrapper i18n={i18n} passwordInputId="password">
                                    <Input
                                        tabIndex={3}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                        className={cn(
                                            "h-11",
                                            messagesPerField.existsError("username", "password") && "border-destructive focus-visible:ring-destructive"
                                        )}
                                    />
                                </PasswordWrapper>
                            </div>
                        )}

                        {/* Error Messages */}
                        {messagesPerField.existsError("username", "password") && (
                            <div className="text-sm text-destructive">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                    }}
                                />
                            </div>
                        )}

                        {realm.rememberMe && !usernameHidden && (
                            <div className="flex items-center space-x-2">
                                <input
                                    tabIndex={5}
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    defaultChecked={!!login.rememberMe}
                                />
                                <Label htmlFor="rememberMe" className="text-sm text-muted-foreground font-normal cursor-pointer">
                                    {msg("rememberMe")}
                                </Label>
                            </div>
                        )}

                        <div id="kc-form-buttons" className="pt-2">
                            <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                            <Button
                                tabIndex={7}
                                disabled={isLoginButtonDisabled}
                                className="w-full h-10"
                                name="login"
                                id="kc-login"
                                type="submit"
                                value={msgStr("doLogIn")}
                            >
                                {isLoginButtonDisabled ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    msgStr("doLogIn")
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}