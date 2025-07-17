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
                client.name ? msg("oauthGrantTitle", advancedMsgStr(client.name)) : msg("oauthGrantTitle", client.clientId)
            }
        >
            <div id="kc-oauth" className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{msg("oauthGrantRequest")}</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    {oauth.clientScopesRequested.map(clientScope => (
                        <li key={clientScope.consentScreenText}>
                            <span>
                                {advancedMsg(clientScope.consentScreenText)}
                                {clientScope.dynamicScopeParameter && (
                                    <>
                                        &nbsp;- <b className="font-medium">{clientScope.dynamicScopeParameter}</b>
                                    </>
                                )}
                            </span>
                        </li>
                    ))}
                </ul>

                {(client.attributes.policyUri || client.attributes.tosUri) && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            {client.name ? msg("oauthGrantInformation", advancedMsgStr(client.name)) : msg("oauthGrantInformation", client.clientId)}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            {msg("oauthGrantReview")}
                            {client.attributes.tosUri && (
                                <a
                                    className="text-blue-600 hover:underline dark:text-blue-400 ml-1"
                                    href={client.attributes.tosUri}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    {msg("oauthGrantTos")}
                                </a>
                            )}
                            {client.attributes.policyUri && (
                                <a
                                    className="text-blue-600 hover:underline dark:text-blue-400 ml-1"
                                    href={client.attributes.policyUri}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    {msg("oauthGrantPolicy")}
                                </a>
                            )}
                        </p>
                    </div>
                )}

                <form className="space-y-4" action={url.oauthAction} method="POST">
                    <input type="hidden" name="code" value={oauth.code} />
                    <div id="kc-form-buttons" className="flex gap-4 justify-center">
                        <Button
                            variant={"outline"}
                            name="accept"
                            id="kc-login"
                            type="submit"
                            value={msgStr("doYes")}
                            className="flex-1 py-2 text-lg font-semibold"
                        >
                            {msgStr("doYes")}
                        </Button>
                        <Button
                            variant={"outline"}
                            name="cancel"
                            id="kc-cancel"
                            type="submit"
                            value={msgStr("doNo")}
                            className="flex-1 py-2 text-lg font-semibold"
                        >
                            {msgStr("doNo")}
                        </Button>
                    </div>
                </form>
            </div>
        </Template>
    );
}
