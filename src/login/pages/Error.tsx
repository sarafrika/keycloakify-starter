import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client, skipLink } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("errorTitle")}
        >
            <div className="space-y-4 text-center">
                {message !== undefined && (
                    <p className="text-red-600 dark:text-red-400 font-medium" dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                )}

                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <div className="mt-6">
                        <a id="backToApplication" href={client.baseUrl}>
                            <Button className="w-full py-2 text-lg font-semibold">
                                {msg("backToApplication")}
                            </Button>
                        </a>
                    </div>
                )}
            </div>
        </Template>
    );
}
