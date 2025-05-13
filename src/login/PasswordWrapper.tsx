import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import type { I18n } from "./i18n";
import { Button } from "@/components/ui/button";
export default function PasswordWrapper(props: { i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });

    return (
        <div className="relative">
            {children}
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className='absolute right-0 top-1/2 -translate-y-1/2'
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                <i className={isPasswordRevealed ? 'fa fa-eye' : 'fa fa-eye-slash'} aria-hidden />
            </Button>
        </div>
    );
}