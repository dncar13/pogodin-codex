import { fireEvent, render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/sections/HeroSection";
import type { HeroCopy, SiteCopy } from "@/types/content";

describe("HeroSection", () => {
  const hero: HeroCopy = {
    kicker: "AI · Automation · Product",
    options: [
      { id: "sharp", label: "Option 1", headline: "Headline A", body: "Body A" },
      { id: "product", label: "Option 2", headline: "Headline B", body: "Body B" },
    ],
    ctas: [
      { label: "Primary", href: "#contact" },
      { label: "Secondary", href: "#projects" },
      { label: "Watch", href: "#youtube" },
    ],
    hint: "hint",
    portraitAlt: "portrait",
  };

  const social = { github: "#", linkedin: "#", email: "test@example.com" } as SiteCopy["social"];

  it("switches hero copy when selecting another option", () => {
    render(<HeroSection hero={hero} social={social} role="Role" locale="he" />);
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent("Headline A");
    const optionButton = screen.getByRole("tab", { name: /option 2/i });
    fireEvent.click(optionButton);
    expect(title).toHaveTextContent("Headline B");
  });

  it("toggles the palette when interacting with the portrait", () => {
    render(<HeroSection hero={hero} social={social} role="Role" locale="he" />);
    const panel = screen.getByRole("button", { name: hero.hint });
    fireEvent.keyDown(panel, { key: "Enter" });
    expect(screen.getByRole("region", { name: "Hero" })).toHaveClass("is-inverted");
  });
});
