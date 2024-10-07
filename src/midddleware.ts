import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { parse } from 'cookie';

export async function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie');
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  const role = cookies.rol;

  const protectedRoutes = {
    INCOGNITO: ['/', '/paginas'],
    ADMINISTRATIVO: ['paginas/administativo', 'paginas/administrativo/componentes'],
    DOCENTE: ['/paginas/docentes', '/paginas/docentes/componentes'],
    ESTUDIANTE: ['/paginas/estudiantes', '/paginas/estudiantes/componentes'],
    
    };

  const userRoles: (keyof typeof protectedRoutes)[] = ['INCOGNITO', 'ADMINISTRATIVO', 'DOCENTE', 'ESTUDIANTE'];

  // Permitir siempre acceso a la página raíz (home) para establecer cookies
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  // Si no hay rol o es INCOGNITO
  if (!role || role === 'INCOGNITO') {
    if (protectedRoutes.INCOGNITO.some(route => request.nextUrl.pathname.startsWith(route))) {
      return NextResponse.next();  // Permitir acceso a rutas de INCOGNITO
    } else {
      return NextResponse.redirect(new URL('/', request.url));  // Redirigir a la raíz
    }
  }

  // Validar el rol y permitir acceso solo a sus rutas correspondientes
  if (userRoles.includes(role as keyof typeof protectedRoutes)) {
    const userRoutes = protectedRoutes[role as keyof typeof protectedRoutes];
    if (userRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
      return NextResponse.next();  // Permitir acceso si la ruta es válida para el rol
    } else {
      return NextResponse.redirect(new URL(userRoutes[0], request.url));  // Redirigir a la primera ruta permitida del rol
    }
  }

  // Si no coincide con ninguna ruta o rol, redirigir al home
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: [
        '/',
        '/paginas/:path*',
        '/paginas/administativo/:path*',
        '/paginas/administrativo/componentes/:path*',
        '/paginas/docentes/:path*',
        '/paginas/docentes/componentes/:path*',
        '/paginas/estudiantes/:path*',
        '/paginas/estudiantes/componentes/:path*',
    ],
};