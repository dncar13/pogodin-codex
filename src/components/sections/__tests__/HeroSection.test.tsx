import { fireEvent, render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/sections/HeroSection";
import type { HeroCopy, SiteCopy } from "@/types/content";

describe("HeroSection", () => {
  const hero: HeroCopy = {
    titleA: "Title A",
    titleB: "Title B",
    subtitleA: "Subtitle A",
    subtitleB: "Subtitle B",
    primaryCta: "Primary",
    secondaryCta: "Secondary",
    hint: "hint",
  };

  const social = { github: "#", linkedin: "#", email: "test@example.com" } as SiteCopy["social"];

  it("toggles copy when portrait panel receives keyboard input", () => {
    render(<HeroSection hero={hero} social={social} role="Role" locale="he" />);
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent("Title A");
    const panel = screen.getByRole("button", { name: hero.hint });
    fireEvent.keyDown(panel, { key: "Enter" });
    expect(title).toHaveTextContent("Title B");
  });
});
