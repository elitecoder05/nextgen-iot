import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/LandingPage";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "NextGenIoT — Connect • Automate • Innovate" },
      {
        name: "description",
        content:
          "NextGenIoT builds futuristic IoT devices, full-stack apps, mobile apps, and project kits. From idea to working product.",
      },
      { property: "og:title", content: "NextGenIoT — From Idea to Working Product" },
      {
        property: "og:description",
        content: "IoT, full-stack, mobile, and deployment — premium engineering for connected products.",
      },
    ],
  }),
});
