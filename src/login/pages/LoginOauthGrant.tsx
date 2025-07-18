import { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PageProps } from "keycloakify/login/pages/PageProps";

export default function LoginOauthGrant(props: PageProps<Extract<KcContext, { pageId: "login-oauth-grant.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { url, oauth, client } = kcContext;

    const { msg, msgStr, advancedMsg, advancedMsgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            bodyClassName="oauth"
            headerNode={
                client.name
                    ? `Authorize ${advancedMsgStr(client.name)}`
                    : `Authorize ${client.clientId}`
            }
        >
            <div className="space-y-6">
                {/* Authorization Icon */}
                <div className="flex justify-center">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-950/30 p-4">
                        <svg className="h-12 w-12 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                </div>

                {/* App Info */}
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        {client.name ? advancedMsgStr(client.name) : client.clientId}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        wants to access your Sarafrika account
                    </p>
                </div>

                {/* Permissions Request */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {msg("oauthGrantRequest")}
                    </h3>

                    <div className="space-y-3">
                        {oauth.clientScopesRequested.map(clientScope => (
                            <div key={clientScope.consentScreenText} className="flex items-start gap-3">
                                <div className="rounded-full bg-blue-100 dark:bg-blue-950/30 p-1 mt-0.5">
                                    <svg className="h-3 w-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <span className="text-sm text-slate-700 dark:text-slate-300">
                                        {advancedMsg(clientScope.consentScreenText)}
                                        {clientScope.dynamicScopeParameter && (
                                            <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-950/30 text-blue-800 dark:text-blue-200 text-xs rounded-md font-medium">
                                                {clientScope.dynamicScopeParameter}
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* App Information */}
                {(client.attributes.policyUri || client.attributes.tosUri) && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
                            {client.name
                                ? msg("oauthGrantInformation", advancedMsgStr(client.name))
                                : msg("oauthGrantInformation", client.clientId)
                            }
                        </h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                            {msg("oauthGrantReview")}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {client.attributes.tosUri && (
                                <a
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs rounded-lg hover:bg-blue-200 dark:hover:bg-blue-950/70 transition-colors"
                                    href={client.attributes.tosUri}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    {msg("oauthGrantTos")}
                                </a>
                            )}
                            {client.attributes.policyUri && (
                                <a
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs rounded-lg hover:bg-blue-200 dark:hover:bg-blue-950/70 transition-colors"
                                    href={client.attributes.policyUri}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    {msg("oauthGrantPolicy")}
                                </a>
                            )}
                        </div>
                    </div>
                )}

                {/* Authorization Form */}
                <form className="space-y-3" action={url.oauthAction} method="POST">
                    <input type="hidden" name="code" value={oauth.code} />

                    <Button
                        name="accept"
                        id="kc-login"
                        type="submit"
                        value={msgStr("doYes")}
                        className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Allow Access</span>
                        </div>
                    </Button>

                    <Button
                        variant="outline"
                        name="cancel"
                        id="kc-cancel"
                        type="submit"
                        value={msgStr("doNo")}
                        className="w-full h-12 text-base font-medium rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>Deny Access</span>
                        </div>
                    </Button>
                </form>

                {/* Security Notice */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-start gap-2">
                        <svg className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            By clicking "Allow Access", you authorize this application to access your account information as described above. You can revoke this access at any time from your account settings.
                        </p>
                    </div>
                </div>
            </div>
        </Template>
    );
}