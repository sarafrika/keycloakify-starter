import { lazy, Suspense } from "react";
import "./index.css";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import LoginUsername from "./pages/LoginUsername";
import { useI18n } from "./i18n";

const UserProfileFormFields = lazy(
    () => import("./UserProfileFormFields")
);
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const LoginPassword = lazy(() => import("./pages/LoginPassword"));
const LoginUpdateProfile = lazy(() => import("./pages/LoginUpdateProfile"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const LoginOauthGrant = lazy(() => import("./pages/LoginOauthGrant"));
const Error = lazy(() => import("./pages/Error"));
const LoginIdpLinkConfirm = lazy(() => import("./pages/LoginIdpLinkConfirm"));
const LoginIdpLinkEmail = lazy(() => import("./pages/LoginIdpLinkEmail"));
const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    case "register.ftl":
                        return (
                            <Register
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                    case "login-reset-password.ftl":
                        return (
                            <LoginResetPassword
                                doUseDefaultCss={false}
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                            />
                        );
                    case "login-update-password.ftl":
                        return (
                            <LoginUpdatePassword
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-username.ftl":
                        return (
                            <LoginUsername
                                doUseDefaultCss={false}
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                            />
                        );
                    case "login-password.ftl":
                        return (
                            <LoginPassword
                                doUseDefaultCss={false}
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                            />
                        );

                    case "login-update-profile.ftl":
                        return (
                            <LoginUpdateProfile
                                {...{ kcContext, i18n, classes }}
                                doUseDefaultCss={false}
                                Template={Template}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );

                    case "login-verify-email.ftl":
                        return (
                            <LoginVerifyEmail
                                doUseDefaultCss={false}
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                            />
                        );

                    case "login-oauth-grant.ftl": return (
                        <LoginOauthGrant
                            {...{ kcContext, i18n, classes }}
                            Template={Template}
                            doUseDefaultCss={false}
                        />
                    );
                    case "login-idp-link-confirm.ftl":
                        return (
                            <LoginIdpLinkConfirm
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-idp-link-email.ftl":
                        return (
                            <LoginIdpLinkEmail
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    case 'error.ftl':
                        return (
                            <Error
                                doUseDefaultCss={false}
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={false}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
