import { cn } from "@/lib/utils";
import {
  SiGithub as GithubIcon,
  SiInstagram as InstagramIcon,
  SiGmail as GmailIcon,
} from "@icons-pack/react-simple-icons";
import Link from "@/components/Link";

const LinkedinIcon = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width={size}
    height={size}
    viewBox="0 0 50 50"
  >
    <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
  </svg>
);

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
          "text-background text-wrap uppercase text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] text-center leading-none",
          "font-array",
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
            "text-sm px-4 py-2 sm:text-base sm:px-4 md:text-lg md:px-6 lg:text-xl lg:px-8",
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
