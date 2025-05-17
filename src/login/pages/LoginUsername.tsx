import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
    const { kcContext, i18n, Template, classes } = props;



    const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration">
                    <span>
                        {msg("noAccount")}&nbsp;
                        <a className='text-primary hover:underline' tabIndex={6} href={url.registrationUrl}>
                            {msg("doRegister")}
                        </a>
                    </span>
                </div>
            }
            headerNode={msg("doLogIn")}
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
                                        {p.iconClasses && <i className={clsx('', p.iconClasses)} aria-hidden="true"></i>}
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
                    {realm.password && (
                        <form
                            className='space-y-4'
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            {!usernameHidden && (
                                <div className='space-y-2'>
                                    <Label htmlFor="username" >
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
                                        aria-invalid={messagesPerField.existsError("username")}
                                    />
                                    {messagesPerField.existsError("username") && (
                                        <span id="input-error" className='text-destructive py-2' aria-live="polite">
                                            {messagesPerField.getFirstError("username")}
                                        </span>
                                    )}
                                </div>
                            )}
                            <div className='space-y-2'>
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={3}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    defaultChecked={!!login.rememberMe}
                                                />{" "}
                                                {msg("rememberMe")}
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div id="kc-form-buttons" >
                                <Button
                                    tabIndex={4}
                                    disabled={isLoginButtonDisabled}
                                    className={'w-full'}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                >
                                    {msg("doLogIn")}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
