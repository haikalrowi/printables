import { CtrlJ } from "@/components/ctrl-j";
import { Main } from "@/components/main";
import { SiteFooter } from "@/components/site-footer";

export const revalidate = 0;

export default async function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Main />
      <SiteFooter />
      <CtrlJ />
    </div>
  );
}
