import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  href = "/",
  className = "",
  priority = false,
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={`brand brand-logo roll-control ${className}`.trim()}
      aria-label="Huygen Studios home"
    >
      <Image
        className="brand-logo-image brand-logo-white brand-logo-horizontal"
        src="/Huygen Studios logo white horizontal.png"
        alt="Huygen Studios"
        width={2048}
        height={682}
        priority={priority}
        sizes="(max-width: 767px) 92px, 128px"
      />
      <Image
        className="brand-logo-image brand-logo-black brand-logo-horizontal"
        src="/Huygen Studios logo Black horizontal.png"
        alt=""
        aria-hidden="true"
        width={2048}
        height={682}
        priority={priority}
        sizes="(max-width: 767px) 92px, 128px"
      />
      <Image
        className="brand-logo-image brand-logo-white brand-logo-vertical"
        src="/Huygen Studios logo white vertical.png"
        alt=""
        aria-hidden="true"
        width={1024}
        height={386}
        priority={priority}
        sizes="92px"
      />
      <Image
        className="brand-logo-image brand-logo-black brand-logo-vertical"
        src="/Huygen Studios logo black vertical.png"
        alt=""
        aria-hidden="true"
        width={1024}
        height={386}
        priority={priority}
        sizes="92px"
      />
    </Link>
  );
}

