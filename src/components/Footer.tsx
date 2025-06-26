import { cn } from "@/lib/utils";
import {
  SiGithub as GithubIcon,
  SiLinkerd as LinkedinIcon,
  SiInstagram as InstagramIcon,
  SiGmail as GmailIcon,
} from "@icons-pack/react-simple-icons";
import Link from "@/components/Link";

const socialLinks = [
  { name: "Github", icon: GithubIcon, url: "https://github.com/souravrax" },
  {
    name: "LinkedIn",
    icon: LinkedinIcon,
    url: "https://www.linkedin.com/in/souravrax/",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    url: "https://www.instagram.com/rax.lens/",
  },
  {
    name: "Gmail",
    icon: GmailIcon,
    url: "mailto:rakshitsourav3@gmail.com",
  },
];

export default function Footer() {
  return (
    <footer className="h-screen bg-accent p-12 w-full flex flex-col items-center justify-center gap-8">
      <h1
        className={cn(
          "text-background text-wrap uppercase text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] text-center leading-none font-extrabold",
          "font-array"
        )}
      >
        Let&apos;s
        <br />
        create
        <br />
        <span className="">together</span>
      </h1>
      <div className="w-full flex justify-center flex-col items-center gap-4">
        <Link
          href="mailto:rakshitsourav3@gmail.com"
          className={cn(
            "text-background rounded-full border-background border-2 hover:text-accent hover:bg-background transition-all",
            "text-sm px-4 py-2 sm:text-base sm:px-6 sm:py-3 md:text-lg md:px-8 md:py-4 lg:text-xl lg:px-10 lg:py-5 xl:text-2xl xl:px-12 xl:py-6"
          )}
        >
          Contact
        </Link>
        <div className={cn("mx-auto max-w-screen-lg space-y-4 px-4")}>
          <div className="flex w-full items-center justify-center gap-4 text-background">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                target="_blank"
                className="hover:scale-[105%]"
              >
                <link.icon size={24} />
              </Link>
            ))}
          </div>
          <p className="w-full text-center font-mono text-xs text-background">
            Made with ❤️ by Sourav Rakshit
          </p>
        </div>
      </div>
    </footer>
  );
}
