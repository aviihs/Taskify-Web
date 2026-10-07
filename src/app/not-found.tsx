import Link from "next/link";

import Icon from "@/components/common/icon";

export default function NotFound() {
  return (
    <main className="bg-taskify-background flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <span className="from-taskify-primary to-taskify-secondary mx-auto flex size-16 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg shadow-black/10">
          <Icon
            name="lucide:list-x"
            className="cursor-default text-3xl lg:text-3xl"
          />
        </span>
        <p className="text-taskify-link mt-6 text-sm font-semibold tracking-wider uppercase">
          404 · Page not found
        </p>
        <h1 className="text-taskify-text mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          This task doesn&apos;t exist
        </h1>
        <p className="text-taskify-text-secondary mt-4 leading-relaxed">
          The page you&apos;re looking for was moved, archived or never created.
        </p>
        <Link
          href="/"
          className="from-taskify-primary to-taskify-secondary interactive-button mt-8 inline-flex items-center gap-2 rounded-xl bg-linear-to-r px-6 py-3 font-semibold text-white shadow-md"
        >
          <Icon name="lucide:arrow-left" className="cursor-pointer" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
