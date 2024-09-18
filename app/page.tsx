import { Banner } from "@/components/banner";
import { CtrlJ } from "@/components/ctrl-j";
import { Printables } from "@/components/printables";
import { SiteFooter } from "@/components/site-footer";

export const revalidate = 0;

export default async function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Banner />
      <Printables />
      <SiteFooter />
      <CtrlJ />
    </div>
  );
}
