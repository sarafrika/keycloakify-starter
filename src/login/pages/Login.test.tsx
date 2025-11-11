import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Login from "./Login";

const MockTemplate: PageProps<KcContext, I18n>["Template"] = ({ children }) => (
    <div data-testid="kc-template">{children}</div>
);

const baseMessages = () => ({
    existsError: vi.fn(() => false),
    getFirstError: vi.fn(() => "")
});

const createProps = (overrides?: Partial<PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>>): PageProps<
    Extract<KcContext, { pageId: "login.ftl" }>,
    I18n
> => {
    const messagesPerField = baseMessages();

    const kcContext = {
        pageId: "login.ftl",
        social: { providers: [] },
        realm: {
            password: true,
            registrationAllowed: true,
            resetPasswordAllowed: true,
            rememberMe: true
        },
        url: {
            loginAction: "/login",
            registrationUrl: "/register",
            loginResetCredentialsUrl: "/forgot"
        },
        usernameHidden: false,
        login: {
            rememberMe: true,
            username: "",
            password: ""
        },
        auth: { selectedCredential: "password" },
        registrationDisabled: false,
        messagesPerField
    } satisfies Extract<KcContext, { pageId: "login.ftl" }>;

    const i18n: I18n = {
        msg: (key: string) => key,
        msgStr: (key: string) => key,
        currentLanguage: { languageTag: "en", label: "English" },
        enabledLanguages: [{ languageTag: "en", label: "English", href: "#" }]
    } as I18n;

    const mergedKcContext = { ...kcContext, ...(overrides?.kcContext ?? {}) };
    const mergedI18n = { ...i18n, ...(overrides?.i18n ?? {}) };

    return {
        doUseDefaultCss: false,
        classes: {},
        Template: MockTemplate,
        ...overrides,
        kcContext: mergedKcContext,
        i18n: mergedI18n
    };
};

describe("Login page", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("shows field-level error feedback when username or password fails validation", () => {
        const props = createProps();
        const messagesPerField = {
            existsError: vi.fn(() => true),
            getFirstError: vi.fn(() => "Invalid credentials")
        };
        props.kcContext = { ...props.kcContext, messagesPerField };

        render(<Login {...props} />);

        expect(messagesPerField.existsError).toHaveBeenCalledWith("username", "password");
        expect(screen.getByText("Invalid credentials")).toBeVisible();
    });

    it("submits the form once, disables the button, and shows spinner copy", () => {
        const { container } = render(<Login {...createProps()} />);

        const form = container.querySelector<HTMLFormElement>("#kc-form-login");
        expect(form).toBeTruthy();

        form && fireEvent.submit(form);

        const button = screen.getByRole("button", { name: /Signing in/i });
        expect(button).toBeDisabled();
    });

    it("honors rememberMe defaults when the realm allows it", () => {
        const props = createProps();
        render(<Login {...props} />);

        const rememberMeCheckbox = screen.getByLabelText(/rememberme/i) as HTMLInputElement;
        expect(rememberMeCheckbox).toBeChecked();
    });
});
