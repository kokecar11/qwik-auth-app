import { $, component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import Button, { ButtonSize, ButtonVariant } from "~/components/button/Button";
import { useAuthSession, useAuthSignin, useAuthSignout } from "./plugin@auth";
import { Navbar } from "~/components/navbar/Navbar";

export default component$(() => {
  const session = useAuthSession()
  const signIn = useAuthSignin()
  const signOut = useAuthSignout()
  const onSignOut =  $(async() => await signOut.submit({ callbackUrl: '/' }))
  return (
    <>
      <Navbar>
        <div q:slot='navLogo'>
          <Link href='/' class={"font-bold text-lg text-white flex place-items-center space-x-2"}>
            <span class="text-primary">Example Auth + Prisma</span>

          </Link>
        </div>
        <div q:slot='navItemsEnd' class={"flex flex-none items-center justify-center space-x-2"}>            

          {
            session.value?.user ? 
            <img class="rounded-full border-secondary border-2" width='40' height='40' src={session.value.user.image as string} alt="img-profile" />
            :
            <Button variant={ButtonVariant.pro} onClick$={() => signIn.submit({ providerId: 'twitch' })}>Sign in with Twitch</Button> 
            }

        </div>
      </Navbar>

      {
        session.value?.user && 
        <div class="p-4 container w-full mx-auto">
          <span class="text-primary mx-auto">Hi! 👋 <Link href={`https://www.twitch.tv/${session.value.user.name}`} class="text-lg text-secondary font-bold">@{session.value.user.name}</Link></span>
        </div>
      }

      {
          !session.value?.userId ?
          <div class="w-full mx-auto animate-fade-down my-4">
            <Button classNames='mx-auto' variant={ButtonVariant.pro} size={ButtonSize.lg} onClick$={() => signIn.submit({ providerId: 'twitch' })}>Login with Twitch Account</Button>
          </div>
          :
          <div class="w-full mx-auto animate-fade-down my-4">
            <Button classNames='mx-auto' variant={ButtonVariant.plus} size={ButtonSize.lg} onClick$={onSignOut}>Logout</Button>
          </div>
      }
    </>
  );
});

export const head: DocumentHead = {
  title: "Example Auth + Prisma",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
