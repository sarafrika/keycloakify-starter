import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SocialIcon } from "./SocialIcon";

describe("SocialIcon", () => {
    it("renders the requested provider icon when available", () => {
        render(<SocialIcon provider="Google" />);

        expect(screen.getByLabelText("Google")).toBeInTheDocument();
    });

    it("falls back to the generic Sign in icon when provider is missing", () => {
        render(<SocialIcon provider="unknown" />);

        expect(screen.getByLabelText("Sign in")).toBeInTheDocument();
    });
});
