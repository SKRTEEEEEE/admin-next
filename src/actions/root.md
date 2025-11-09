"use server"

import { routing } from '@/lib/i18n/routing';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function setCookie(name: string, value:string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value,{
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'strict',
  });
}

export async function deleteCookie(name:string) {
  console.log(`Deleting cookies: ${name}`)
  const cookieStore = await cookies();
  cookieStore.delete(name);
}
export async function manageRoot(request: NextRequest){
  const cookieStore = await cookies();
    const visits = parseInt((cookieStore.get("visits")?.value) || "0", 10);
    if (visits <= 3) {
        await setCookie("visits", (visits + 1).toString());
        // ⬇️🧠💡 -> No devuelve lo que has guardado (locale) porque devuelve accept-language o el default ya que en la ruta raíz no sabe cual es el escogido
        const locale = request.headers.get('accept-language')?.split(',')[0].split('-')[0] || routing.defaultLocale;

        // const locale = await getLocale();
        

        if(visits === 3){
            return NextResponse.redirect(new URL(`/${locale}?redirect=manageRoot`, 'http://' + (await headers()).get('host')));
        }else{
        return NextResponse.redirect(new URL(`/${locale}`, 'http://' + (await headers()).get('host')));}
      } 
    }
    //       else {
    //         const cookieStore = await cookies();
    //         console.log("visits a set: ", cookieStore.get("visits")?.value)
    //         // Delete the visits cookie and render the page
    //         if (cookieStore.get("visits")) {
    //           await deleteCookie("visits");
    //         }
    //         return NextResponse.next();
    // }