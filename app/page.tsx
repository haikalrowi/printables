import { Main } from "@/components/main";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Main />
      <SiteFooter />
    </div>
  );
}
